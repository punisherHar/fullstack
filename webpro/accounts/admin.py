from django.contrib import admin
from .models import Profile,UserHistory
# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user','full_name') 

admin.site.register(Profile, ProfileAdmin)
admin.site.register(UserHistory)