from rest_framework import serializers
from apps.media_gallery.models import Media


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = "__all__"
        read_only_fields = ["created_by"]
