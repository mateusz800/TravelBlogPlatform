from django.db import models
from django.utils import timezone


class Media(models.Model):
    name = models.CharField(max_length=25, null=True)
    published_date = models.DateTimeField(default=timezone.now)

    class Meta:
        abstract = True
        ordering = ('-published_date',)

    def __str__(self):
        return self.name or str(self.pk)


class Photo(Media):
    image = models.ImageField(upload_to='photos/')

