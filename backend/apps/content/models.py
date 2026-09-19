from django.db import models
from apps.accounts.models import User


class PageContent(models.Model):
    page_type = models.CharField(max_length=50, default="home")
    section = models.CharField(max_length=100)
    title = models.CharField(max_length=255, blank=True, default="")
    content = models.TextField(blank=True, default="")
    image = models.URLField(blank=True, default="")
    sort_order = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default="published")
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="page_content"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "page_content"
        ordering = ["page_type", "sort_order"]

    def __str__(self):
        return f"{self.page_type} - {self.section}"


class Banner(models.Model):
    image_url = models.URLField(max_length=255)
    title = models.CharField(max_length=150, blank=True, default="")
    description = models.TextField(blank=True, default="")
    order = models.IntegerField(default=0)
    status = models.BooleanField(default=True)

    class Meta:
        db_table = "banners"
        ordering = ["order"]

    def __str__(self):
        return self.title or f"Banner {self.id}"


class VisionMission(models.Model):
    vision_title = models.CharField(max_length=150)
    vision_description = models.CharField(max_length=200, blank=True, default="")
    mission_title = models.CharField(max_length=150)
    mission_description = models.CharField(max_length=200, blank=True, default="")
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "vision_mission"

    def __str__(self):
        return self.vision_title


class Statistic(models.Model):
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=50)
    order = models.IntegerField(default=0)
    status = models.CharField(max_length=50, default="active")

    class Meta:
        db_table = "statistics"
        ordering = ["order"]

    def __str__(self):
        return self.label


class Initiative(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True, default="")
    image_url = models.URLField(max_length=150, blank=True, default="")
    order = models.IntegerField(default=0)
    status = models.CharField(max_length=50, default="active")

    class Meta:
        db_table = "initiatives"
        ordering = ["order"]

    def __str__(self):
        return self.title