from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_GET
from rest_framework import filters, generics
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .models import Article
from .serializers import ArticleSerializer


class ArticleList(generics.ListCreateAPIView):
    """
    View that returns a list of artilces.
    It offers the pagination and search functionality
    """
    search_fields = ['title']
    filter_backends = (filters.SearchFilter,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


@api_view(['GET'])
def article_detail(request, pk):
    """
    View to get the details of the article with given pk
    """
    article = get_object_or_404(Article, pk=pk)
    serializer = ArticleSerializer(
        article, context={'request': request}, many=False)
    return Response(serializer.data)
