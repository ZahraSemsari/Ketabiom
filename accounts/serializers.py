# accounts/serializers.py
from rest_framework import serializers
from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("رمزها مطابقت ندارند")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')

        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )

        return user


class UserMeSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'profile_image',
            'profile_image_url',
        ]
        read_only_fields = ['id', 'profile_image_url']

    def get_profile_image_url(self, obj):
        request = self.context.get('request')

        if not obj.profile_image:
            return None

        if request:
            return request.build_absolute_uri(obj.profile_image.url)

        return obj.profile_image.url


class ProfileImageUpdateSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'profile_image',
            'profile_image_url',
        ]

    def get_profile_image_url(self, obj):
        request = self.context.get('request')

        if not obj.profile_image:
            return None

        if request:
            return request.build_absolute_uri(obj.profile_image.url)

        return obj.profile_image.url