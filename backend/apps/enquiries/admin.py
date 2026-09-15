from django.contrib import admin
from apps.enquiries.models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "enquiry_type", "status", "created_at"]
    list_filter = ["status", "enquiry_type"]
    search_fields = ["name", "email", "subject"]
    ordering = ["-created_at"]
