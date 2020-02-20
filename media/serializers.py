from rest_framework import serializers
from .models import Photo

class PhotoSerializer(serializers.ModelSerializer):
    source = serializers.SerializerMethodField()
    class Meta:
        model = Photo
        fields = ('source', )

    def get_source(self, obj):
        """
        build full path (http://domain.com/photo...)
        : returns string : full url
        """
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        # default image
        return ''
