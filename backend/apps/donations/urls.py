from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter(trailing_slash=False)
router.register(r"", views.DonationViewSet, basename="donation")
urlpatterns = [
    path("", include(router.urls)),
    path("order/", views.CreateOrderView.as_view(), name="donation-order"),
    path("verify/", views.VerifyPaymentView.as_view(), name="donation-verify"),
    path("webhook/", views.WebhookView.as_view(), name="donation-webhook"),
]