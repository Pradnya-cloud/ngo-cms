from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from apps.content.models import PageContent
from apps.projects.models import Project
from apps.donations.models import Donation

User = get_user_model()


class AuthTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="admin@test.com", password="testpass123", full_name="Test Admin"
        )

    def test_login_returns_token(self):
        client = APIClient()
        resp = client.post("/api/auth/login/", {"email": "admin@test.com", "password": "testpass123"}, format="json")
        self.assertEqual(resp.status_code, 200)
        self.assertIn("access", resp.data)
        self.assertIn("refresh", resp.data)
        self.assertIn("user", resp.data)
        self.assertEqual(resp.data["user"]["email"], "admin@test.com")

    def test_login_invalid_password(self):
        client = APIClient()
        resp = client.post("/api/auth/login/", {"email": "admin@test.com", "password": "wrong"}, format="json")
        self.assertEqual(resp.status_code, 401)

    def test_me_requires_auth(self):
        client = APIClient()
        resp = client.get("/api/auth/me/")
        self.assertEqual(resp.status_code, 401)

    def test_me_returns_user(self):
        client = APIClient()
        token = RefreshToken.for_user(self.user).access_token
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        resp = client.get("/api/auth/me/")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data["email"], "admin@test.com")


class ContentTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="admin@test.com", password="testpass123")
        self.client = APIClient()
        token = RefreshToken.for_user(self.user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_create_and_list_content(self):
        resp = self.client.post("/api/content/", {
            "page_type": "home", "section": "hero", "title": "Hero",
            "content": "Welcome", "status": "published"
        }, format="json")
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.data["page_type"], "home")

        resp = self.client.get("/api/content/?page_type=home")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.data), 1)
        self.assertEqual(resp.data[0]["section"], "hero")

    def test_anonymous_cannot_create(self):
        client = APIClient()
        resp = client.post("/api/content/", {"page_type": "home", "section": "test"}, format="json")
        self.assertEqual(resp.status_code, 401)


class ProjectTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="admin@test.com", password="testpass123")
        self.client = APIClient()
        token = RefreshToken.for_user(self.user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_create_project(self):
        resp = self.client.post("/api/projects/", {
            "title": "Test Project", "project_type": "project",
            "status": "published", "short_description": "A test"
        }, format="json")
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.data["title"], "Test Project")
        self.assertEqual(resp.data["created_by"], self.user.id)

    def test_list_projects_anonymous(self):
        Project.objects.create(
            title="Pub", project_type="project", status="published",
            created_by=self.user
        )
        client = APIClient()
        resp = client.get("/api/projects/")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.data["results"]), 1)


class DonationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="admin@test.com", password="testpass123")
        self.project = Project.objects.create(
            title="Test", project_type="project", status="published", created_by=self.user
        )

    def test_create_order(self):
        client = APIClient()
        resp = client.post("/api/donations/order/", {"amount": 500, "project_id": None}, format="json")
        self.assertEqual(resp.status_code, 200)
        self.assertIn("order_id", resp.data)
        self.assertEqual(resp.data["amount"], 500)

    def test_verify_creates_donation(self):
        client = APIClient()
        order = client.post("/api/donations/order/", {"amount": 100}, format="json").json()
        resp = client.post("/api/donations/verify/", {
            "order_id": order["order_id"], "payment_id": "pay_123",
            "signature": "sig", "donor_name": "John", "donor_email": "j@j.com",
            "donor_phone": "123", "amount": 100, "project_id": None
        }, format="json")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data["status"], "success")
        self.assertEqual(Donation.objects.count(), 1)

    def test_list_requires_admin(self):
        client = APIClient()
        resp = client.get("/api/donations/")
        self.assertEqual(resp.status_code, 401)