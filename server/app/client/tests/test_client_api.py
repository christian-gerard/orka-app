"""
Tests Client API
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Account, Client
from client.serializers import ClientSerializer, ClientDetailSerializer
import pdb

CLIENT_URL = reverse("client:client-list")

def detail_url(client_id):
    """Return detail url for specific account"""
    return reverse('client:client-detail', args=[client_id])

def create_account(**params):
    """Create and Return a new account"""
    return Account.objects.create_account(**params)

def create_client(**params):
    """Create and Return a new client"""
    return Client.objects.create_client(**params)


class PublicClientAPITests(TestCase):
    """Test Unauthenticated API Requests"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test Auth is required to call API"""

        res = self.client.get(CLIENT_URL)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


class PrivateClientAPITests(TestCase):
    """Test Authorized Requests to Client API"""

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

    def test_get_client_list(self):
        """Testing Client List GET Method"""
        res = self.client.get(CLIENT_URL)
        queryset = Client.objects.filter(account=self.account)
        serializer = ClientSerializer(queryset, many=True)

        # Response is Healthy
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        # Returns ONLY User Account Clients
        self.assertEqual(res.data, serializer.data)

    def test_get_client_detail(self):
        """Testing Client List GET Method"""
        res = self.client.get(detail_url(self.client_1.id))
        invalid_res = self.client.get(detail_url(self.client_other.id))
        serializer = ClientDetailSerializer(self.client_1)

        # Check if response healthy
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        # Check that user is unable to access other account clients
        self.assertEqual(invalid_res.status_code, status.HTTP_404_NOT_FOUND)
        # Check if response data is valid
        self.assertEqual(res.data, serializer.data)


    def test_create_client(self):
        """Test Client POST Method"""
        payload = {
            "name": "TEST CLIENT",
            "description": "TEST DESCRIPTION",
            "client_type": "TEST TYPE",
            "ein":"99-9999999",
            "address_one": "TEST STREET",
            "address_two": "TEST SUITE",
            "city": "TEST CITY",
            "state": "TEST STATE",
            "zip_code": "99999",
            "country": "USA",
            "account": self.account.id
        }
        res = self.client.post(CLIENT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_delete_client(self):
        """Test Client DELETE Method"""
        client_del = create_client(
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
        res = self.client.delete(detail_url(client_del.id))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_patch_client(self):
        """Test Client DELETE Method"""
        payload = {
            "name": "PATCH",
            "city": "PATCH"
        }

        res = self.client.patch(detail_url(self.client_1.id), payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["name"], "PATCH")
