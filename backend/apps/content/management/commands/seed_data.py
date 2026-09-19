from django.core.management.base import BaseCommand
from apps.accounts.models import User
from apps.content.models import Banner, VisionMission, Statistic, Initiative, PageContent
from apps.projects.models import Project
from apps.events.models import Event
from apps.media_gallery.models import Media
from apps.blog.models import BlogPost


class Command(BaseCommand):
    help = "Seed initial database content with user images and foundation data"

    def handle(self, *args, **options):
        user = User.objects.filter(is_superuser=True).first()
        if not user:
            user = User.objects.create_superuser(
                email="admin@ngocms.org",
                password="admin123"
            )
            user.full_name = "Admin User"
            user.save()
            self.stdout.write("Created superuser admin@ngocms.org")

        # 1. Vision & Mission
        vm, _ = VisionMission.objects.get_or_create(
            id=1,
            defaults={
                "vision_title": "Our Vision",
                "vision_description": "A world where every child has access to quality education, healthcare, and the opportunity to achieve their full potential in an inclusive society.",
                "mission_title": "Our Mission",
                "mission_description": "To create a lasting impact in the lives of underprivileged children, families, and elderly citizens by providing education, women's empowerment, healthcare, and livelihood opportunities.",
            }
        )
        self.stdout.write(self.style.SUCCESS("Seeded Vision & Mission"))

        # 2. Banners (Hero Slider)
        Banner.objects.all().delete()
        Banner.objects.create(
            title="Empowering Rural Education",
            description="Bringing joyful learning, bridge schools, and quality educational resources to every village child.",
            image_url="/images/banner-classroom.png",
            order=1,
            status=True,
        )
        Banner.objects.create(
            title="Care & Dignity for the Elderly",
            description="Filling the lives of senior citizens and vulnerable elders with love, healthcare, warm meals, and happiness.",
            image_url="/images/banner-elderly.png",
            order=2,
            status=True,
        )
        self.stdout.write(self.style.SUCCESS("Seeded Banners"))

        # 3. Statistics
        Statistic.objects.all().delete()
        stats_data = [
            {"label": "Children in school", "value": "12,400+", "order": 1},
            {"label": "Villages reached", "value": "186", "order": 2},
            {"label": "Health camps held", "value": "340", "order": 3},
            {"label": "Women trained for livelihoods", "value": "3,050", "order": 4},
        ]
        for s in stats_data:
            Statistic.objects.create(label=s["label"], value=s["value"], order=s["order"], status="active")
        self.stdout.write(self.style.SUCCESS("Seeded Statistics"))

        # 4. Initiatives
        Initiative.objects.all().delete()
        initiatives_data = [
            {
                "title": "Child Nutrition & Daily Meals",
                "description": "Combating malnutrition by providing wholesome, hot meals to underprivileged school children across remote centers.",
                "image_url": "/images/initiative-nutrition.png",
                "order": 1,
            },
            {
                "title": "Education Over Child Labor",
                "description": "Transforming lives by transitioning working youth into formal classrooms with books, uniforms, and care.",
                "image_url": "/images/initiative-education.png",
                "order": 2,
            },
            {
                "title": "Village Outdoor Classrooms",
                "description": "Open-air bridge schools and interactive learning modules designed for first-generation rural learners.",
                "image_url": "/images/banner-classroom.png",
                "order": 3,
            },
        ]
        for item in initiatives_data:
            Initiative.objects.create(
                title=item["title"],
                description=item["description"],
                image_url=item["image_url"],
                order=item["order"],
                status="active"
            )
        self.stdout.write(self.style.SUCCESS("Seeded Initiatives"))

        # 5. Projects
        if Project.objects.count() == 0:
            projects_data = [
                {
                    "title": "Bridge School — Kolhapur Rural Belt",
                    "project_type": "project",
                    "short_description": "After-school bridge classes helping first-generation learners catch up to grade level in reading and math.",
                    "status": "published",
                },
                {
                    "title": "Mobile Health Unit — Sahyadri Villages",
                    "project_type": "project",
                    "short_description": "A van-based clinic visiting 22 villages on rotation, offering check-ups, maternal care, and emergency referrals.",
                    "status": "published",
                },
                {
                    "title": "Nutrition & Warmth for Elders",
                    "project_type": "campaign",
                    "short_description": "Community feeding and healthcare program supporting elderly citizens living alone in rural clusters.",
                    "status": "published",
                },
            ]
            for p in projects_data:
                Project.objects.create(
                    title=p["title"],
                    project_type=p["project_type"],
                    short_description=p["short_description"],
                    status=p["status"],
                    created_by=user,
                )
            self.stdout.write(self.style.SUCCESS("Seeded Projects"))

        # 6. Events
        if Event.objects.count() == 0:
            from django.utils import timezone
            from datetime import timedelta
            Event.objects.create(
                title="Annual Community Health & Nutrition Camp",
                description="Free health checkups, dental screening, and nutrition kits distribution for children and families.",
                event_date=timezone.now() + timedelta(days=14),
                location="Kolhapur Community Hall",
                status="published",
                capacity=200,
                created_by=user,
            )
            Event.objects.create(
                title="Back to School Drive & Book Distribution",
                description="Distributing bags, stationery, and books to newly enrolled students in rural bridge schools.",
                event_date=timezone.now() + timedelta(days=30),
                location="Sahyadri Educational Center",
                status="published",
                capacity=150,
                created_by=user,
            )
            self.stdout.write(self.style.SUCCESS("Seeded Events"))


        # 7. Media Gallery
        if Media.objects.count() == 0:
            media_items = [
                {"title": "Rural Outdoor Classroom in Action", "media_type": "image", "file_url": "/images/banner-classroom.png"},
                {"title": "Elder Care & Community Gathering", "media_type": "image", "file_url": "/images/banner-elderly.png"},
                {"title": "Nutrition Program Plate Distribution", "media_type": "image", "file_url": "/images/initiative-nutrition.png"},
                {"title": "Child Rights & Education Campaign", "media_type": "image", "file_url": "/images/initiative-education.png"},
            ]
            for m in media_items:
                Media.objects.create(
                    title=m["title"],
                    media_type=m["media_type"],
                    file_url=m["file_url"],
                    status="published",
                    created_by=user,
                )
            self.stdout.write(self.style.SUCCESS("Seeded Media"))

        self.stdout.write(self.style.SUCCESS("All seed data successfully loaded!"))
