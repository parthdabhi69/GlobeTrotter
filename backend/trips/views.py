from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Trip
from .serializers import TripSerializer


class MyTripsListView(APIView):
    """
    Return all trips belonging to the authenticated user.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        trips = (
            Trip.objects
            .filter(user=request.user)
            .order_by("-created_at")
        )

        serializer = TripSerializer(
            trips,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class CreateTripView(APIView):
    """
    Create a new trip for the authenticated user.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = TripSerializer(
            data=request.data
        )

        if serializer.is_valid():

            trip = serializer.save(
                user=request.user
            )

            return Response(
                TripSerializer(trip).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class TripDetailView(APIView):
    """
    Get, update or delete a trip belonging
    to the authenticated user.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, trip_id):

        try:

            trip = Trip.objects.get(
                id=trip_id,
                user=request.user
            )

        except Trip.DoesNotExist:

            return Response(
                {
                    "detail": "Trip not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TripSerializer(trip)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def put(self, request, trip_id):

        try:

            trip = Trip.objects.get(
                id=trip_id,
                user=request.user
            )

        except Trip.DoesNotExist:

            return Response(
                {
                    "detail": "Trip not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TripSerializer(
            trip,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, trip_id):

        try:

            trip = Trip.objects.get(
                id=trip_id,
                user=request.user
            )

        except Trip.DoesNotExist:

            return Response(
                {
                    "detail": "Trip not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        trip.delete()

        return Response(
            {
                "detail": "Trip deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )