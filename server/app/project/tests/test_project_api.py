"""
Tests for Project API
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from datetime import date

from rest_framework import status
from rest_framework.test import APIClient
from project.serializers import ProjectSerializer, ProjectDetailSerializer
from core import models

import pdb

PROJECT_URL = reverse('project:project-list')

def detail_url(project_id):
    """Get Detail Url"""
    return reverse('project:project-detail', args=[project_id])


class PublicProjectAPITests(TestCase):
    """Test Unauthorized API Requests"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test Auth is required to call API"""
        res = self.client.get(PROJECT_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateProjectAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            "example@test.com",
            "testpass123"
        )
        self.user.accounts.create(
            name="Current User Account",
            type="-----"
        )
        c1 = models.Client.objects.create(
            name="Test Client",
            description="Describing the client",
            industry="test industry",
            ein = "9898989",
            address_one = "TESTING St",
            address_two = "Suite 100",
            city = "Testing City",
            state = "California",
            zip_code = "91919191",
            account=self.user.accounts.first()
        )

        self.project1 = models.Project.objects.create(
            name='Test Project',
            description="Test Description",
            deadline=date.today(),
            project_type="Test Type",
            budget=0.00,
            client=c1,
        )

        self.project2 = models.Project.objects.create(
            name='Test Project',
            description="Test Description",
            deadline=date.today(),
            project_type="Test Type",
            budget=0.00,
            client=c1,
        )

        self.client.force_authenticate(self.user)

    def test_retrieve_projects(self):
        """Test Retrieving projects from API"""
        res = self.client.get(PROJECT_URL)
        queryset = models.Project.objects.all()

        serializer = ProjectSerializer(queryset, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_retrieve_project_detail(self):
        """Test Retrieving Project Detail from API"""
        url = detail_url(self.project1.id)
        res = self.client.get(url)

        serializer = ProjectDetailSerializer(self.project1)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)




