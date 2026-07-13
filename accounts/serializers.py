# accounts/serializers.py
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
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

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )
    new_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )
    new_password2 = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    def validate_old_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            raise serializers.ValidationError(
                'رمز عبور فعلی نادرست است.'
            )

        return value

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({
                'new_password2':
                    'رمز عبور جدید و تکرار آن یکسان نیستند.'
            })

        user = self.context['request'].user

        try:
            validate_password(
                attrs['new_password'],
                user=user
            )
        except DjangoValidationError as exc:
            raise serializers.ValidationError({
                'new_password': list(exc.messages)
            }) from exc

        return attrs

    def save(self, **kwargs):
        user = self.context['request'].user

        user.set_password(
            self.validated_data['new_password']
        )
        user.save(update_fields=['password'])

        return user
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