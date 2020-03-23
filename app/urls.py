from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('admin/', admin.site.urls),
    path('', include('stories.urls')),
    path('', include('profiles.urls')),
    path('', include('media.urls')),
    path('', include('frontend.urls')),
] 
