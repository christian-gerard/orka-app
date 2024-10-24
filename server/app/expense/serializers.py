"""
Serializers for the Account API
"""
from rest_framework import serializers

from core.models import Expense


class ExpenseSerializer(serializers.ModelSerializer):
    """Serializes Account Data"""

    class Meta:
        model = Expense
        fields = ['id', 'date', 'description', 'amount', 'category', 'status', 'project']
        read_only_fields = ["id"]


class ExpenseDetailSerializer(ExpenseSerializer):
    """Serializes Account Detail Data"""

    class Meta(ExpenseSerializer.Meta):
        fields = ExpenseSerializer.Meta.fields
