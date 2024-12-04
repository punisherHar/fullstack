from rest_framework import serializers
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User
from accounts.models import Profile,UserHistory
from recipes.models import Recipe
from django.contrib.auth.hashers import make_password
from .models import DayTrack


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('full_name', 'sex', 'age', 'weight', 'height', 'activity_level', 'goal')
        

class RecipeSerializer(serializers.ModelSerializer):
    date = serializers.CharField(write_only=True)
    quantity = serializers.DecimalField(max_digits=5,decimal_places=2,write_only=True)
    class Meta:
        model = Recipe
        fields = ('weight','id', 'label','calories','fats','carbs','proteins','date','quantity')
        read_only_fields = ('id',)

class ProfileFavoriteSerializer(serializers.ModelSerializer):
    favorite_recipes = RecipeSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ('favorite_recipes','full_name')
        read_only_fields = ('favorite_recipes',)

class ProfileHistorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserHistory
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ('username', 'email', 'password','password2','pk','profile')
        extra_kwargs = {
            'password':{'write_only':True},
            'email':{'write_only':True},
        }

    def validate(self,data):
        if data['password'] != data.pop('password2'):
            raise serializers.ValidationError("passwords do not match")
        return data

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')

        validated_data['password'] = make_password(password)
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('sex','weight','height','activity_level','goal')
        extra_kwargs = {
            'sex': {'required': True},
            'weight':{'required':True},
            'height':{'required':True},
            'activity_level': {'required': True},
            'goal': {'required': True},
        }


class TrackSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayTrack
        fields = ('calories_goal','fats_goal','protein_goal','carbs_goal')


class TrackDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayTrack
        fields = ('pk','calories_goal','calories_today','fats_goal','fats_today','protein_goal','protein_today','carbs_goal','carbs_today')


class TrackUpdate(serializers.ModelSerializer):
    class Meta:
        model = DayTrack
        fields = ('calories_goal','fats_goal','protein_goal','carbs_goal')

