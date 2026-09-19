from django.urls import path
from .views import (
    BannerViewSet,
    VisionMissionViewSet,
    StatisticViewSet,
    InitiativeViewSet,
    PageContentViewSet,
    HomeContentAPIView,
)


def _viewset_list_create(viewset):
    return viewset.as_view({"get": "list", "post": "create"})


def _viewset_crud(viewset):
    return viewset.as_view({
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    })


urlpatterns = [
    path("", _viewset_list_create(PageContentViewSet), name="pagecontent-root-list"),
    path("<int:pk>/", _viewset_crud(PageContentViewSet), name="pagecontent-root-detail"),

    path("banners/", _viewset_list_create(BannerViewSet), name="banner-list"),
    path("banners/<int:pk>/", _viewset_crud(BannerViewSet), name="banner-detail"),

    path("vision-mission/", _viewset_list_create(VisionMissionViewSet), name="visionmission-list"),
    path("vision-mission/<int:pk>/", _viewset_crud(VisionMissionViewSet), name="visionmission-detail"),

    path("statistics/", _viewset_list_create(StatisticViewSet), name="statistic-list"),
    path("statistics/<int:pk>/", _viewset_crud(StatisticViewSet), name="statistic-detail"),

    path("initiatives/", _viewset_list_create(InitiativeViewSet), name="initiative-list"),
    path("initiatives/<int:pk>/", _viewset_crud(InitiativeViewSet), name="initiative-detail"),

    path("page-content/", _viewset_list_create(PageContentViewSet), name="pagecontent-list"),
    path("page-content/<int:pk>/", _viewset_crud(PageContentViewSet), name="pagecontent-detail"),

    path("home/", HomeContentAPIView.as_view(), name="home-content"),
]