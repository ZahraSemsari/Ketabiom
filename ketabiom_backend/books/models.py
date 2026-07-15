from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Author(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Category(models.Model):
    title = models.CharField(max_length=120)

    def __str__(self):
        return self.title

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(
        Author,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='books'
    )
    publisher = models.ForeignKey(
        Publisher,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='books'
    )
    categories = models.ManyToManyField(Category, blank=True, related_name='books')

    cover_url = models.URLField(blank=True, null=True)

    description = models.TextField(blank=True)
    pages_count = models.PositiveIntegerField(default=0)
    published_year = models.PositiveIntegerField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

class ReadingList(models.Model):
    READ = 'read'
    READING = 'reading'
    WANT = 'want'
    CUSTOM = 'custom'

    LIST_TYPE_CHOICES = [
        (READ, 'خوانده شده'),
        (READING, 'در حال خواندن'),
        (WANT, 'خواهم خواند'),
        (CUSTOM, 'شخصی'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reading_lists'
    )
    name = models.CharField(max_length=120)
    list_type = models.CharField(max_length=20, choices=LIST_TYPE_CHOICES, default=CUSTOM)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'name')
        ordering = ['created_at']

    def __str__(self):
        return f'{self.user.username} - {self.name}'


class ReadingListItem(models.Model):
    reading_list = models.ForeignKey(
        ReadingList,
        on_delete=models.CASCADE,
        related_name='items'
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name='list_items'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('reading_list', 'book')
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.book.title} in {self.reading_list.name}'


class Review(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    text = models.TextField()
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'book')
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.username} - {self.book.title}'


class Quote(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='quotes'
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name='quotes'
    )
    text = models.TextField()
    page_number = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Quote by {self.user.username} from {self.book.title}'


class Note(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notes'
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='notes'
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Note by {self.user.username}'