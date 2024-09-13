# Generated by Django 3.2.25 on 2024-09-13 20:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_alter_user_accounts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='accounts',
            field=models.ManyToManyField(to='core.Account'),
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('industry', models.CharField(max_length=255)),
                ('ein', models.IntegerField()),
                ('address_one', models.CharField(max_length=300)),
                ('address_two', models.CharField(max_length=300)),
                ('city', models.CharField(max_length=300)),
                ('state', models.CharField(max_length=300)),
                ('zip_code', models.CharField(max_length=300)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.account')),
            ],
        ),
    ]