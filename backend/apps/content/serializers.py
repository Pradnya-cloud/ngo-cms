from rest_framework import serializers
from .models import PageContent


class PageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageContent
        fields = ["id", "page_type", "section", "title", "content", "image", "sort_order", "status", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
