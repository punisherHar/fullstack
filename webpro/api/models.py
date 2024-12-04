from django.db import models
from django.db import models
from django.contrib.auth import get_user_model
from accounts.models import Profile
User = get_user_model()
# Create your models here.

class DayTrack(models.Model):
    # user = models.OneToOneField(User,related_name='track', on_delete=models.CASCADE)
    profile = models.OneToOneField(Profile,related_name='track',on_delete=models.CASCADE,default=1)
    date = models.DateField(auto_now=True)
    calories_goal = models.DecimalField(verbose_name="Energy goal per day (KCAL)", max_digits=6, decimal_places=0,default=1500)
    calories_today = models.DecimalField(verbose_name="kcal", max_digits=5, decimal_places=0,default=0)
    fats_goal = models.DecimalField(verbose_name="Fats goal per day (g)", max_digits=5, decimal_places=1,default=50)
    fats_today = models.DecimalField(verbose_name="Fats(g)", max_digits=5, decimal_places=1,default=0)
    protein_goal = models.DecimalField(verbose_name="Protein goal per day (g)", max_digits=5, decimal_places=1,default=75)
    protein_today = models.DecimalField(verbose_name="Protein(g)", max_digits=5, decimal_places=1,default=0)
    carbs_goal = models.DecimalField(verbose_name="Carbohydrates goal per day (g)", max_digits=5, decimal_places=1,default=188)
    carbs_today = models.DecimalField(verbose_name="CARBS(g)", max_digits=5, decimal_places=1,default=0)

    def __str__(self):
        return self.profile.user.username
