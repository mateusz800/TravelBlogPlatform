from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    photo_source = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ('pk', 'author_name', 'title', 'subtitle', 'body', 'published_date', 'photo_source')

    def get_photo_source(self, obj):
        if obj.featured_photo:
            return self.context['request'].build_absolute_uri(obj.featured_photo.image.url)
        # default image
        return ''
    
    def get_author_name(self, obj):
        return obj.author.get_full_name()
