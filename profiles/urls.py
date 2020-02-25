from django.urls import path
from . import  views

urlpatterns = [
    path('api/profile/<int:pk>', views.profile_detail),
    path('api/login', views.login_view),
    path('api/logout', views.logout_view),
    path('api/register', views.register_view),
    path('api/is_authenticated', views.is_authenticated_view),
]
