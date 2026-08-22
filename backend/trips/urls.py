from django.urls import path

from .views import (
    MyTripsListView,
    TripDetailView,
    CreateTripView,
)


urlpatterns = [

    path(
        "my-trips/",
        MyTripsListView.as_view(),
        name="my-trips"
    ),

    path(
        "create/",
        CreateTripView.as_view(),
        name="create-trip"
    ),

    path(
        "<int:trip_id>/",
        TripDetailView.as_view(),
        name="trip-detail"
    ),

]