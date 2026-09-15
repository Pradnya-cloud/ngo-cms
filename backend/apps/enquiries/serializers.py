from rest_framework import serializers
from apps.enquiries.models import Enquiry


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = "__all__"
        read_only_fields = ["status", "admin_reply", "replied_at"]


class EnquiryPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ["name", "email", "phone", "subject", "message", "enquiry_type"]
