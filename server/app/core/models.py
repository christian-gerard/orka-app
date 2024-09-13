"""
Database Models
"""

from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.conf import settings


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


class Account(models.Model):
    """Account Objects"""

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system"""

    email = models.EmailField(max_length=250, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, default="Last")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    accounts = models.ManyToManyField(Account)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Client(models.Model):
    """Client Model"""

    name = models.CharField(max_length=255)
    description = models.TextField()
    industry = models.CharField(max_length=255)
    ein = models.CharField(max_length=10)
    address_one = models.CharField(max_length=300)
    address_two = models.CharField(max_length=300, default=None)
    city = models.CharField(max_length=300)
    state = models.CharField(max_length=300)
    zip_code = models.CharField(max_length=300)

    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
