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
                  'body', 'published_date', 'photo', 'status')

    def get_photo(self, obj):
        if obj.featured_photo:
            serializer = PhotoSerializer(obj.featured_photo, context={
                                         'request': self.context['request']})
            return serializer.data
        # return default photo
        return {'source': 'https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'}

    def get_author(self, obj):
        """
        : returns : The author serialized data
        """
        serializer = ProfileSerializer(
            obj.author, context={'request': self.context['request']})
        return serializer.data


class GeneralArticleSerializer(serializers.ModelSerializer):
    """
    Serializer used to create new stories or updating them.
    In this serializer there are no nested data
    """
    class Meta:
        model = Story
        fields = ('pk', 'author', 'title', 'subtitle', 'featured_photo','body', 'status')
