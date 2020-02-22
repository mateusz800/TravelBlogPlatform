from django.conf.global_settings import AUTH_USER_MODEL
from django.db import models
from media.models import Photo


class Profile(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    photo = models.ForeignKey(Photo, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.user.get_full_name()
    