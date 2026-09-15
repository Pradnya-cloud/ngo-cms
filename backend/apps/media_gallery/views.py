from rest_framework import viewsets
from apps.media_gallery.models import Media
from apps.media_gallery.serializers import MediaSerializer
from apps.accounts.permissions import IsAdminOrReadOnly


class MediaViewSet(viewsets.ModelViewSet):
    serializer_class = MediaSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "pk"

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Media.objects.filter(status="published")
        return Media.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
