from django.db import models
from apps.accounts.models import User


class Event(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True, default="")
    event_date = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True, default="")
    capacity = models.IntegerField(null=True, blank=True)
    registered_count = models.IntegerField(default=0)
    featured_image = models.URLField(blank=True, default="")
    status = models.CharField(max_length=20, default="draft")
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="events"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "events"
        ordering = ["-event_date"]

    def __str__(self):
        return self.title


class EventRegistration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registrations")
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, default="")
    status = models.CharField(max_length=20, default="confirmed")
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "event_registrations"
        ordering = ["-registered_at"]

    def __str__(self):
        return f"{self.name} -> {self.event.title}"
