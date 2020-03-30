from django.urls import path
from . import views

urlpatterns = [
    path('api/stories', views.StoryList.as_view()),
    path('api/stories/profile/<int:author_pk>', views.author_stories),
    path('api/stories/profile/<int:author_pk>/drafts/<int:drafts>', views.author_stories),
    path('api/story/<int:pk>', views.story_details),
    path('api/story/add', views.add_story),
    path('api/story/<int:story_pk>/remove', views.remove_story)
]