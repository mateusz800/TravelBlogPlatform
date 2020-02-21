from django.urls import path
from . import  views

urlpatterns = [
    path('api/profile/<int:pk>', views.profile_detail)
]
