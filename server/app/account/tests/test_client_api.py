"""
Tests Account API
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Account, Client

from account.serializers import (
    AccountSerializer,
    AccountDetailSerializer,
    ClientSerializer,
    ClientDetailSerializer,
)


ACCOUNT_URL = reverse("account:account-list")

CLIENT_URL = reverse("account:account-list") + "clients/"


def detail_url(account_id):
    """Return detail url for specific account"""
    return reverse('account:account-detail', args=[account_id])


def create_account(user, **params):
    """Create and Return sample account"""
    defaults = {
        "name": "Test Account",
        "type": "Test Type",
    }

    defaults.update(params)

    account = Account.objects.create(**defaults)
    account.users.set([user])
    return account


class PublicClientAPITests(TestCase):
    """Test Unauthenticated API Requests"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test Auth is required to call API"""

        res = self.client.get(CLIENT_URL)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


class PrivateClientAPITests(TestCase):
    """Test Authorized Requests to Account API"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            "test@example.com",
            "testpass123"
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_account(self):
        """Test Retrieving a list of accounts"""

        self.user.accounts.create(
            name="Testing Testing",
            type="NEW TEST TYPE"
        )

        res = self.client.get(ACCOUNT_URL)

        serializer = AccountSerializer(self.user.accounts, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)


