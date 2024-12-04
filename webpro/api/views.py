from django.shortcuts import render
from django.contrib.auth.models import User
from accounts.models import Profile,UserHistory
from django.shortcuts import get_object_or_404
from decimal import Decimal


from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken


from recipes.models import Recipe

from . import serializers
from api.serializers import RecipeSerializer,ProfileHistorySerializer


from .clients  import search_food,get_detail
from .models import DayTrack
# Create your views here.



#ACCOUNTS
class CreateAccount(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    


class GetUserId(APIView):
    permission_Class =  [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = request.user.pk
        return Response({"id":id})
    


class GetUsersData(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class= serializers.UserSerializer
    permission_classes=[IsAdminUser]
    
class GetallTracks(generics.ListAPIView):
    queryset = DayTrack.objects.all()
    serializer_class = serializers.TrackDetailSerializer

class BlacklistTokenView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message":"user logged out"},status=200)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)



#TRACKS
class CreateTrack(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.TrackSetSerializer

    def get_queryset(self):
        return DayTrack.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

class GetTrackId(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request,*args,**kwargs):
        
        track_pk = request.user.profile.track.pk
        return Response({"trackId":track_pk})

class TrackDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.TrackDetailSerializer

    def get_queryset(self):
        return DayTrack.objects.filter(profile=self.request.user.profile)
    

class TrackUpdate(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.TrackUpdate

    def get_queryset(self):
        return DayTrack.objects.filter(user=self.request.user)

class RefreshTrack(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request,*args,**kwargs):
        user = request.user
        track = DayTrack.objects.get(profile=request.user.profile)
        track.calories_today = 0
        track.fats_today = 0
        track.protein_today = 0
        track.carbs_today = 0
        track.save()
        serializer = serializers.TrackDetailSerializer(track)
        data = serializer.data
        return Response({"message":"Refresh done successfully"},status=200)


class SearchAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request,*args,**kwargs):
        ing = request.GET.get('ing') or None
        if not ing:
            return Response('',status=400) 
            
        else:
            results = search_food(ing)
            food_list = []
            added_labels = set()

        for item in results["hints"]:
            label = item["food"]["label"]
            if label in added_labels:
                continue 
            ####check if fluid once exist then provide it in the data###
            data = {
                "foodId": item["food"]["foodId"],
                "label": label,
                "knownAs": item["food"]["knownAs"],
                "calories": item["food"]["nutrients"]["ENERC_KCAL"],
                "proteins": item["food"]["nutrients"]["PROCNT"],
                "fats": item["food"]["nutrients"]["FAT"],
                "carbs": item["food"]["nutrients"]["CHOCDF"],
                "weight": item["measures"][0]["weight"]
            }
            food_list.append(data)
            added_labels.add(label)

            
        return Response(food_list)
        
class AddFood(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request,*args,**kwargs):
        #get the data

        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            profile = Profile.objects.get(user=request.user)            
            data = serializer.validated_data
            #Updating the track
            track = DayTrack.objects.get(profile=profile)
            track.calories_today += data["calories"]*data["quantity"]/data["weight"]
            track.fats_today += data["fats"]*data["quantity"]/data["weight"]
            track.protein_today += data["proteins"]*data["quantity"]/data["weight"]
            track.carbs_today += data["carbs"]*data["quantity"]/data["weight"]
            track.save()
            #updating the history
            
            history = UserHistory.objects.get(profile=profile)
            
            new_log = {
                "calories" : round(float(data["calories"]*data["quantity"]/data["weight"])),
                "quantity": round(float(data["quantity"])),
                "label" : data["label"],
                "date" : data["date"]
            }
                
            

            history.data.append(new_log)
            history.save()

            serializer = serializers.TrackDetailSerializer(track)
            data = serializer.data
            return Response(data,status=200)
        else:
            return Response({"message":"invalid data"},status=400)
        
        
            
        
#profile
class GetProfileId(APIView):
    def get(self,request):
        return Response({"profileId":request.user.profile.pk})
    
class ProfileDetails(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ProfileFavoriteSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

#Favorite Feature
class AddToFavorite(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request,*args,**kwargs):
        profile = request.user.profile
        serializer = RecipeSerializer(data=request.data)
        
        # try:
        if serializer.is_valid():
            data = serializer.validated_data
            date = data.pop('date', None)
            quantity = data.pop('quantity', None)
        else:
            return Response({"message":"invalid data","errors":serializer.errors},status=400)
        recipe, created = Recipe.objects.get_or_create(**data)
        if recipe in profile.favorite_recipes.all():
            return Response({"message":"recipe already in favorites"},status=400)
        
        profile.favorite_recipes.add(recipe)
        return Response({"message":"recipe added"},status=200)
    

class RemoveFromFavorite(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        profile = request.user.profile
        serializer = RecipeSerializer(data=request.data)
        try:
            if serializer.is_valid():
                data = serializer.validated_data
                date = data.pop('date',None)
                quantity = data.pop('quantity',None)

            else:
                return Response({"message":"invalide data"},status=400)
        except Exception as e:
            return Response({"message":"invalid data"},status=400)
        try:
            recipe = Recipe.objects.get(**data)
            profile.favorite_recipes.remove(recipe)
        except:
            return Response(status=500)
        return Response({"message":"recipe removed"},status=200)
    


#HISTORY
class PofileHistoryView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileHistorySerializer
    
    def get_object(self):
        return UserHistory.objects.get(profile=self.request.user.profile)
    

