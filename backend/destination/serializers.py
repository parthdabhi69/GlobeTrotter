from rest_framework import serializers


class DestinationSerializer(
    serializers.Serializer
):

    id = serializers.CharField()

    name = serializers.CharField()

    country = serializers.CharField(
        allow_blank=True,
        required=False
    )

    city = serializers.CharField(
        allow_blank=True,
        required=False
    )

    latitude = serializers.FloatField(
        allow_null=True
    )

    longitude = serializers.FloatField(
        allow_null=True
    )

    image = serializers.URLField(
        allow_blank=True,
        required=False
    )

    formatted = serializers.CharField(
        allow_blank=True,
        required=False
    )

    categories = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )