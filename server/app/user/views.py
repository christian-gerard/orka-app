"""
Views for the user api
"""

from rest_framework import generics, authentication, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from user.serializers import (
    UserSerializer,
    AuthSerializer,
)
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import logout

class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer


class CreateSessionView(ObtainAuthToken):
    """Create a new session for users"""
    serializer_class = AuthSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Retrieve and Return Auth User"""
        return self.request.user


@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    """Log out the authenticated user"""
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]


    def post(self, request):
        """Log out the user by clearing the session"""
        logout(request)
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
