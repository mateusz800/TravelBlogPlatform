from django.urls import path
from . import views

urlpatterns = [
    path('api/stories', views.StoryList.as_view()),
    path('api/story/<int:pk>', views.story_details)
]