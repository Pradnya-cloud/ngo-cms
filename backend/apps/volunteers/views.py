from rest_framework import viewsets
from apps.volunteers.models import Volunteer
from apps.volunteers.serializers import VolunteerSerializer
from apps.accounts.permissions import IsAdminOrReadOnly


class VolunteerViewSet(viewsets.ModelViewSet):
    serializer_class = VolunteerSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "pk"

    def get_queryset(self):
        qs = Volunteer.objects.all()
        status = self.request.query_params.get("status")
        if status:
            qs = qs.filter(status=status)
        return qs
