from django.db import models
from apps.accounts.models import User


from django.utils.text import slugify


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField(blank=True, default="")
    featured_image = models.URLField(blank=True, default="")
    category = models.CharField(max_length=100, blank=True, default="")
    tags = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=20, default="draft")
    author = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="blog_posts"
    )
    publish_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "blog_posts"
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "post"
            slug = base_slug
            counter = 1
            while BlogPost.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

