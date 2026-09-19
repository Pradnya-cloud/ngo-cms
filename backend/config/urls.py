from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("apps.accounts.urls")),
    path("api/content/", include("apps.content.urls")),
    path("api/projects/", include("apps.projects.urls")),
    path("api/donations/", include("apps.donations.urls")),
    path("api/media/", include("apps.media_gallery.urls")),
    path("api/events/", include("apps.events.urls")),
    path("api/volunteers/", include("apps.volunteers.urls")),
    path("api/blog/", include("apps.blog.urls")),
    path("api/enquiries/", include("apps.enquiries.urls")),
    path("api/dashboard/", include("apps.dashboard.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)