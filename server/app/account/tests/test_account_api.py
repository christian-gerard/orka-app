"""
Tests Account API
"""
from decimal import Decimal

from django.test import TestCase
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Account

from account.serializers import AccountSerializer


class TestAccountAPI(TestCase):
    """
    Test Account API Endpoints
    """

    def setUp(self):
        pass
