from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from .models import Photo


@api_view(['POST'])
def upload_photo(request):
    # blob image
    file_data = request.data['source']
    new_photo = Photo.objects.create(image=file_data)
    new_photo_url = request.build_absolute_uri(new_photo.image.url)
    return Response({'pk': new_photo.pk, 'url': new_photo_url}, status=HTTP_201_CREATED)
