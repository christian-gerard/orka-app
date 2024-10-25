"""
Tests Account API
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Account, Client, Project, Budget
import pdb

from project.serializers import (
    ProjectSerializer,
    ProjectDetailSerializer,
)


PROJECT_URL = reverse('project:project-list')
TASK_URL = PROJECT_URL + 'tasks/'
EXPENSE_URL = PROJECT_URL + 'expenses/'
BUDGET_URL = '/api/budgets/'


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

def create_budget(**params):
    """Create and Return a new project"""
    return Budget.objects.create_budget(**params)

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
        self.account = create_account(
            name='TEST',
            type='XYZ'
        )
        self.account_other = create_account(
            name='UNAUTHORIZED',
            type='UNAUTHORIZED'
        )
        self.user = get_user_model().objects.create_user(
            email='test@example.com',
            password='testpass123!',
            first_name='Frst',
            last_name='Last',
            account=self.account
        )
        self.client.force_authenticate(self.user)
        self.client_1 = create_client(
            name="TEST CLIENT",
            description="TEST DESCRIPTION",
            client_type="TEST TYPE",
            ein="99-9999999",
            address_one="TEST STREET",
            address_two="TEST SUITE",
            city="TEST CITY",
            state="TEST STATE",
            zip_code="99999",
            account=self.account
        )
        self.client_2 = create_client(
            name="2 TEST CLIENT",
            description="2 TEST DESCRIPTION",
            client_type="2 TEST TYPE",
            ein="99-9999999",
            address_one="2 TEST STREET",
            address_two="2 TEST SUITE",
            city="2 TEST CITY",
            state="2 TEST STATE",
            zip_code="99999",
            account=self.account
        )
        self.client_other = create_client(
            name="TEST CLIENT",
            description="TEST DESCRIPTION",
            client_type="TEST TYPE",
            ein="99-9999999",
            address_one="2 TEST STREET",
            address_two="2 TEST SUITE",
            city="2 TEST CITY",
            state="2 TEST STATE",
            zip_code="99999",
            account=self.account_other
        )
        self.project_other = create_project(client=self.client_other)
        self.project_1 = create_project(client=self.client_1)
        self.project_2 = create_project(client=self.client_1)
        self.budget_1 = create_budget(project=self.project_1)
        self.budget_2 = create_budget(project=self.project_1)
        self.budget_3 = create_budget(project=self.project_1)

    def test_retrieve_project_list(self):
        """Test Retrieving a list of accounts"""

        res = self.client.get(PROJECT_URL)
        queryset = Project.objects.all()
        serializer = ProjectSerializer(queryset, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_project(self):
        """Test Adding a project """

        payload = {
            "name": "Example Project",
            "deadline": "2024-10-02",
            "description": "Example description of project",
            "project_type": "exampleType",
            "client": self.client_1.id
        }

        res = self.client.post(PROJECT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_delete_project(self):
        """Test Deleting a Project"""

        project = create_project(client=self.client_1)

        res = self.client.delete(detail_url(project.id, "project"))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_patch_project(self):
        """Test Patching a Project"""

        project = create_project(client=self.client_1,name="ORIGINAL")

        payload = {
            "name": "PATCHED!"
        }

        res = self.client.patch(detail_url(project.id, "project"), payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["name"], "PATCHED!")

    def test_add_user_to_project(self):
        """Test adding a user to project"""
        project = create_project(client=self.client_1)

        payload = {
            "user": self.user.id
        }
        res = self.client.post(detail_url(project.id, "project") + "add-user/", payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_delete_user_from_project(self):
        """Test adding a user to project"""
        project = create_project(client=self.client_1)
        payload = {
            "user": self.user.id
        }
        self.client.post(detail_url(project.id, "project") + "add-user/", payload)

        res = self.client.post(detail_url(project.id, "project") + "delete-user/", payload)


        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_retrieve_budget_list(self):
        """Test GET Method on Budgets"""

        res = self.client.get(BUDGET_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)


