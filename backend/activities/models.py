from django.core.validators import MinValueValidator
from django.db import models

from destination.models import City


class ActivityCategory(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField(
        blank=True
    )

    def __str__(self):
        return self.name


class Activity(models.Model):
    city = models.ForeignKey(
        City,
        on_delete=models.CASCADE,
        related_name="activities"
    )

    category = models.ForeignKey(
        ActivityCategory,
        on_delete=models.PROTECT,
        related_name="activities"
    )

    name = models.CharField(
        max_length=200
    )

    description = models.TextField(
        blank=True
    )

    duration_minutes = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    estimated_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )

    currency = models.CharField(
        max_length=3,
        default="USD"
    )

    image_url = models.URLField(
        blank=True
    )

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

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
        ordering = ["name"]

        constraints = [
            models.UniqueConstraint(
                fields=["city", "name"],
                name="unique_activity_per_city"
            )
        ]

    def __str__(self):
        return f"{self.name} - {self.city.name}"