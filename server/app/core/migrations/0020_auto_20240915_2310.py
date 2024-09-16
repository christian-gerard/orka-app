# Generated by Django 3.2.25 on 2024-09-15 23:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0019_contact_client'),
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date.today)),
                ('description', models.CharField(max_length=255)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=200)),
                ('category', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='budget',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=200),
            preserve_default=False,
        ),
    ]