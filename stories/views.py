from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_GET
from rest_framework import filters, generics
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from .models import Story
from .serializers import ArticleSerializer, GeneralArticleSerializer


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


@api_view(['POST'])
def add_story(request):
    """
    View that allow you to add the new story
    """
    try:
        pk = request.data['pk']
        story = Story.objects.get(pk=pk)
        print(request.data)
        serializer = GeneralArticleSerializer(story, data=request.data)
    except KeyError:
        # data has not pk attribute (story not exist)
        serializer = GeneralArticleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
