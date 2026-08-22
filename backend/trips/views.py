# backend/trips/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Trip
from .serializers import TripSerializer


class MyTripsListView(APIView):
    """Get all trips for the authenticated user"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            trips = Trip.objects.filter(user=request.user).order_by('-created_at')
            serializer = TripSerializer(trips, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"detail": "Failed to load trips."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TripDetailView(APIView):
    """Get, update, delete a specific trip"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, trip_id):
        try:
            trip = Trip.objects.get(id=trip_id, user=request.user)
            serializer = TripSerializer(trip)
            return Response(serializer.data)
        except Trip.DoesNotExist:
            return Response(
                {"detail": "Trip not found."},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def put(self, request, trip_id):
        try:
            trip = Trip.objects.get(id=trip_id, user=request.user)
            serializer = TripSerializer(trip, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Trip.DoesNotExist:
            return Response(
                {"detail": "Trip not found."},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def delete(self, request, trip_id):
        try:
            trip = Trip.objects.get(id=trip_id, user=request.user)
            trip.delete()
            return Response(
                {"detail": "Trip deleted successfully."},
                status=status.HTTP_204_NO_CONTENT
            )
        except Trip.DoesNotExist:
            return Response(
                {"detail": "Trip not found."},
                status=status.HTTP_404_NOT_FOUND
            )


class CreateTripView(APIView):
    """Create a new trip"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = TripSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)