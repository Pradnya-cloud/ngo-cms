import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = "Create a superuser if none exists"

    def handle(self, *args, **options):
        if User.objects.filter(is_superuser=True).exists():
            self.stdout.write(self.style.SUCCESS("Superuser already exists"))
            return

        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@ngocms.org")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "admin123")
        full_name = os.environ.get("DJANGO_SUPERUSER_NAME", "Admin User")

        user = User.objects.create_superuser(email=email, password=password)
        user.full_name = full_name
        user.save()
        self.stdout.write(self.style.SUCCESS(f"Superuser created: {email}"))