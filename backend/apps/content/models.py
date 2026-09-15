from django.db import models


class PageContent(models.Model):
    page_type = models.CharField(max_length=50, db_index=True)
    section = models.CharField(max_length=100, db_index=True)
    title = models.CharField(max_length=255, blank=True, default="")
    content = models.TextField(blank=True, default="")
    image = models.URLField(blank=True, default="")
    sort_order = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default="published")
    created_by = models.ForeignKey(
        "accounts.User", on_delete=models.SET_NULL, null=True, blank=True, related_name="content_blocks"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "page_content"
        ordering = ["page_type", "sort_order"]
        indexes = [
            models.Index(fields=["page_type", "status"]),
        ]

    def __str__(self):
        return f"{self.page_type} / {self.section}"
