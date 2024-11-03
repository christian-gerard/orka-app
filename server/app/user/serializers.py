"""
Serializes all the user api
"""
from django.contrib.auth import get_user_model


from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from account.serializers import AccountSerializer
from django.utils.translation import gettext as _


class UserSerializer(serializers.ModelSerializer):
    """Serializes User Data"""
    account = AccountSerializer()

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'first_name', 'last_name', 'profile_img', 'account']


class UserDetailSerializer(UserSerializer):
    """Serializes Account Detail Data"""


    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields


class ProfileImageSerializer(serializers.ModelSerializer):
    """Serializer for Uploading Images to Clients"""

    class Meta:
        model = get_user_model()
        fields = ['id', 'profile_img']
        extra_kwargs = {'profile_img': {'required': 'True'}}


class RefreshSerializer(TokenRefreshSerializer):
    """Getting Access Token after Refresh"""

    def validate(self, attrs):
        # Call the superclass's validate method to get the refresh and access tokens
        data = super().validate(attrs)

        # Retrieve the user from the token
        refresh = RefreshToken(attrs['refresh'])
        user = get_user_model().objects.get(id=refresh['user_id'])

        # Serialize the user data and add it to the response
        data['user'] = UserSerializer(user).data
        return data


class AuthSerializer(TokenObtainPairSerializer):
    """Serializer for JWT Auth Token"""

    def validate(self, attrs):
        """Validate and Authenticate the User"""
        data = super().validate(attrs)
        return data

