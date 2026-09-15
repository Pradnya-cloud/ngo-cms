from rest_framework import serializers
from .models import Donation
from apps.projects.models import Project


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = "__all__"
        read_only_fields = ["id", "date", "receipt_sent"]


class DonationCreateSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Donation
        fields = ["donor_name", "donor_email", "donor_phone", "amount", "project", "donor_message"]