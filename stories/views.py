from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_GET
from rest_framework import filters, generics
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .models import Story
from .serializers import ArticleSerializer


class StoryList(generics.ListCreateAPIView):
    """
    View that returns a list of artilces.
    It offers the pagination and search functionality
    """
    search_fields = ['title']
    filter_backends = (filters.SearchFilter,)
    queryset = Story.objects.all()
    serializer_class = ArticleSerializer


@api_view(['GET'])
def story_details(request, pk):
    """
    View to get the details of the story with given pk
    """
    story = get_object_or_404(Story, pk=pk)
    serializer = ArticleSerializer(
        story, context={'request': request}, many=False)
    return Response(serializer.data)
