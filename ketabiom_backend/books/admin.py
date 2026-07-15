from django.contrib import admin
from .models import (
    Author,
    Publisher,
    Category,
    Book,
    ReadingList,
    ReadingListItem,
    Review,
    Quote,
    Note,
)


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']


@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']
    search_fields = ['title']


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'author', 'publisher', 'published_year', 'created_at']
    search_fields = ['title', 'author__name', 'publisher__name']
    list_filter = ['publisher', 'categories', 'published_year']


class ReadingListItemInline(admin.TabularInline):
    model = ReadingListItem
    extra = 0


@admin.register(ReadingList)
class ReadingListAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'name', 'list_type', 'created_at']
    search_fields = ['user__username', 'name']
    list_filter = ['list_type']
    inlines = [ReadingListItemInline]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'book', 'rating', 'created_at']
    search_fields = ['user__username', 'book__title', 'text']
    list_filter = ['rating']


@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'book', 'page_number', 'created_at']
    search_fields = ['user__username', 'book__title', 'text']


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'book', 'created_at']
    search_fields = ['user__username', 'book__title', 'text']