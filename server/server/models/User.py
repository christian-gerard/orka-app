from django.db import models

class User(models.Model):

    email = models.EmailField(
        max_length=100,
        unique=True
    )

    first_name = models.CharField(
        max_length=100
    )

    last_name = models.CharField(
        max_length= 100
    )

    
    def __str__(self):
        return self.email