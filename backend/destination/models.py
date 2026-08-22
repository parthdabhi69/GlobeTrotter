from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Country(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True
    )

    code = models.CharField(
        max_length=2,
        unique=True
    )

    flag_url = models.URLField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


class City(models.Model):
    country = models.ForeignKey(
        Country,
        on_delete=models.PROTECT,
        related_name="cities"
    )

    name = models.CharField(
        max_length=150
    )

    region = models.CharField(
        max_length=150,
        blank=True
    )

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6
    )

    description = models.TextField(
        blank=True
    )

    image_url = models.URLField(
        blank=True
    )

    # Used for your application's popularity ranking
    popularity_score = models.PositiveIntegerField(
        default=0
    )

    # Optional estimated cost index
    cost_index = models.PositiveIntegerField(
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100)
        ]
    )

    # ID/reference from the external API, if available
    external_id = models.CharField(
        max_length=255,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-popularity_score", "name"]

        constraints = [
            models.UniqueConstraint(
                fields=["country", "name"],
                name="unique_city_per_country"
            )
        ]

    def __str__(self):
        return f"{self.name}, {self.country.name}"