# destination/urls.py
from django.urls import path
from .views import PopularDestinationAPIView, SearchDestinationAPIView

urlpatterns = [
    path('popular/', PopularDestinationAPIView.as_view(), name='popular-destinations'),
    path('search/', SearchDestinationAPIView.as_view(), name='search-destinations'),
]