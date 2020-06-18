from django.urls import path
from . import views


urlpatterns = [
    path('api/media/photo/upload', views.upload_photo),
    path('api/media/user/<int:user_PK>', views.get_user_photos)
]
