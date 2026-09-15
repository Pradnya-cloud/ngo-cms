from rest_framework import viewsets
from apps.enquiries.models import Enquiry
from apps.enquiries.serializers import EnquirySerializer
from apps.accounts.permissions import IsAdminOrReadOnly


class EnquiryViewSet(viewsets.ModelViewSet):
    serializer_class = EnquirySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "pk"

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Enquiry.objects.none()
        return Enquiry.objects.all()
