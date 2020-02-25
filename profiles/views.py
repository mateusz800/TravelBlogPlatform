from os import PathLike

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_GET
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Profile
from .serializers import ProfileSerializer
from .utils import generate_random_username


@api_view(['GET'])
def profile_detail(request, pk):
    """
    View to get the details of the user profile with given pk
    """
    profile = get_object_or_404(Profile, pk=pk)
    serializer = ProfileSerializer(
        profile, context={'request': request}, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def login_view(request):
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
    logout(request)
    return Response({'status': 'success'})


@api_view(['POST'])
def register_view(request):
    email = request.data['email']
    password = request.data['password']
    user = User.objects.create(email=email, password=password, username=generate_random_username())
    profile = Profile(user=user)
    profile.save()
    return Response({'pk': profile.pk})


@api_view()
def is_authenticated_view(request):
    """
    Views that allow you to check if the user is already authenticated.
    If 
    """
    return Response({'is_authenticated': request.user.is_authenticated, 'pk': request.user.pk})


