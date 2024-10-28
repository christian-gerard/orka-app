"""
Database Models
"""

from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)

from datetime import date

task_status = {
    ('planning', 'Planning'),
    ('not started', 'Not Started'),
    ('doing', 'Doing'),
    ('blocked', 'Blocked'),
    ('done', 'Done'),
}

expense_status = {
    ('planned', 'Planned'),
    ('pending', 'Pending'),
    ('complete', 'Complete'),
}

states = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
}
class UserManager(BaseUserManager):
    """Manager for Users"""

    def create_user(self, email, password=None, **extra_fields):
        """Create Save Return a New User"""
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Create SuperUser"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class AccountManager(models.Manager):
    """Manager for Accounts"""

    def create_account(self, name, type, **extra_fields):
        """Create, Save and Return a New Account"""
        account = self.model(name=name, type=type, **extra_fields)
        account.save(using=self._db)

        return account


class ClientManager(models.Manager):
    """Client Manager"""

    def create_client(
            self,
            name,
            description,
            client_type,
            ein,
            address_one,
            address_two,
            city,
            state,
            zip_code,
            account,
            **args):
        client = self.model(
            name=name,
            description=description,
            client_type=client_type,
            ein=ein,
            address_one=address_one,
            address_two=address_two,
            city=city,
            state=state,
            zip_code=zip_code,
            account=account,
            **args
        )
        client.save(using=self._db)

        return client


class ProjectManager(models.Manager):
    def create_project(self, client, **params):
        defaults = {
            "name":"Test Project",
            "description":"Client Description...",
            "deadline": "2024-10-10",
            "project_type": "TEST TYPE",
            "client": client
        }
        defaults.update(params)

        project = Project.objects.create(**defaults)

        return project


class BudgetManager(models.Manager):
    """Budget Manager"""

    def create_budget(self, project, **params):
        defaults = {
            "description":"Budget Description...",
            "category": "Budget Category",
            "amount": 100000.00,
            "project": project
        }
        defaults.update(params)

        budget = Budget.objects.create(**defaults)

        return budget

class ContactManager(models.Manager):
    """Contact Model Manager"""
    def create_contact(self, client, **params):
        defaults = {
            "first_name":"Test",
            "last_name":"Testington",
            "phone_number":"000-000-0000",
            "role":"Project Manager",
            "description":"Client Description...",
            "client": client
        }
        defaults.update(params)

        contact = Contact.objects.create(**defaults)

        return contact


class Account(models.Model):
    """Account Objects"""

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    objects = AccountManager()

    def __str__(self):
        return self.name


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system"""

    email = models.EmailField(max_length=250, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    account = models.ForeignKey(
        Account,
        related_name='users',
        on_delete=models.CASCADE,
        default=1
    )

    objects = UserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Client(models.Model):
    """Client Model"""

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    client_type = models.CharField(max_length=255, blank=True, null=True)
    ein = models.CharField(max_length=10)
    address_one = models.CharField(max_length=300)
    address_two = models.CharField(max_length=300, blank=True, null=True)
    city = models.CharField(max_length=300)
    state = models.CharField(max_length=300, choices=[(abbr, name) for abbr, name in states.items()])
    zip_code = models.CharField(max_length=300)
    country = models.CharField(max_length=300, default="USA")

    account = models.ForeignKey(
        Account,
        related_name='clients',
        on_delete=models.CASCADE
    )

    objects=ClientManager()

    def __str__(self):
        return self.name


class Project(models.Model):
    """Project Model"""

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    deadline = models.DateField()
    project_type = models.CharField(max_length=255)
    project_budget = models.DecimalField(max_digits=10, decimal_places=2)
    users = models.ManyToManyField(User, related_name='projects')
    client = models.ForeignKey(
        Client,
        related_name='projects',
        on_delete=models.CASCADE
    )

    objects = ProjectManager()

    def __str__(self):
        return self.name


class Contact(models.Model):
    """Contact Model"""
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    client = models.ForeignKey(
        Client,
        related_name='contacts',
        on_delete=models.CASCADE
    )

    objects = ContactManager()

    def __str__(self):
        return self.first_name


class Budget(models.Model):
    """Budget Model"""
    budget_name = models.CharField(max_length=255)
    category = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    project = models.ForeignKey(
        Project,
        related_name='budgets',
        on_delete=models.CASCADE
    )

    objects = BudgetManager()

    def __str__(self):
        return self.first_name


class Expense(models.Model):
    """Expense Model"""
    date = models.DateField(default=date.today)
    expense_description = models.CharField(max_length=255)
    amount = models.DecimalField(
        decimal_places=2,
        max_digits=10
    )
    category = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=300, choices=expense_status, default='planned')

    project = models.ForeignKey(
        Project,
        related_name='expenses',
        on_delete=models.CASCADE,
    )
    budget = models.ForeignKey(
        Budget,
        null=True,
        blank=True,
        related_name='expenses',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.description


class Task(models.Model):
    """Task Model"""
    task_name = models.CharField(max_length=255)
    deadline = models.DateField(default=date.today)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=255, choices=task_status, default='not started')
    project = models.ForeignKey(
        Project,
        related_name='tasks',
        on_delete=models.CASCADE,
    )
    users = models.ForeignKey(
        User,
        related_name='tasks',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.description
