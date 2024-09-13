"""
Tests Account API
"""
from decimal import Decimal

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Account

from account.serializers import AccountSerializer

ACCOUNT_URL = reverse("account:account-list")

def create_account(**params):
    """Create and Return sample account"""
    defaults = {
        "name": "Test Account",
        "type": "Test Type",
    }

    defaults.update(params)

    account = Account.objects.create(**defaults)
    return account

class PublicAccountAPITests(TestCase):
    """Test Unauthenticated API Requests"""

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test Auth is required to call API"""

        res = self.client.get(ACCOUNT_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateAccountAPITests(TestCase):
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
        a1 = create_account()

        a1.save()

        self.user.accounts.add(a1)

        res = self.client.get(ACCOUNT_URL)

        serializer = AccountSerializer(self.user.accounts, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_account_list_limited_to_user(self):
        """Test Retrieving Accounts only returns accounts connected a user"""

