"""
Tests for the user api
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from core.models import AccountManager

import pdb

LOGIN_USER_URL = reverse('user:login')
LOGOUT_USER_URL = reverse('user:logout')
ME_URL = reverse('user:me')


def create_user(**params):
    """Create and Return a new user"""
    return get_user_model().objects.create_user(**params)


class PublicUserApiTests(TestCase):
    """Test Public Features of User API"""

    def setUp(self):
        self.client = APIClient()


    def test_retrieve_user_unauthorized(self):
        """Test Auth is required for users"""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


class PrivateUserAPITests(TestCase):
    """Test API requests that require auth"""

    def setUp(self):
        self.account = AccountManager.create_account(
            name="Test Account",
            type="Test Type"
        )
        self.user = create_user(
            email='test@example.com',
            password='testpass123',
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
            'first_name': self.user.first_name,
            'email': self.user.email,
            'last_name': 'Last'
        })

    def test_post_me_not_allowed(self):
        """Test that POST method is not allowed on ME endpoint"""
        res = self.client.post(ME_URL, {})
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_profile(self):
        """Test updating the user profile for the authenticated user"""
        payload = {'first_name': 'Updated Name', 'password': 'updatedpass123'}

        res = self.client.patch(ME_URL, payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, payload['first_name'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
