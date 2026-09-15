from django.db import models


class Enquiry(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, default="")
    subject = models.CharField(max_length=255, blank=True, default="")
    message = models.TextField(blank=True, default="")
    enquiry_type = models.CharField(max_length=20, default="contact")
    status = models.CharField(max_length=20, default="new")
    admin_reply = models.TextField(blank=True, default="")
    replied_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "enquiries"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
