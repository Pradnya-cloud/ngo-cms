from django.contrib import admin
from .models import PageContent


@admin.register(PageContent)
class PageContentAdmin(admin.ModelAdmin):
    list_display = ["page_type", "section", "title", "sort_order", "status", "created_at"]
    list_filter = ["page_type", "status"]
    search_fields = ["title", "content"]
    ordering = ["page_type", "sort_order"]
    list_editable = ["sort_order", "status"]