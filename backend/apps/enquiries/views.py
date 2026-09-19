from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.enquiries.models import Enquiry, Subscription
from apps.enquiries.serializers import EnquirySerializer, SubscriptionSerializer
from apps.accounts.permissions import CanCreateOrAdminOnly


class EnquiryViewSet(viewsets.ModelViewSet):
    serializer_class = EnquirySerializer
    permission_classes = [CanCreateOrAdminOnly]
    lookup_field = "pk"

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Enquiry.objects.none()
        return Enquiry.objects.all()


class SubscribeView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SubscriptionSerializer(data={"email": request.data.get("email")})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

