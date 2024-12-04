from django.shortcuts import render,redirect
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password,check_password
from django.urls import reverse_lazy
from .models import User,Profile
from django.contrib.auth.forms import UserCreationForm 
from . import forms
from api.models import DayTrack
from django.contrib.auth import login, authenticate,logout
from django.contrib.auth.decorators import login_required

from django.views.generic import CreateView,View
# Create your views here.

def home(request):
    return render(request,'accounts/home.html')


def signup(request):
    if request.method == 'POST':
        form = forms.UserCreationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.clean_password2()
            form.save()
            user = authenticate(request,username=username,password=password)
            if user is not None:
                login(request,user)
                return redirect('tracks:set-track')
    else:
        form = forms.UserCreationForm()
    return render(request,'accounts/signup.html',{'form':form})

def login_view(request):
    if request.method == 'POST':
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username,password=password)
            if user is not None:
                login(request, user)
                track = DayTrack.objects.get(user=user) or None
                print(track.user.username)
                if track is not None:
                    return redirect('tracks:home')
                else:
                    return redirect('tracks:set-track')
            else:
                raise ValidationError('this user does not exist')
    else:
        form = forms.LoginForm()
        return render(request,'accounts/login.html',{'form':form})

@login_required
def logout_view(request):
    logout(request)
    return redirect("accounts:login")         
