# accounts/views.py
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CustomUser
from rest_framework import generics, status, serializers

from .serializers import (
    RegisterSerializer,
    UserMeSerializer,
    ChangePasswordSerializer,
    ProfileImageUpdateSerializer,
)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    login = serializers.CharField(
        required=False,
        write_only=True,
    )

    email = serializers.EmailField(
        required=False,
        write_only=True,
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields[self.username_field].required = False

    def validate(self, attrs):
        identifier = (
            attrs.pop('login', None)
            or attrs.get(self.username_field)
            or attrs.pop('email', None)
        )

        if not identifier:
            raise serializers.ValidationError({
                'login':
                    'نام کاربری یا ایمیل را وارد کنید.'
            })

        identifier = identifier.strip()

        user = CustomUser.objects.filter(
            username__iexact=identifier
        ).first()

        if user is None:
            user = CustomUser.objects.filter(
                email__iexact=identifier
            ).first()

        if user is not None:
            attrs[self.username_field] = user.get_username()
        else:
            attrs[self.username_field] = identifier

        return super().validate(attrs)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserMeSerializer(
            request.user,
            context={'request': request}
        )
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserMeSerializer(
            request.user,
            data=request.data,
            partial=True,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                'message':
                    'رمز عبور با موفقیت تغییر کرد.'
            },
            status=status.HTTP_200_OK
        )

    def post(self, request):
        return self.patch(request)
class ProfileImageUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = ProfileImageUpdateSerializer(
            request.user,
            data=request.data,
            partial=True,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                'message': 'عکس پروفایل با موفقیت ذخیره شد.',
                'user': serializer.data,
            },
            status=status.HTTP_200_OK
        )