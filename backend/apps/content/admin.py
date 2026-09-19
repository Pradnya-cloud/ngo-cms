from django.contrib import admin
from .models import Banner, VisionMission, Statistic, Initiative, PageContent


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ["title", "order", "status"]
    list_filter = ["status"]
    ordering = ["order"]


@admin.register(VisionMission)
class VisionMissionAdmin(admin.ModelAdmin):
    list_display = ["vision_title", "mission_title", "last_updated"]


@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    list_display = ["label", "value", "order", "status"]
    list_filter = ["status"]
    ordering = ["order"]


@admin.register(Initiative)
class InitiativeAdmin(admin.ModelAdmin):
    list_display = ["title", "order", "status"]
    list_filter = ["status"]
    ordering = ["order"]


@admin.register(PageContent)
class PageContentAdmin(admin.ModelAdmin):
    list_display = ["page_type", "section", "title", "status"]
    list_filter = ["page_type", "status"]
    search_fields = ["title", "section"]