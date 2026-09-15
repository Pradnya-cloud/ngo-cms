from django.contrib import admin
from apps.volunteers.models import Volunteer


@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "phone", "status", "applied_at"]
    list_filter = ["status"]
    search_fields = ["name", "email", "phone"]
    ordering = ["-applied_at"]
