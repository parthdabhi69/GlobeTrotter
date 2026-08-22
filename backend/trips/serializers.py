from rest_framework import serializers
from .models import Trip


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = [
            "id",
            "title",
            "destination",
            "start_date",
            "end_date",
            "status",
            "total_budget",
            "cover_image",
            "created_at",
        ]