"""
Views for the user api
"""

from rest_framework import generics, authentication, permissions, status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework.views import APIView
from user.serializers import (
    RefreshSerializer,
    AuthSerializer,
)


class ManageUserView(TokenRefreshView):
    """Manage the authenticated user"""
    serializer_class = RefreshSerializer

    def get_object(self):
        """Retrieve and Return Auth User"""
        return self.request.user

class LoginView(TokenObtainPairView):
    """Login the user"""
    serializer_class = AuthSerializer




