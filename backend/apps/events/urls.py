from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter(trailing_slash=False)
router.register(r"", views.EventViewSet, basename="event")
router.register(r"registrations", views.EventRegistrationViewSet, basename="eventregistration")

urlpatterns = router.urls + [
    path("<int:pk>/register/", views.RegisterView.as_view(), name="event-register"),
]