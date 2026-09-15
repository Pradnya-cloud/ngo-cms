from django.contrib import admin
from apps.media_gallery.models import Media


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ["title", "media_type", "category", "status", "created_at"]
    list_filter = ["media_type", "category", "status"]
    search_fields = ["title", "description"]
    ordering = ["-created_at"]
