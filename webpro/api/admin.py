from django.contrib import admin
from .models import DayTrack
# Register your models here.

@admin.register(DayTrack)
class DayTrackAdmin(admin.ModelAdmin):
    list_display = ['profile','pk'] 