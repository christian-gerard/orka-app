# Generated by Django 3.2.25 on 2024-09-13 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_auto_20240913_2242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='accounts',
            field=models.ManyToManyField(related_name='users', to='core.Account'),
        ),
    ]
