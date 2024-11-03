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
    account = AccountSerializer()

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'first_name', 'last_name' , 'account']


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

    def __init__(self, *args, **kwargs):
    # Import UserSerializer lazily to avoid circular import
        from user.serializers import UserSerializer
        self.fields['user'] = UserSerializer(read_only=True)
        super().__init__(*args, **kwargs)

    class Meta:
        model = get_user_model()
        fields = ['user']


class AuthSerializer(TokenObtainPairSerializer):
    """Serializer for JWT Auth Token"""

    def validate(self, attrs):
        """Validate and Authenticate the User"""
        data = super().validate(attrs)
        return data

