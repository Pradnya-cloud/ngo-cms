from django.db.models import Count, Sum
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.donations.models import Donation
from apps.volunteers.models import Volunteer
from apps.projects.models import Project
from apps.enquiries.models import Enquiry
from apps.events.models import Event, EventRegistration


class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total_donations = Donation.objects.filter(status="success").aggregate(
            count=Count("id"), total=Sum("amount")
        )
        pending_donations = Donation.objects.filter(status="pending").count()
        volunteers_total = Volunteer.objects.count()
        volunteers_pending = Volunteer.objects.filter(status="pending").count()
        projects_total = Project.objects.count()
        projects_published = Project.objects.filter(status="published").count()
        campaigns_total = Project.objects.filter(project_type="campaign").count()
        enquiries_total = Enquiry.objects.count()
        enquiries_new = Enquiry.objects.filter(status="new").count()
        events_total = Event.objects.count()
        registrations_total = EventRegistration.objects.count()

        recent_donations = (
            Donation.objects.filter(status="success")
            .order_by("-date")[:5]
            .values("id", "donor_name", "amount", "date", "project__title")
        )
        recent_volunteers = (
            Volunteer.objects.order_by("-applied_at")[:5]
            .values("id", "name", "email", "status", "applied_at")
        )

        return Response({
            "donations": {
                "total_count": total_donations["count"] or 0,
                "total_amount": float(total_donations["total"] or 0),
                "pending_count": pending_donations,
            },
            "volunteers": {"total": volunteers_total, "pending": volunteers_pending},
            "projects": {
                "total": projects_total,
                "published": projects_published,
                "campaigns": campaigns_total,
            },
            "enquiries": {"total": enquiries_total, "new": enquiries_new},
            "events": {"total": events_total, "registrations": registrations_total},
            "recent_donations": list(recent_donations),
            "recent_volunteers": list(recent_volunteers),
        })


class DashboardRecentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        from apps.content.models import PageContent
        from apps.media_gallery.models import Media
        from apps.blog.models import BlogPost

        recent_content = PageContent.objects.order_by("-updated_at")[:5].values(
            "id", "page_type", "section", "title", "updated_at"
        )
        recent_media = Media.objects.order_by("-created_at")[:5].values(
            "id", "title", "media_type", "created_at"
        )
        recent_blog = BlogPost.objects.order_by("-created_at")[:5].values(
            "id", "title", "status", "created_at"
        )

        return Response({
            "recent_content": list(recent_content),
            "recent_media": list(recent_media),
            "recent_blog": list(recent_blog),
        })