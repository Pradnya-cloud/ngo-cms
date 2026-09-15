from django.contrib import admin
from apps.projects.models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "project_type", "status", "category", "target_amount", "raised_amount", "created_by", "created_at"]
    list_filter = ["project_type", "status", "category"]
    search_fields = ["title", "short_description", "description", "location"]
    readonly_fields = ["created_at", "updated_at"]
    prepopulated_fields = {"slug": ["title"]}