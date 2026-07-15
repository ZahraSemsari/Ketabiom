from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import IntegrityError, transaction
from rest_framework import serializers

from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    password2 = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    class Meta:
        model = CustomUser
        fields = (
            'username',
            'email',
            'password',
            'password2',
        )

        extra_kwargs = {
            'username': {
                'required': True,
            },
            'email': {
                'required': True,
                'allow_blank': False,
            },
        }

    def validate_username(self, value):
        username = value.strip()

        if CustomUser.objects.filter(
            username__iexact=username
        ).exists():
            raise serializers.ValidationError(
                'این نام کاربری قبلاً ثبت شده است.'
            )

        return username

    def validate_email(self, value):
        email = value.strip().lower()

        if CustomUser.objects.filter(
            email__iexact=email
        ).exists():
            raise serializers.ValidationError(
                'این ایمیل قبلاً ثبت شده است.'
            )

        return email

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError({
                'password2': 'رمز عبور و تکرار آن یکسان نیستند.'
            })

        temporary_user = CustomUser(
            username=attrs.get('username'),
            email=attrs.get('email'),
        )

        try:
            validate_password(
                password,
                user=temporary_user,
            )
        except DjangoValidationError as exc:
            raise serializers.ValidationError({
                'password': list(exc.messages)
            }) from exc

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')

        try:
            with transaction.atomic():
                user = CustomUser.objects.create_user(
                    username=validated_data['username'],
                    email=validated_data['email'],
                    password=validated_data['password'],
                )

        except IntegrityError as exc:
            raise serializers.ValidationError({
                'detail':
                    'نام کاربری یا ایمیل واردشده قبلاً ثبت شده است.'
            }) from exc

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

    def validate_username(self, value):
        username = value.strip()

        users = CustomUser.objects.filter(
            username__iexact=username
        )

        if self.instance:
            users = users.exclude(pk=self.instance.pk)

        if users.exists():
            raise serializers.ValidationError(
                'این نام کاربری قبلاً ثبت شده است.'
            )

        return username

    def validate_email(self, value):
        email = value.strip().lower()

        users = CustomUser.objects.filter(
            email__iexact=email
        )

        if self.instance:
            users = users.exclude(pk=self.instance.pk)

        if users.exists():
            raise serializers.ValidationError(
                'این ایمیل قبلاً ثبت شده است.'
            )

        return email

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