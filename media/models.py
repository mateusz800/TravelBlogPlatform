from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Media(models.Model):
    name = models.CharField(max_length=25, null=True)
    published_date = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        abstract = True
        ordering = ('-published_date',)

    def __str__(self):
        return self.name or str(self.pk)


class Photo(Media):
    image = models.ImageField(upload_to='photos/')

