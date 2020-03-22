from os import PathLike

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_GET
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from media.models import Photo

from .models import Profile
from .serializers import ProfileSerializer
from .utils import generate_random_username


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
    If the email or password is not correct return status: failed
    """
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return Response({'pk': user.pk})
    return Response({'status': 'failed'})


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
    """
    email = request.data['email']
    # check if the email is unique
    if len(User.objects.filter(email=email)) > 0:
        return Response({'status': 'User with that email already exist'})
    password = request.data['password']
    user = User.objects.create(
        email=email, username=generate_random_username())
    user.set_password(password)
    user.first_name = request.data['first_name']
    user.last_name = request.data['last_name']
    user.save()
    profile = Profile(user=user)
    profile.save()
    return Response({'pk': profile.pk})


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
        data['background_photo'] = get_object_or_404(
            Photo, pk=request.data['background_photo'])
    if 'profile_photo' in request.data:
        data['photo'] = get_object_or_404(
            Photo, pk=request.data['profile_photo'])
    context = {'request': request}
    serializer = ProfileSerializer(context=context)
    new_profile = serializer.update(
        profile, data)
    return Response(ProfileSerializer(new_profile, context=context).data)
