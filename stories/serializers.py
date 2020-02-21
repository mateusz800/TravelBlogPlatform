from django.http import HttpResponseBadRequest
from rest_framework import serializers, status
from rest_framework.response import Response
from profiles.serializers import ProfileSerializer
from media.serializers import PhotoSerializer

from .models import Story


class ArticleSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = ('pk', 'author', 'title', 'subtitle',
                  'body', 'published_date', 'photo')

    def get_photo(self, obj):
        serializer = PhotoSerializer(obj.featured_photo, context={
                                     'request': self.context['request']})
        return serializer.data

    def get_author(self, obj):
        """
        : returns : The author serialized data
        """
        serializer = ProfileSerializer(
            obj.author, context={'request': self.context['request']})
        return serializer.data
