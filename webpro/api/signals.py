from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import User
from accounts.models import Profile,UserHistory
from api.models import DayTrack




# @receiver(post_save,sender=User)
# def create_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
#     else:
#         instance.profile.save()


@receiver(post_save,sender=Profile)
def create_track(sender,instance,created,**kwargs):
    calories_goal = 0
    carbs_goal = 0
    protein_goal = 0
    fats_goal = 0

    weight = float(instance.weight)
    height = float(instance.height)
    age = float(instance.age)
    sex = instance.sex
    if  sex == "M" :
        BMR = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        BMR = 10*weight+6.25*height-5*age-161
    if instance.activity_level=="S":
        calories_goal = BMR*1.2
    elif instance.activity_level=="LA":
        calories_goal = BMR*1.375
    elif instance.activity_level=="MA":     
        calories_goal = BMR*1.55
    elif instance.activity_level=="VA":
        calories_goal = BMR*1.725
    else:
        calories_goal = BMR*1.9
    if  instance.goal == "M":
        calories_goal = calories_goal
    elif instance.goal == "GS":
        calories_goal += 400
    elif instance.goal == "GF":
        calories_goal += 700
    elif instance.goal == "LS":
        calories_goal -= 500
    else:
        calories_goal -=1000

    carbs_goal = calories_goal * 0.50 / 4
    fats_goal = calories_goal * 0.30 / 9
    protein_goal = calories_goal * 0.20 / 4
    if created :
        if calories_goal < 1500:
            DayTrack.objects.create(profile=instance)
        else:
            DayTrack.objects.create(profile=instance,
                                calories_goal=calories_goal,
                                fats_goal=fats_goal,
                                protein_goal=protein_goal,
                                carbs_goal=carbs_goal)
    else:
        if calories_goal < 1500:
            instance.track.calories_goal = 1500
            instance.track.fats_goal = 50
            instance.track.carbs_goal = 188
            instance.track.protein_goal = 75
            instance.track.save()
        else:
            instance.track.calories_goal = calories_goal
            instance.track.fats_goal = fats_goal
            instance.track.carbs_goal = carbs_goal
            instance.track.protein_goal = protein_goal
            instance.track.save()
    UserHistory.objects.create(profile=instance)