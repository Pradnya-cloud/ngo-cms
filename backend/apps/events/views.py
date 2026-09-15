from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from apps.events.models import Event, EventRegistration
from apps.events.serializers import EventSerializer, EventRegistrationSerializer
from apps.accounts.permissions import IsAdminOrReadOnly


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "pk"

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Event.objects.filter(status="published")
        return Event.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EventRegistrationViewSet(viewsets.ModelViewSet):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "pk"


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, pk):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response({"detail": "Event not found."}, status=404)
        serializer = EventRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            event.registered_count += 1
            event.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
