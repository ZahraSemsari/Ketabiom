from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        unique=True,
    )

    profile_image = models.ImageField(
        upload_to='profile_images/',
        null=True,
        blank=True,
    )

    def save(self, *args, **kwargs):
        if self.email:
            self.email = self.email.strip().lower()

        super().save(*args, **kwargs)

    def __str__(self):
        return self.username