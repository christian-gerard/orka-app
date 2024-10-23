# Generated by Django 3.2.25 on 2024-10-23 00:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_user_account'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='account',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='core.account'),
        ),
    ]
