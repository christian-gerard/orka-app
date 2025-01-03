# Generated by Django 3.2.25 on 2024-11-03 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='status',
            field=models.CharField(choices=[('complete', 'Complete'), ('pending', 'Pending'), ('planned', 'Planned')], default='planned', max_length=300),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('planning', 'Planning'), ('not started', 'Not Started'), ('doing', 'Doing'), ('done', 'Done'), ('blocked', 'Blocked')], default='not started', max_length=255),
        ),
    ]
