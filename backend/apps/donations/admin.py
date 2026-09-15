from django.contrib import admin
from .models import Donation


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ["id", "donor_name", "donor_email", "amount", "status", "payment_method", "date", "receipt_sent"]
    list_filter = ["status", "payment_method", "date"]
    search_fields = ["donor_name", "donor_email", "payment_order_id", "payment_payment_id"]
    readonly_fields = ["date", "payment_order_id", "payment_payment_id", "payment_signature", "receipt_sent"]
    ordering = ["-date"]