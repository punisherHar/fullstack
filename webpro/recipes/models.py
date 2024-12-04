from django.db import models

# Create your models here.

class Recipe(models.Model):
    
    label = models.CharField(max_length=80)
    calories = models.DecimalField(max_digits=6, decimal_places=0,default=0)
    fats = models.DecimalField( max_digits=5, decimal_places=1,default=0)
    proteins = models.DecimalField( max_digits=5, decimal_places=1,default=0)
    carbs = models.DecimalField(max_digits=5, decimal_places=1,default=0)
    weight = models.DecimalField(max_digits=5, decimal_places=1)


    def __str__(self):
        return self.label
