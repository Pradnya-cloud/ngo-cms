from django.contrib import admin
from apps.events.models import Event, EventRegistration


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["title", "event_date", "status", "registered_count", "created_at"]
    list_filter = ["status"]
    search_fields = ["title", "location"]
    ordering = ["-event_date"]


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "event", "status", "registered_at"]
    list_filter = ["status", "event"]
    search_fields = ["name", "email"]
    ordering = ["-registered_at"]
