from django.contrib import admin
from apps.blog.models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "status", "category", "author", "publish_date", "created_at"]
    list_filter = ["status", "category"]
    search_fields = ["title", "category"]
    ordering = ["-created_at"]
