from rest_framework import viewsets
from apps.volunteers.models import Volunteer
from apps.volunteers.serializers import VolunteerSerializer
from apps.accounts.permissions import CanCreateOrAdminOnly


class VolunteerViewSet(viewsets.ModelViewSet):
    serializer_class = VolunteerSerializer
    permission_classes = [CanCreateOrAdminOnly]
    lookup_field = "pk"

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Volunteer.objects.none()
        qs = Volunteer.objects.all()
        status = self.request.query_params.get("status")
        if status:
            qs = qs.filter(status=status)
        return qs

