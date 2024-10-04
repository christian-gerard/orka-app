"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Contact


class ContactSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Contact
        fields = ['first_name', 'last_name', 'phone_number', 'role', 'poc', 'description', 'client']
        read_only_fields = ["id"]


class ContactDetailSerializer(ContactSerializer):
    """Serializes Account Detail Data"""

    class Meta(ContactSerializer.Meta):
        fields = ContactSerializer.Meta.fields
