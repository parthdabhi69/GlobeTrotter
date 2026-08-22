from rest_framework import serializers

from .models import Trip


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip

        fields = [
            "id",
            "name",
            "description",
            "start_date",
            "end_date",
            "budget",
            "currency",
            "privacy",
            "public_slug",
            "is_completed",
            "cover_photo",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "public_slug",
            "created_at",
            "updated_at",
        ]