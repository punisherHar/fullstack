# Generated by Django 4.2.6 on 2024-05-06 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_daytrack_fats_goal_alter_daytrack_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='daytrack',
            name='carbs_goal',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True, verbose_name='Carbohydrates goal per day (g)'),
        ),
        migrations.AlterField(
            model_name='daytrack',
            name='protein_goal',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True, verbose_name='Protein goal per day (g)'),
        ),
    ]
