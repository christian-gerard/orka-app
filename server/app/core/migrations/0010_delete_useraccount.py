# Generated by Django 3.2.25 on 2024-09-13 00:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_useraccount'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserAccount',
        ),
    ]