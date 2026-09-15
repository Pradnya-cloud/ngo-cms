from django.urls import path
from .views import DashboardStatsView, DashboardRecentView

urlpatterns = [
    path("stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path("recent/", DashboardRecentView.as_view(), name="dashboard-recent"),
]