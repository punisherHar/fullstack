from django.urls import path,include
from . import views

app_name = 'accounts'

urlpatterns = [
    path('sinup/',views.signup,name="signup"),
    path('login/',views.login_view,name="login"),
    path('logout/',views.logout_view,name='logout')
]
