"""
Testing Client API
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from core import models

from rest_framework import status
from rest_framework.test import APIClient

from client.serializers import (
    ClientSerializer,
    ClientDetailSerializer,
)

CLIENT_URL = reverse('client:client-list')


def detail_url(client_id):
    """Return detail url for specific account"""
    return reverse('client:client-detail', args=[client_id])


class PublicClientAPITests(TestCase):
    """Test Unauthorized API Requests"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that auth is required for this API"""
        res = self.client.get(CLIENT_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateClientAPITests(TestCase):
    """Test Authorized API Requests"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            "test@example.com",
            "testpass123"
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_client(self):
        """Testing Retrieving Clients"""
        self.user.accounts.create(
            name="Test Account",
            type="Test Type",
        )

        models.Client.objects.create(
            name="Test Client",
            description="Describing the client",
            industry="test industry",
            ein="9898989",
            address_one="TESTING St",
            address_two="Suite 100",
            city="Testing City",
            state="California",
            zip_code="91919191",
            account=self.user.accounts.first()
        )

        models.Client.objects.create(
            name="Test Client",
            description="Describing the client",
            industry="test industry",
            ein="9898989",
            address_one="TESTING St",
            address_two="Suite 100",
            city="Testing City",
            state="California",
            zip_code="91919191",
            account=self.user.accounts.first()
        )

        queryset = models.Client.objects.all()

        res = self.client.get(CLIENT_URL)

        serializer = ClientSerializer(queryset, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_client_list_limited_to_user(self):
        """Test Retrieving Accounts only returns accounts connected a user"""
        other_user = get_user_model().objects.create_user(
            "othertest@example.com",
            "testpass123"
        )

        self.user.accounts.create(
            name="Current User Account",
            type="-----"
        )

        other_user.accounts.create(
            name="RESTRICTED ACCOUNT",
            type="RESTRICTED",
        )

        models.Client.objects.create(
            name="Test Client",
            description="Describing the client",
            industry="test industry",
            ein="9898989",
            address_one="TESTING St",
            address_two="Suite 100",
            city="Testing City",
            state="California",
            zip_code="91919191",
            account=self.user.accounts.first()
        )

        models.Client.objects.create(
            name="Test Client",
            description="Describing the client",
            industry="test industry",
            ein="9898989",
            address_one="TESTING St",
            address_two="Suite 100",
            city="Testing City",
            state="California",
            zip_code="91919191",
            account=other_user.accounts.first()
        )

        res = self.client.get(CLIENT_URL)

        queryset = models.Client.objects.filter(
            account=self.user.accounts.first().id
        )

        serializer = ClientSerializer(queryset, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_retrieving_client_detail(self):
        """Testing Client Detail Request"""

        self.user.accounts.create(
            name="Current User Account",
            type="-----"
        )

        c1 = models.Client.objects.create(
            name="Test Client",
            description="Describing the client",
            industry="test industry",
            ein="9898989",
            address_one="TESTING St",
            address_two="Suite 100",
            city="Testing City",
            state="California",
            zip_code="91919191",
            account=self.user.accounts.first()
        )

        url = detail_url(c1.id)
        res = self.client.get(url)

        serializer = ClientDetailSerializer(c1)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
