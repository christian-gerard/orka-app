from rest_framework import viewsets, mixins
from core.models import Expense
from views import ExpenseDetailSerializer, ExpenseSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    """View for Manage Client APIs"""
    serializer_class = ExpenseDetailSerializer
    queryset = Expense.objects.all()


    def get_queryset(self):
        """Retrieves Accounts for Authenticated User"""
        return self.queryset.all().filter(users=self.request.user).order_by('id')

    def get_serializer_class(self):
        """Return the serializer per request"""
        if self.action == 'list':
            return ExpenseSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        """Override the create method to add the authenticated user"""
        serializer.save(users=self.request.user)