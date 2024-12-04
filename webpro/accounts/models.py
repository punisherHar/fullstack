from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from recipes.models import Recipe

User = get_user_model()
# Create your models here.

# gender choices
GENDER_CHOICE = [
    ('M','Male'),
    ('F','Female')
]

ACTIVITY_CHOICE = [
    ('S','sedentary'),
    ('LA','lightly active'),
    ('MA','moderately active'),
    ('VA','very active'),
    ('EA','extra active'),
]

GOALS_CHOICE = [
    ('M','maintain weight'),
    ('GS','gain weight slowly'),
    ('GF','gain weight fast'),
    ('LS','lose weight slowly'),
    ('LF','lose weight fast'),
]

class Profile(models.Model):
    user = models.OneToOneField(User, related_name ='profile' , on_delete=models.CASCADE)
    favorite_recipes = models.ManyToManyField(Recipe,null=True,related_name='favorited_by',blank=True)
    full_name = models.CharField(max_length=50,null=True,blank=True)
    sex = models.CharField(max_length=20,choices=GENDER_CHOICE)
    age = models.PositiveIntegerField(null=True)
    weight = models.DecimalField(max_digits=5,decimal_places=2,validators=[MinValueValidator(0)],null=True,blank=True)
    height = models.DecimalField(max_digits=5,decimal_places=2,validators=[MinValueValidator(0)],null=True,blank=True)
    activity_level = models.CharField(max_length=20,choices=ACTIVITY_CHOICE)
    goal = models.CharField(max_length=40,choices=GOALS_CHOICE)

    def __str__(self):
        if not self.full_name:
            return "ERROR PROFILE NAME IS NULL"
        return self.full_name
    
# Create your models here.

class UserHistory(models.Model):
    profile = models.ForeignKey(Profile,related_name='history',on_delete=models.CASCADE)
    data = models.JSONField(default=list, blank=True)


    def __str__(self):
        return self.profile.full_name