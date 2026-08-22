from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models

from destination.models import City
from activities.models import Activity


class Trip(models.Model):
    PRIVACY_CHOICES = [
        ("private", "Private"),
        ("friends", "Friends Only"),
        ("public", "Public"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="trips"
    )

    name = models.CharField(max_length=200)

    description = models.TextField(
        blank=True
    )

    cover_photo = models.ImageField(
        upload_to="trips/covers/",
        blank=True,
        null=True
    )

    start_date = models.DateField()
    end_date = models.DateField()

    # Maximum amount the user wants to spend
    budget = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )

    currency = models.CharField(
        max_length=3,
        default="USD"
    )

    privacy = models.CharField(
        max_length=20,
        choices=PRIVACY_CHOICES,
        default="private"
    )

    # Used for public/shared itinerary URLs
    public_slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        null=True
    )

    is_completed = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-start_date"]

    def __str__(self):
        return f"{self.name} - {self.user}"

    @property
    def duration_days(self):
        return (self.end_date - self.start_date).days + 1

    @property
    def total_expenses(self):
        return sum(
            expense.amount
            for expense in self.expenses.all()
        )

    @property
    def remaining_budget(self):
        return self.budget - self.total_expenses

    @property
    def is_over_budget(self):
        return self.total_expenses > self.budget


class TripStop(models.Model):
    """
    Represents a city/stop inside a multi-city trip.

    Example:
    Paris -> Rome -> Barcelona
    """

    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="stops"
    )

    city = models.ForeignKey(
        City,
        on_delete=models.PROTECT,
        related_name="trip_stops"
    )

    start_date = models.DateField()
    end_date = models.DateField()

    # Determines order of cities in the itinerary
    order = models.PositiveIntegerField(
        default=0
    )

    notes = models.TextField(
        blank=True
    )

    accommodation_name = models.CharField(
        max_length=200,
        blank=True
    )

    accommodation_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )

    class Meta:
        ordering = ["order", "start_date"]

        constraints = [
            models.UniqueConstraint(
                fields=["trip", "order"],
                name="unique_stop_order_per_trip"
            )
        ]

    def __str__(self):
        return f"{self.trip.name} - {self.city.name}"

    @property
    def duration_days(self):
        return (self.end_date - self.start_date).days + 1


class ItineraryActivity(models.Model):
    """
    Connects an Activity with a TripStop.

    This represents an activity actually selected
    by the user for their itinerary.
    """

    trip_stop = models.ForeignKey(
        TripStop,
        on_delete=models.CASCADE,
        related_name="itinerary_activities"
    )

    activity = models.ForeignKey(
        Activity,
        on_delete=models.PROTECT,
        related_name="itinerary_items"
    )

    date = models.DateField()

    start_time = models.TimeField(
        blank=True,
        null=True
    )

    end_time = models.TimeField(
        blank=True,
        null=True
    )

    # User can modify the API's/default estimated cost
    estimated_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )

    notes = models.TextField(
        blank=True
    )

    # Determines order of activities during a day
    order = models.PositiveIntegerField(
        default=0
    )

    is_completed = models.BooleanField(
        default=False
    )

    class Meta:
        ordering = ["date", "order", "start_time"]

    def __str__(self):
        return f"{self.activity.name} - {self.date}"


class TravelSegment(models.Model):
    """
    Represents transportation between two cities.

    Example:
    Paris -> Rome
    Flight
    """

    TRANSPORT_CHOICES = [
        ("flight", "Flight"),
        ("train", "Train"),
        ("bus", "Bus"),
        ("car", "Car"),
        ("taxi", "Taxi"),
        ("boat", "Boat"),
        ("other", "Other"),
    ]

    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="travel_segments"
    )

    from_stop = models.ForeignKey(
        TripStop,
        on_delete=models.CASCADE,
        related_name="outgoing_segments"
    )

    to_stop = models.ForeignKey(
        TripStop,
        on_delete=models.CASCADE,
        related_name="incoming_segments"
    )

    transport_type = models.CharField(
        max_length=20,
        choices=TRANSPORT_CHOICES
    )

    departure_datetime = models.DateTimeField(
        blank=True,
        null=True
    )

    arrival_datetime = models.DateTimeField(
        blank=True,
        null=True
    )

    estimated_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )

    notes = models.TextField(
        blank=True
    )

    def __str__(self):
        return (
            f"{self.from_stop.city.name} → "
            f"{self.to_stop.city.name}"
        )


class Expense(models.Model):
    """
    Stores expenses belonging to a trip.

    Used for the Budget & Cost Breakdown screen.
    """

    CATEGORY_CHOICES = [
        ("transport", "Transport"),
        ("stay", "Stay"),
        ("activity", "Activity"),
        ("food", "Food"),
        ("shopping", "Shopping"),
        ("other", "Other"),
    ]

    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="expenses"
    )

    stop = models.ForeignKey(
        TripStop,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="expenses"
    )

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES
    )

    title = models.CharField(
        max_length=200
    )

    description = models.TextField(
        blank=True
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )

    date = models.DateField()

    # True = estimated cost
    # False = actual expense
    is_estimated = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.title} - {self.amount}"


class SavedDestination(models.Model):
    """
    Allows users to save cities they want to visit later.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="saved_destinations"
    )

    city = models.ForeignKey(
        City,
        on_delete=models.CASCADE,
        related_name="saved_by_users"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "city"],
                name="unique_saved_destination"
            )
        ]

    def __str__(self):
        return f"{self.user} saved {self.city}"


class TripCollaborator(models.Model):
    """
    Allows multiple users to collaborate on a trip.
    """

    ROLE_CHOICES = [
        ("viewer", "Viewer"),
        ("editor", "Editor"),
        ("owner", "Owner"),
    ]

    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="collaborators"
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="collaborating_trips"
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="viewer"
    )

    joined_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["trip", "user"],
                name="unique_trip_collaborator"
            )
        ]

    def __str__(self):
        return f"{self.user} - {self.trip.name}"


class TripShare(models.Model):
    """
    Stores share links for public/friend sharing.
    """

    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="share_links"
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="created_share_links"
    )

    token = models.CharField(
        max_length=100,
        unique=True
    )

    is_active = models.BooleanField(
        default=True
    )

    expires_at = models.DateTimeField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    views = models.PositiveIntegerField(
        default=0
    )

    def __str__(self):
        return f"Share link - {self.trip.name}"


class TripView(models.Model):
    """
    Optional analytics model for public itinerary views.
    """

    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="views"
    )

    viewer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="trip_views"
    )

    viewed_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.trip.name} - {self.viewed_at}"