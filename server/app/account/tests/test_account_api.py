"""
Tests Account API
"""

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Account

from account.serializers import (
    AccountSerializer,
    AccountDetailSerializer,
)

import pdb

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

        self.user.accounts.create(
            name="Testing Testing",
            type="NEW TEST TYPE"
        )

        res = self.client.get(ACCOUNT_URL)

        serializer = AccountSerializer(self.user.accounts, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_account_list_limited_to_user(self):
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

        res = self.client.get(ACCOUNT_URL)

        queryset = Account.objects.filter(users=self.user)
        serializer = AccountSerializer(queryset, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_account_detail(self):
        """Test get account detail"""
        account = create_account(self.user)

        url = detail_url(account.id)
        res = self.client.get(url)

        serializer = AccountDetailSerializer(account)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_account(self):
        """Testing Post Method on account api"""

        payload = {
            "name": "Test Account",
            "type": "New Account Testing",
        }

        res = self.client.post(ACCOUNT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        account = Account.objects.get(id=res.data['id'])
        for k, v in payload.items():
            self.assertEqual(getattr(account, k), v)
        self.assertEqual(account.users.first(), self.user)

    def test_patch_account(self):
        """Testing Patch Method on Accounts"""
        account = create_account(self.user)

        payload = {
            "name": "New Name"
        }

        res = self.client.patch(detail_url(account.id), payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["name"], payload["name"])

    def test_delete_account(self):
        """Testing Delete Method on Account"""
        account = create_account(self.user)

        res = self.client.delete(detail_url(account.id))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)



