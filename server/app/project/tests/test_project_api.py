"""
Tests for Project API
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

PROJECT_URL = reverse('project:project-list')


class PublicProjectAPITests(TestCase):
    """Test Unauthorized API Requests"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test Auth is required to call API"""
        res = self.client.get(PROJECT_URL)

        self.assertEqual(res.stats_code, status.HTTP_401_UNAUTHORIZED)


class PrivateProjectAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            "example@test.com",
            "testpass123"
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_projects(self):
        """Test Retrieving projects from API"""
