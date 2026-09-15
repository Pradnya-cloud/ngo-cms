from django.db import models


class Volunteer(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, default="")
    skills = models.TextField(blank=True, default="")
    availability = models.CharField(max_length=50, blank=True, default="")
    motivation = models.TextField(blank=True, default="")
    status = models.CharField(max_length=20, default="pending")
    applied_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, default="")

    class Meta:
        db_table = "volunteers"
        ordering = ["-applied_at"]

    def __str__(self):
        return self.name
