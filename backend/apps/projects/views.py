from rest_framework import viewsets
from apps.projects.models import Project
from apps.projects.serializers import ProjectSerializer
from apps.accounts.permissions import IsAdminOrReadOnly


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = Project.objects.all()
        project_type = self.request.query_params.get("type")
        status = self.request.query_params.get("status")
        if project_type:
            queryset = queryset.filter(project_type=project_type)
        if status:
            queryset = queryset.filter(status=status)
        elif not self.request.user.is_authenticated:
            queryset = queryset.filter(status="published")
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)