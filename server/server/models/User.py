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

    user_type = models.IntegerField(

    )

    password = models.CharField(
        max_length = 100,
        default = "password12!"
    )
    
    def __str__(self):
        return self.email