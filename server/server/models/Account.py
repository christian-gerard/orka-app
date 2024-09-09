from django.db import models


class User(models.Model):
    email = models.EmailField(
        max_length=100,
        unique=True
    )
    
    def __str__(self):
        return self.email