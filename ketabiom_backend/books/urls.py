from django.urls import path
from .views import (
    HomeAPIView,
    BookListAPIView,
    BookDetailAPIView,
    SearchAPIView,
    ProfileAPIView,
    ReadingListListCreateAPIView,
    ReadingListDetailAPIView,
    AddBookToListAPIView,
    RemoveBookFromListAPIView,
    BookReviewListCreateAPIView,
    BookQuoteListCreateAPIView,
    BookNoteListCreateAPIView,
    QuoteDeleteAPIView,
    NoteDeleteAPIView,
)

urlpatterns = [
    path('home/', HomeAPIView.as_view(), name='home'),

    path('books/', BookListAPIView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetailAPIView.as_view(), name='book-detail'),
    path('books/<int:pk>/add-to-list/', AddBookToListAPIView.as_view(), name='book-add-to-list'),
    path('books/<int:pk>/remove-from-list/', RemoveBookFromListAPIView.as_view(), name='book-remove-from-list'),

    path('books/<int:pk>/reviews/', BookReviewListCreateAPIView.as_view(), name='book-reviews'),
    path('books/<int:pk>/quotes/', BookQuoteListCreateAPIView.as_view(), name='book-quotes'),
    path('books/<int:pk>/notes/', BookNoteListCreateAPIView.as_view(), name='book-notes'),

    path('search/', SearchAPIView.as_view(), name='search'),

    path('profile/', ProfileAPIView.as_view(), name='profile'),

    path('reading-lists/', ReadingListListCreateAPIView.as_view(), name='reading-list-list-create'),
    path('reading-lists/<int:pk>/', ReadingListDetailAPIView.as_view(), name='reading-list-detail'),
    path('quotes/<int:pk>/',QuoteDeleteAPIView.as_view(),name='quote-delete'),
    path('notes/<int:pk>/',NoteDeleteAPIView.as_view(),name='note-delete'),
]