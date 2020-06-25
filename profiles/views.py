from os import PathLike

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.views.decorators.http import require_GET
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from django.core.mail import EmailMessage


from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from media.models import Photo
from media.utils import get_photo_by_url
from .models import Profile
from .serializers import ProfileSerializer
from .utils import generate_random_username
from .tokens import account_activation_token, password_reset_token


@api_view(['GET'])
def profile_detail(request, pk):
    """
    Get the details of the user profile with given pk.
    """
    profile = get_object_or_404(Profile, pk=pk)
    serializer = ProfileSerializer(
        profile, context={'request': request}, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def login_view(request):
    """
    Login user with the given credentials (email, password).
    Returns status:
        1 - success
        2 - account not verified
        3 - incorrect credentials
    """
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return Response({'status': 1, 'pk': user.pk})
        return Response({'status': 2})
    return Response({'status': 3})


@login_required
@api_view()
def logout_view(request):
    """
    Logout current user.
    """
    logout(request)
    return Response({'status': 'success'})


@api_view(['POST'])
def register_view(request):
    """
    Register new user.
    New user is not active yet. The given email must be verified.
    Post parameters: email, first_name, last_name, password
    Returns status:
        0 - User with that email already exist
        1 - Success. Check email for verifictaion link
    """
    email = request.data['email']
    # check if the email is unique
    users = User.objects.filter(email=email)
    if len(user) > 0:
        for u in users :
            if u.is_active == False:
                return Response({'status': 0})
        
    password = request.data['password']
    user = User.objects.create(
        email=email, username=generate_random_username())
    user.set_password(password)
    user.first_name = request.data['first_name']
    user.last_name = request.data['last_name']
    user.is_active = False
    user.save()
    # send verification email
    current_site = get_current_site(request)
    mail_subject = 'Activate your blog account.'
    message = render_to_string('account_activate_email.html', {
        'user': user,
        'domain': current_site.domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
    })
    email = EmailMessage(
        mail_subject, message, to=[email]
    )
    email.send()
    return Response({'status': 1})


@api_view()
def activate_account(request, uidb64, token):
    """
    Activate account with the link sended by email.
    """
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        # create profile for the user
        profile = Profile(user=user)
        profile.save()
        # redirect to login page
        return redirect('/login')
    else:
        return Response({'status': 'failed'})


@api_view(['POST'])
def send_reset_password_link(request):
    """
    Send link that allows user to create new password
    """
    email = request.data['email']
    print(email)
    user = User.objects.get(email=email)
    if user is not None:
        # send verification email
        current_site = get_current_site(request)
        mail_subject = 'Reset your password'
        message = render_to_string('reset_password_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': password_reset_token.make_token(user),
        })
        email = EmailMessage(
            mail_subject, message, to=[email]
        )
        email.send()

        return Response({'status': 'success'})
    return Response({'status': 'failed'})


@api_view()
def reset_password_form(request, uidb64, token):
    """
    Activate account with the link sended by email.
    """
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and password_reset_token.check_token(user, token):
        return redirect('/{}/new_password'.format(user.pk))
    else:
        return Response({'status': 'failed'})


@api_view(['POST'])
def create_new_password(request):
    """
    Create new password
    Post parameters:
        user_pk - primery key of the user that want to change his/her password
        new_password - password that will replace the old one
    """
    user_pk = request.data['user_pk']
    new_password = request.data['new_password']

    user = User.objects.get(pk=user_pk)
    if user is not None:
        user.set_password(new_password)
        user.save()
        print("zmienione")
        return Response({'status': 'success'})
    return Response({'status': 'failed'})


@api_view()
def is_authenticated_view(request):
    """
    Check if the user is already authenticated.
    If the user is authenticated return his/her primary key
    """
    return Response({'is_authenticated': request.user.is_authenticated, 'pk': request.user.pk})


@login_required
@api_view(['POST'])
def edit_profile_view(request, pk):
    """
    Edit user data.
    Possible parameters: bacground_photo, profile_photo

    :param int pk: primary key of the edited profile
    """
    profile = get_object_or_404(Profile, user=pk)
    data = {}
    if 'background_photo' in request.data:
        if isinstance(request.data['background_photo'], str):
            data['background_photo'] = get_photo_by_url(
                request.data['background_photo'])
        else:
            data['background_photo'] = get_object_or_404(
                Photo, pk=request.data['background_photo'])
    if 'profile_photo' in request.data:
        if isinstance(request.data['profile_photo'], str):
            data['photo'] = get_photo_by_url(request.data['profile_photo'])
        else:
            data['photo'] = get_object_or_404(
                Photo, pk=request.data['profile_photo'])
    context = {'request': request}
    serializer = ProfileSerializer(context=context)
    new_profile = serializer.update(
        profile, data)
    return Response(ProfileSerializer(new_profile, context=context).data)
