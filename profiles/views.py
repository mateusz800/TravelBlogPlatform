from django.shortcuts import render
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_GET
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Profile
from .serializers import ProfileSerializer


@api_view(['GET'])
def profile_detail(request, pk):
    """
    View to get the details of the user profile with given pk
    """
    profile = get_object_or_404(Profile, pk=pk)
    serializer = ProfileSerializer(
        profile, context={'request': request}, many=False)
    return Response(serializer.data)
