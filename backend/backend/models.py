from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils import timezone


# ============================================================
# USER
# ============================================================

class User(AbstractUser):
    """
    Custom user model for GlobeTrotter.

    Login can be handled using email + password.
    """

    email = models.EmailField(unique=True)
    profile_photo = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )
    phone_number = models.CharField(
        max_length=20,
        blank=True
    )
    city = models.CharField(
        max_length=100,
        blank=True
    )
    country = models.CharField(
        max_length=100,
        blank=True
    )

    LANGUAGE_CHOICES = [
        ("en", "English"),
        ("hi", "Hindi"),
        ("es", "Spanish"),
        ("fr", "French"),
        ("de", "German"),
    ]

    language = models.CharField(
        max_length=10,
        choices=LANGUAGE_CHOICES,
        default="en"
    )

    def __str__(self):
        return self.get_full_name() or self.username


# ============================================================
# COUNTRY
# ============================================================

class Country(models.Model):
    """
    Stores countries for city search/filtering.
    """

    name = models.CharField(
        max_length=100,
        unique=True
    )

    code = models.CharField(
        max_length=3,
        unique=True,
        help_text="ISO country code, e.g. IN, US, GB"
    )

    continent = models.CharField(
        max_length=100,
        blank=True
    )

    flag_emoji = models.CharField(
        max_length=10,
        blank=True
    )

    def __str__(self):
        return self.name


# ============================================================
# CITY
# ============================================================

class City(models.Model):
    """
    Global city database used for city search.
    """

    name = models.CharField(
        max_length=150
    )

    country = models.ForeignKey(
        Country,
        on_delete=models.CASCADE,
        related_name="cities"
    )

    description = models.TextField(
        blank=True
    )

    image = models.ImageField(
        upload_to="cities/",
        blank=True,
        null=True
    )

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        blank=True,
        null=True
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        blank=True,
        null=True
    )

    # 1 = cheap, 5 = expensive
    cost_index = models.PositiveSmallIntegerField(
        default=3,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )

    popularity_score = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-popularity_score"]
        constraints = [
            models.UniqueConstraint(
                fields=["name", "country"],
                name="unique_city_per_country"
            )
        ]

    def __str__(self):
        return f"{self.name}, {self.country.name}"


# ============================================================
# ACTIVITY CATEGORY
# ============================================================

class ActivityCategory(models.Model):
    """
    Examples:
    Sightseeing
    Food
    Adventure
    Shopping
    Nightlife
    Culture
    Nature
    etc.
    """

    name = models.CharField(
        max_length=100,
        unique=True
    )

    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text="Icon name used by frontend"
    )

    description = models.TextField(
        blank=True
    )

    def __str__(self):
        return self.name


# ============================================================
# ACTIVITY
# ============================================================

class Activity(models.Model):
    """
    Activities available in cities.
    """

    name = models.CharField(
        max_length=200
    )

    city = models.ForeignKey(
        City,
        on_delete=models.CASCADE,
        related_name="activities"
    )

    category = models.ForeignKey(
        ActivityCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="activities"
    )

    description = models.TextField(
        blank=True
    )

    image = models.ImageField(
        upload_to="activities/",
        blank=True,
        null=True
    )

    address = models.CharField(
        max_length=255,
        blank=True
    )

    estimated_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )

    estimated_duration_minutes = models.PositiveIntegerField(
        default=60
    )

    opening_time = models.TimeField(
        blank=True,
        null=True
    )

    closing_time = models.TimeField(
        blank=True,
        null=True
    )

    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(5)
        ]
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-rating", "name"]

    def __str__(self):
        return f"{self.name} - {self.city.name}"


# ============================================================
# TRIP
# ============================================================

class Trip(models.Model):
    """
    Main travel plan created by a user.
    """

    PRIVACY_CHOICES = [
        ("private", "Private"),
        ("friends", "Friends Only"),
        ("public", "Public"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="trips"
    )

    name = models.CharField(
        max_length=200
    )

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

    # Useful for public/shared itinerary URLs
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


# ============================================================
# TRIP STOP
# ============================================================

class TripStop(models.Model):
    """
    Represents a city/stop inside a multi-city trip.

    Example:

    Paris -> Rome -> Barcelona

    Each city becomes one TripStop.
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


# ============================================================
# ITINERARY ACTIVITY
# ============================================================

class ItineraryActivity(models.Model):
    """
    Connects an Activity with a TripStop.

    This is the actual activity selected by the user
    for their itinerary.
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

    estimated_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )

    notes = models.TextField(
        blank=True
    )

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


# ============================================================
# TRANSPORT / TRAVEL SEGMENT
# ============================================================

class TravelSegment(models.Model):
    """
    Represents transportation between two cities.

    Example:
    Paris -> Rome
    Flight
    $120
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


# ============================================================
# EXPENSE
# ============================================================

class Expense(models.Model):
    """
    Stores all trip expenses.

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

    date = models.DateField(
        default=timezone.now
    )

    is_estimated = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.title} - {self.amount}"


# ============================================================
# SAVED DESTINATION
# ============================================================

class SavedDestination(models.Model):
    """
    Allows users to save cities they want to visit later.
    """

    user = models.ForeignKey(
        User,
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


# ============================================================
# USER PREFERENCES
# ============================================================

class UserPreference(models.Model):
    """
    Stores travel preferences used for recommendations.
    """

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="preferences"
    )

    TRAVEL_STYLE_CHOICES = [
        ("budget", "Budget"),
        ("midrange", "Mid Range"),
        ("luxury", "Luxury"),
        ("backpacking", "Backpacking"),
        ("family", "Family"),
        ("business", "Business"),
        ("adventure", "Adventure"),
    ]

    travel_style = models.CharField(
        max_length=30,
        choices=TRAVEL_STYLE_CHOICES,
        default="midrange"
    )

    preferred_currency = models.CharField(
        max_length=3,
        default="USD"
    )

    preferred_categories = models.ManyToManyField(
        ActivityCategory,
        blank=True,
        related_name="preferred_by_users"
    )

    budget_per_day = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=100,
        validators=[MinValueValidator(0)]
    )

    notifications_enabled = models.BooleanField(
        default=True
    )

    public_profile = models.BooleanField(
        default=True
    )

    def __str__(self):
        return f"Preferences - {self.user}"


# ============================================================
# TRIP COLLABORATORS
# ============================================================

class TripCollaborator(models.Model):
    """
    Allows users to collaborate on trips.

    Example:
    User A creates a trip and invites User B.
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
        User,
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


# ============================================================
# TRIP SHARE
# ============================================================

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
        User,
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


# ============================================================
# TRIP VIEW / ANALYTICS
# ============================================================

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
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="trip_views"
    )

    viewed_at = models.DateTimeField(
        auto_now_add=True
    )

    ip_hash = models.CharField(
        max_length=128,
        blank=True
    )

    def __str__(self):
        return f"{self.trip.name} - {self.viewed_at}"
