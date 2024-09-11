"""
Tests for the user api
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status


CREATE_USER_URL = reverse('user:create')


def create_user(**params):
    """Create and Return a new user"""
    return get_user_model().objects.create_user(**params)


class PublicUserApiTests(TestCase):
    """Test Public Features of User API"""

    def setUp(self):
        self.client = APIClient()

    def test_user_success(self):
        """Test creating a user is successful"""
        payload = {
            'email': 'test@example.com',
            'password': 'testpass123',
            'first_name': 'Test Name'
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=payload['email'])
        self.assertTrue(user.check_password(payload['payload']))
        self.assertNotIn('password', res.data)

    def test_user_with_email_exists_error(self):
        """Test Error returned if user with email exists"""
        payload = {
            'email': 'test123@example.com',
            'password': 'testpass123',
            'first_name': 'Test Name'
        }
        create_user(**payload)
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short_error(self):
        """Test an error is returned if password is less than 5 characters """
        payload = {
            'email': 'test123@example.com',
            'password': 'pw',
            'first_name': 'Test Name'
        }

        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exists)
