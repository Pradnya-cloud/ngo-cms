from django.db import models
from apps.accounts.models import User


class Media(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    media_type = models.CharField(max_length=20, default="image")
    file_url = models.URLField(blank=True, default="")
    thumbnail_url = models.URLField(blank=True, default="")
    category = models.CharField(max_length=100, blank=True, default="")
    status = models.CharField(max_length=20, default="draft")
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="media_items"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "media_gallery"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
