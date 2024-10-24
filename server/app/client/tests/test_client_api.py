"""
Tests for the user api
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from core.models import Account, Client

LOGIN_USER_URL = reverse('user:login')
ME_URL = reverse('user:me')


def create_user(**params):
    """Create and Return a new user"""
    return get_user_model().objects.create_user(**params)

def create_account(**params):
    """Create and Return a new account"""
    return Account.objects.create_account(**params)

def create_client(**params):
    """Create and Return a new client"""
    return Client(**params).save()



class PublicUserApiTests(TestCase):
    """Test Public Features of User API"""

    def setUp(self):
        self.account = create_account(
            name='TEST',
            type='XYZ'
        )
        self.user = create_user(
            email='test@example.com',
            password='testpass123!',
            first_name='Frst',
            last_name='Last',
            account=self.account
        )
        self.client = APIClient()

    def test_retrieve_user_unauthorized(self):
        """Test Auth is required for users"""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_login(self):
        """Test Login Endpoint returns valid tokens"""
        payload = {
            "email": "test@example.com",
            "password": "testpass123!"
        }
        res = self.client.post(LOGIN_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(res.data.get('refresh'))

    def test_invalid_login(self):
        """Testing Invalid Login"""
        payload = {
            "email": "test@ex.com",
            "password": "testpass124!"
        }
        res = self.client.post(LOGIN_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserAPITests(TestCase):
    """Test API requests that require auth"""

    def setUp(self):
        self.account = create_account(
            name='TEST',
            type='XYZ'
        )
        self.user = create_user(
            email='test@example.com',
            password='testpass123!',
            first_name='Frst',
            last_name='Last',
            account=self.account
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_success(self):
        """Test retrieving profile for logged in user"""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'account': self.user.account.id
        })

    def test_post_me_not_allowed(self):
        """Test that POST method is not allowed on ME endpoint"""
        res = self.client.post(ME_URL, {})
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)