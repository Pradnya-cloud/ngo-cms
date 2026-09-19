from django.db import models
from apps.accounts.models import User


from django.utils.text import slugify


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

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "event"
            slug = base_slug
            counter = 1
            while Event.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

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
