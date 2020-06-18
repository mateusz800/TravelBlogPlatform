from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_GET
from rest_framework import filters, generics, request
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from six.moves.urllib.parse import urlparse

from hitcount.models import HitCount
from hitcount.views import HitCountMixin

from .models import Story
from .serializers import ArticleSerializer, GeneralArticleSerializer
from media.models import Photo




class StoryList(generics.ListCreateAPIView):
    """
    View that returns a list of artilces.
    It offers the pagination and search functionality
    """
    search_fields = ['title', 'subtitle']
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
    # add hit to visits count
    hit_count = HitCount.objects.get_for_object(story)
    HitCountMixin.hit_count(request, hit_count)
    serializer = ArticleSerializer(
        story, context={'request': request}, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def popular_stories(request, count=5):
    """
    Get list of popular stories
    """
    stories = Story.objects.filter(status='published').order_by('-visits_count__hits')
    stories_serializer = ArticleSerializer(
        stories, context={'request': request}, many=True)
    return Response({'stories': stories_serializer.data})

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
        data = request.data
        if isinstance(data['featured_photo'],str):
            relative_path = '/'.join(urlparse(data['featured_photo']).path.split('/')[2:])
            print(relative_path)
            photo =  get_object_or_404(Photo, image=relative_path)
            if photo:
                data['featured_photo'] = photo.pk
                print(photo.pk)
        print(data)
        serializer = GeneralArticleSerializer(story, data=data)
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
    user = request.user.pk
    story = Story.objects.get(pk=story_pk)
    if story.author.pk == user:
        story.delete()
    return Response({'status': 'removed'})


@login_required
@api_view(['GET'])
def add_tag(request, story_pk, tag):
    """
    Add tag to the story
    """
    story = get_object_or_404(Story, pk=story_pk)
    story.tags.add(tag)
    story.save()
    return Response({'status': 'success'})

@login_required
@api_view(['GET'])
def remove_tag(request, story_pk, tag):
    """
    Add tag to the story
    """
    story = get_object_or_404(Story, pk=story_pk)
    story.tags.remove(tag)
    story.save()
    return Response({'status': 'success'})


@api_view(['GET'])
def get_similar_stories(request, story_pk, count=4):
    """
    Get list of similar stories to given one
    """
    story = get_object_or_404(Story, pk=story_pk)
    similar_stories = story.tags.similar_objects()
    serializer = ArticleSerializer(
        similar_stories, context={'request': request}, many=True)
    return Response(serializer.data)


