from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', HomeView, name='home'),
    path('getstream', Stream, name='streamdt'),
    path('gettokenstream/<token>', StreamToken, name='streamtk'),
    path('stream/', StreamView, name='streamroom'),
    path('streamtoken/<token>', StreamTokenView, name='stokenview'),
    path('api/', APIEnd, name='api')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
