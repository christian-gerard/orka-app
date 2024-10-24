"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Client, Contact

class ContactSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Contact
        fields = ['first_name', 'last_name', 'phone_number', 'role', 'description', 'client']
        read_only_fields = ["id"]


class ContactDetailSerializer(serializers.ModelSerializer):
    """Serializes Account Detail Data"""

    class Meta(ContactSerializer.Meta):
        fields = ContactSerializer.Meta.fields


class ClientSerializer(serializers.ModelSerializer):
    """Serializes Client Data"""

    class Meta:
        model = Client
        fields = ['id', 'name', 'client_type']
        read_only_fields = ["id"]

class ClientDetailSerializer(serializers.ModelSerializer):
    """Serializes Client Data"""
    contacts = ContactSerializer(many=True, read_only=True)

    class Meta(ClientSerializer.Meta):
        fields = ClientSerializer.Meta.fields + ["description", "address_one", "address_two", "city", "zip_code", "country", "ein", "account", "contacts"]


