from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"", views.EnquiryViewSet, basename="enquiry")

urlpatterns = [
    path("newsletter/", views.SubscribeView.as_view(), name="newsletter-subscribe"),
    *router.urls,
]
