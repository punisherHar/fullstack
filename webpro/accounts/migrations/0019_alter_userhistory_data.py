# Generated by Django 4.2.6 on 2024-11-20 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0018_alter_userhistory_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userhistory',
            name='data',
            field=models.JSONField(blank=True, default=list),
        ),
    ]