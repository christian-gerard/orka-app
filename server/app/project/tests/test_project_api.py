"""
Tests Account API
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Account, Client, Project
import pdb

from account.serializers import (
    AccountSerializer,
    AccountDetailSerializer,
    ClientSerializer,
    ClientDetailSerializer,
    ProjectSerializer,
    ProjectDetailSerializer,
)


PROJECT_URL = reverse('project:project-list')
TASK_URL = PROJECT_URL + 'tasks/'
EXPENSE_URL = PROJECT_URL + 'expenses/'
BUDGET_URL = PROJECT_URL + 'budgets/'

def detail_url(id, model):
    """Return detail url for specific account"""
    return reverse(f"{model}:{model}-detail", args=[id])

def create_account(**params):
    """Create and Return a new account"""
    return Account.objects.create_account(**params)

def create_client(**params):
    """Create and Return a new client"""
    return Client.objects.create_client(**params)

def create_project(**params):
    """Create and Return a new project"""
    return Project.objects.create_project(**params)

class PublicProjectAPITests(TestCase):
    """Test Unauthenticated API Requests"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test Auth is required to call API"""

        res = self.client.get(PROJECT_URL)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


class PrivateProjectAPITests(TestCase):
    """Test Authorized Requests to Account API"""

    def setUp(self):
        self.client = APIClient()
        # self.user = get_user_model().objects.create_user(
        #     "test@example.com",
        #     "testpass123"
        # )
        # self.client.force_authenticate(self.user)

    # def test_retrieve_project_list(self):
    #     """Test Retrieving a list of accounts"""

    #     create_project(self.user)
    #     create_project(self.user)

    #     res = self.client.get(PROJECT_URL)
    #     serializer = ProjectSerializer(self.user.projects.all(), many=True)

    #     self.assertEqual(res.status_code, status.HTTP_200_OK)
    #     self.assertEqual(res.data, serializer.data)

    # def test_create_project(self):
    #     """Test Adding a project """

    #     create_project(self.user)

    #     client = create_client(self.user)

    #     payload = {
    #         "name": "Example Project",
    #         "deadline": "2024-10-02",
    #         "description": "Example description of project",
    #         "project_type": "exampleType",
    #         "budget": 1000.00,
    #         "client": client.id
    #     }

    #     res = self.client.post(PROJECT_URL, payload)

    #     self.assertEqual(res.status_code, status.HTTP_201_CREATED)
