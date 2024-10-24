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
    description = models.TextField()
    client_type = models.CharField(max_length=255)
    ein = models.CharField(max_length=10)
    address_one = models.CharField(max_length=300)
    address_two = models.CharField(max_length=300, default=None)
    city = models.CharField(max_length=300)
    state = models.CharField(max_length=300)
    zip_code = models.CharField(max_length=300)
    country = models.CharField(max_length=300, default="USA")

    account = models.ForeignKey(
        Account,
        related_name='clients',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Project(models.Model):
    """Project Model"""

    name = models.CharField(max_length=255)
    description = models.TextField()
    deadline = models.DateField()
    project_type = models.CharField(max_length=255)

    users = models.ManyToManyField(User, related_name='projects')
    client = models.ForeignKey(
        Client,
        related_name='projects',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Contact(models.Model):
    """Contact Model"""
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    description = models.TextField()

    client = models.ForeignKey(
        Client,
        related_name='contacts',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.first_name


class Budget(models.Model):
    """Budget Model"""
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    amount = models.CharField(max_length=255)

    project = models.ForeignKey(
        Project,
        related_name='budgets',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.first_name


class Expense(models.Model):
    """Expense Model"""
    date = models.DateField(default=date.today)
    description = models.CharField(max_length=255)
    amount = models.DecimalField(
        decimal_places=2,
        max_digits=200
    )
    category = models.CharField(max_length=255)
    status = models.CharField(max_length=300)

    project = models.ForeignKey(
        Project,
        null=True,
        blank=True,
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
    deadline = models.DateField(default=date.today)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
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
