from rest_framework import serializers
from .models import Profile
from media.serializers import PhotoSerializer


class ProfileSerializer(serializers.Serializer):
    name = serializers.SerializerMethodField()
    profile_photo = serializers.SerializerMethodField()
    background_photo = serializers.SerializerMethodField()
    pk = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('pk', 'name', 'profile_photo', 'background_photo')

    def update(self, instance, validated_data):
        instance.background_photo = validated_data.get('background_photo', instance.background_photo)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.save()
        return instance

    def get_pk(self, obj):
        return obj.user.pk

    def get_name(self, obj):
        return obj.user.get_full_name()

    def get_profile_photo(self, obj):
        serializer = PhotoSerializer(
            obj.photo, context={'request': self.context['request']})
        return serializer.data
    
    def get_background_photo(self, obj):
        serializer = PhotoSerializer(
            obj.background_photo, context={'request': self.context['request']})
        return serializer.data
