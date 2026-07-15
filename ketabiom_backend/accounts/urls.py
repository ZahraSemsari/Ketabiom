# accounts/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    MyTokenObtainPairView,
    MeAPIView,
    ChangePasswordAPIView,
    ProfileImageUpdateAPIView,
)


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeAPIView.as_view(), name='me'),
    path('me/profile-image/', ProfileImageUpdateAPIView.as_view(), name='profile-image-update'),
    path('me/change-password/',ChangePasswordAPIView.as_view(),name='change-password'),
]