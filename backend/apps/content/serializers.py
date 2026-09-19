from rest_framework import serializers
from .models import Banner, VisionMission, Statistic, Initiative, PageContent


class PageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageContent
        fields = ["id", "page_type", "section", "title", "content", "image", "sort_order", "status", "created_by", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at", "created_by"]


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ["id", "image_url", "title", "description", "order", "status"]


class VisionMissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisionMission
        fields = ["id", "vision_title", "vision_description", "mission_title", "mission_description", "last_updated"]


class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = ["id", "label", "value", "order", "status"]


class InitiativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Initiative
        fields = ["id", "title", "description", "image_url", "order", "status"]