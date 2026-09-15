from django.db import models
from apps.accounts.models import User
from apps.projects.models import Project


class Donation(models.Model):
    donor_name = models.CharField(max_length=255)
    donor_email = models.EmailField()
    donor_phone = models.CharField(max_length=20, blank=True, default="")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True, related_name="donations")
    payment_order_id = models.CharField(max_length=100, blank=True, default="")
    payment_payment_id = models.CharField(max_length=100, blank=True, default="")
    payment_signature = models.CharField(max_length=255, blank=True, default="")
    status = models.CharField(max_length=20, default="pending")
    payment_method = models.CharField(max_length=20, blank=True, default="")
    donor_message = models.TextField(blank=True, default="")
    date = models.DateTimeField(auto_now_add=True)
    receipt_sent = models.BooleanField(default=False)
    notes = models.TextField(blank=True, default="")

    class Meta:
        db_table = "donations"
        ordering = ["-date"]