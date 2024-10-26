"""
Serializes all the user api
"""
from django.contrib.auth import get_user_model


from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from account.serializers import AccountSerializer
from django.utils.translation import gettext as _


class UserSerializer(serializers.ModelSerializer):
    """Serializes User Data"""

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'first_name', 'last_name']



class UserDetailSerializer(UserSerializer):
    """Serializes Account Detail Data"""
    account = AccountSerializer()

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['account']



    # SAVING FOR POST MVP

    # def create(self, validated_data):
    #     """Create and Return user with encrypted password"""

    #     return get_user_model().objects.create_user(**validated_data)

    # def update(self, instance, validated_data):
    #     """Update and Return User"""
    #     password = validated_data.pop('password', None)
    #     user = super().update(instance, validated_data)

    #     if password:
    #         user.set_password(password)
    #         user.save()

    #     return user

class RefreshSerializer(TokenRefreshSerializer):
    """Getting Access Token after Refresh"""


class AuthSerializer(TokenObtainPairSerializer):
    """Serializer for JWT Auth Token"""

    def validate(self, attrs):
        """Validate and Authenticate the User"""
        data = super().validate(attrs)
        return data

