from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.permissions import IsAdminOrReadOnly
from .models import Banner, VisionMission, Statistic, Initiative, PageContent
from .serializers import (
    BannerSerializer,
    VisionMissionSerializer,
    StatisticSerializer,
    InitiativeSerializer,
    PageContentSerializer,
)


class BannerViewSet(viewsets.ModelViewSet):
    serializer_class = BannerSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        qs = Banner.objects.all()
        if self.request.user.is_authenticated:
            return qs
        return qs.filter(status=True)


class VisionMissionViewSet(viewsets.ModelViewSet):
    serializer_class = VisionMissionSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        return VisionMission.objects.all()


class StatisticViewSet(viewsets.ModelViewSet):
    serializer_class = StatisticSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        qs = Statistic.objects.all()
        if self.request.user.is_authenticated:
            return qs
        return qs.filter(status="active")


class InitiativeViewSet(viewsets.ModelViewSet):
    serializer_class = InitiativeSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        qs = Initiative.objects.all()
        if self.request.user.is_authenticated:
            return qs
        return qs.filter(status="active")


class PageContentViewSet(viewsets.ModelViewSet):
    serializer_class = PageContentSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        qs = PageContent.objects.all()
        page_type = self.request.query_params.get("page_type")
        if page_type:
            qs = qs.filter(page_type=page_type)
        if not self.request.user.is_authenticated:
            qs = qs.filter(status="published")
        return qs.order_by("page_type", "sort_order")

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)



class HomeContentAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        banners = BannerSerializer(
            Banner.objects.filter(status=True).order_by("order"), many=True
        ).data
        vm = VisionMission.objects.first()
        vision_mission = VisionMissionSerializer(vm).data if vm else None
        stats = StatisticSerializer(
            Statistic.objects.filter(status="active").order_by("order"), many=True
        ).data
        initiatives = InitiativeSerializer(
            Initiative.objects.filter(status="active").order_by("order"), many=True
        ).data
        content_blocks = PageContentSerializer(
            PageContent.objects.filter(page_type="home", status="published").order_by("sort_order"),
            many=True,
        ).data

        return Response({
            "banners": banners,
            "vision_mission": vision_mission,
            "statistics": stats,
            "initiatives": initiatives,
            "content_blocks": content_blocks,
        })