from django.urls import path
from . import views

urlpatterns = [
    path('api/articles', views.ArticleList.as_view()),
]