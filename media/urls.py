from django.urls import path
from . import views
urlpatterns = [
    path('api/media/photo/upload', views.upload_photo)
]
