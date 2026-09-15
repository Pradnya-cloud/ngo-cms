from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter(trailing_slash=False)
router.register(r"", views.VolunteerViewSet, basename="volunteer")

urlpatterns = router.urls