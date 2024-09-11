"""
Serializes all the user api
"""
from django.contrib.auth import (
    get_user_model,
    authenticate,
)

from rest_framework import serializers
from django.utils.translation import gettext as _



class UserSerializer(serializers.ModelSerializer):
    """Serializes User Data"""

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create and Return user with encrypted password"""

        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update and Return User"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user auth token"""
    email = serializers.EmailField()
    password = serializers.CharField(
        style = {'input_type': 'password'},
        trim_whitespace = False,
    )

    def validate(self, attrs):
        """Validate and Authenticate the User"""
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password,
        )
        if not user:
            msg = _('Unable to Authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


