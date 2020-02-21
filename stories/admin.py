from django.contrib import admin
from .models import Story

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'published_date', 'status')
    list_filter = ('status',)
    search_fields = ('title', 'body')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('status', 'published_date')

admin.site.register(Story, ArticleAdmin)
