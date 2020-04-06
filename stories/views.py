from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_GET
from rest_framework import filters, generics, request
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
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
    queryset = Story.objects.all().filter(status='published')
    serializer_class = ArticleSerializer

    def get_queryset(self):
        """
        Possibility to limit count of objects via GET params
        count = x
        """
        stories = Story.objects.all().filter(status='published')
        if self.request.GET.get('count'):
            count = int(self.request.GET.get('count'))
            return stories[:count]
        return stories


@api_view(['GET'])
def story_details(request, pk):
    """
    View to get the details of the story with given pk
    """
    story = get_object_or_404(Story, pk=pk)
    serializer = ArticleSerializer(
        story, context={'request': request}, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def author_stories(request, author_pk, drafts=False):
    """
    View that returns a list of stories created by the author with given pk
    """
    status = 'draft' if drafts == True else 'published'

    stories = Story.objects.filter(author=author_pk, status=status)
    stories_serializer = ArticleSerializer(
        stories, context={'request': request}, many=True)
    return Response({'stories': stories_serializer.data})


@login_required
@api_view(['POST'])
def add_story(request):
    """
    View that allow you to add the new story
    """
    try:
        pk = request.data['pk']
        story = Story.objects.get(pk=pk)
        serializer = GeneralArticleSerializer(story, data=request.data)
    except KeyError:
        # data has not pk attribute (story not exist)
        serializer = GeneralArticleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@login_required
@api_view(['GET'])
def remove_story(request, story_pk):
    """
    Check if the logged user is the author of the content if so remove story from database
    """
    print('ok')
    user = request.user.pk
    story = Story.objects.get(pk=story_pk)
    if story.author.pk == user:
        story.delete()
    return Response({'status': 'removed'})
