from django.urls import path
from . import views

urlpatterns = [
    path('api/profile/<int:pk>', views.profile_detail),
    path('api/profile/<int:pk>/edit', views.edit_profile_view),
    path('api/login', views.login_view),
    path('api/logout', views.logout_view),
    path('api/register', views.register_view),
    path('api/is_authenticated', views.is_authenticated_view),
    path('activate_account/<str:uidb64>/<str:token>',
         views.activate_account, name='activate_account'),
    path('api/reset_password_request', views.send_reset_password_link),
    path('api/reset_password/<str:uidb64>/<str:token>',
         views.reset_password_form, name='reset_password'),
    path('api/create_new_password', views.create_new_password),
]
