# Generated by Django 4.2.6 on 2024-05-06 15:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_profile_activity_level_alter_profile_gender_and_more'),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='daytrack',
            name='user',
        ),
        migrations.AddField(
            model_name='daytrack',
            name='profile',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='track', to='accounts.profile'),
        ),
    ]