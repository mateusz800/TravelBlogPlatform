from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from django.contrib.auth.models import User

from .models import Photo
from .serializers import PhotoSerializer


@api_view(['POST'])
def upload_photo(request):
    # blob image
    file_data = request.data['source']
    author_pk = request.data['author']
    author = get_object_or_404(User, pk=author_pk)
    new_photo = Photo.objects.create(image=file_data, author=author)
    new_photo_url = request.build_absolute_uri(new_photo.image.url)
    return Response({'pk': new_photo.pk, 'url': new_photo_url}, status=HTTP_201_CREATED)


@api_view()
def get_user_photos(request, user_PK):
    """
    Get all photos of the given user
    """
    photos = Photo.objects.filter(author=user_PK)
    serializer = PhotoSerializer(
        photos, context={'request': request}, many=True)
    return Response(serializer.data)
