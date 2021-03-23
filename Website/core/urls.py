from django.urls import path
from .views import *

urlpatterns = [
    path('', HomeView, name='home'),
    path('api/', APIEnd, name='api')
]
