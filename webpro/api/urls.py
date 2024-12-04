from django.urls import path
from api import views


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,)

app_name = 'api'

urlpatterns = [
    path('accounts/create/',views.CreateAccount.as_view()),
    path('accounts/id/',views.GetUserId.as_view()),
    path('accounts/users/',views.GetUsersData.as_view()),
    path('accounts/profile/id/',views.GetProfileId.as_view()),
    path('accounts/profile/details/<int:pk>/',views.ProfileDetails.as_view()),
    path('accounts/profile/history/',views.PofileHistoryView.as_view()),
    path('tracks/getall/',views.GetallTracks.as_view()),
    path('tracks/set-track/',views.CreateTrack.as_view()),
    path('tracks/id/',views.GetTrackId.as_view()),
    path('tracks/update/<int:pk>/',views.TrackUpdate.as_view()),
    path('tracks/details/<int:pk>/',views.TrackDetail.as_view()),
    path('tracks/search/',views.SearchAPIView.as_view(),),
    path('tracks/add-food/',views.AddFood.as_view()),
    path('tracks/refresh/',views.RefreshTrack.as_view()),
    path('recipes/add/',views.AddToFavorite.as_view()),
    path('recipes/remove/',views.RemoveFromFavorite.as_view()),
    path('accounts/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('accounts/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('accounts/logout/blacklist/',views.BlacklistTokenView.as_view(),name='blacklist'),
    

]
