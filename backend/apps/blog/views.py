from rest_framework import viewsets
from apps.blog.models import BlogPost
from apps.blog.serializers import BlogPostSerializer
from apps.accounts.permissions import IsAdminOrReadOnly


class BlogPostViewSet(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "pk"

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return BlogPost.objects.filter(status="published")
        return BlogPost.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
