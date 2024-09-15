"""
Testing Models
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from datetime import date

from core import models

class ModelTest(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating a user with an email is successful"""
        email = 'test@example.com'
        password = 'testpass123'
        user = get_user_model().objects.create_user(
            email=email,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test Email is normalized for new users"""
        sample_emails = [
            ['test1@EXAMPLE.com', 'test1@example.com'],
            ['Test2@Example.com', 'Test2@example.com'],
            ['TEST3@EXAMPLE.com', 'TEST3@example.com'],
            ['test4@example.COM', 'test4@example.com']
        ]
        for email, expected in sample_emails:
            user = get_user_model().objects.create_user(email, 'sample123')
            self.assertEqual(user.email, expected)

    def test_new_user_without_email_raises_error(self):
        """Test that creating without an email raises a value error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user('', 'test123')

    def test_create_superuser(self):
        """Test creating a superuser"""
        user = get_user_model().objects.create_superuser(
            'test@example.com', 'test123'
        )
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_create_account(self):
        """Testing Account Creation"""

        user = get_user_model().objects.create_superuser(
            'test@example.com', 'test123'
        )

        account = models.Account.objects.create(
            name="Test Account",
            type="Test Type",
        )

        account.users.set([user])

        self.assertEqual(account.name, "Test Account")
        self.assertTrue(account.users)

    def test_create_client(self):

        account = models.Account.objects.create(
            name="Test Account",
            type="Test Type",
        )
        client = models.Client.objects.create(
            name="Test Client",
            description="The best testing case ever written",
            ein="99-9999999",
            address_one="123 Testing St",
            address_two="Suite 100",
            city="San Francisco",
            state="CA",
            zip_code="1232",
            account=account,
        )

        self.assertEqual(client.name, "Test Client")

    def test_create_contact(self):
        """Test Contact Creation"""

        account = models.Account.objects.create(
            name="Test Account",
            type="Test Type",
        )

        client = models.Client.objects.create(
            name="Test Client",
            description="Test Description",
            industry="Test Industry",
            ein="Testing",
            address_one="Test",
            address_two="Test",
            city="Test City",
            state="Test State",
            zip_code="12322",
            account=account,
        )

        contact = models.Contact.objects.create(
            client=client,
            first_name="Test Name",
            last_name="More Test",
            phone_number="123456789",
            role="Admin",
            poc=False,
            description="Test Description",
        )

        self.assertEqual(contact.first_name, "Test Name")

    def test_create_expense(self):
        """Test Expense Creation"""
        account = models.Account.objects.create(
            name="Test Account",
            type="Test Type",
        )

        client = models.Client.objects.create(
            name="Test Client",
            description="Test Description",
            industry="Test Industry",
            ein="Testing",
            address_one="Test",
            address_two="Test",
            city="Test City",
            state="Test State",
            zip_code="12322",
            account=account,
        )

        project = models.Project.objects.create(
            name="Test Project",
            description="Test Description",
            deadline=date.today(),
            project_type="Test Type",
            budget=1000.29,
            client=client
        )


        self.assertEqual(project.description, "Test Project")

    def test_create_expense(self):
        """Test Expense Creation"""
        account = models.Account.objects.create(
            name="Test Account",
            type="Test Type",
        )

        client = models.Client.objects.create(
            name="Test Client",
            description="Test Description",
            industry="Test Industry",
            ein="Testing",
            address_one="Test",
            address_two="Test",
            city="Test City",
            state="Test State",
            zip_code="12322",
            account=account,
        )

        project = models.Project.objects.create(
            name="Test Project",
            description="Test Description",
            deadline=date.today(),
            project_type="Test Type",
            budget=1000.29,
            client=client
        )

        expense = models.Expense.objects.create(
            description="Test Title",
            project=project,
            status="Test Status",
            category="Advertising",
            amount=2121.22,
            date=date.today(),

        )

        self.assertEqual(expense.description, "Test Title")



