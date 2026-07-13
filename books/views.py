from django.db.models import Q, Count, Avg, FloatField, Value
from django.db.models.functions import Coalesce
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound

from .models import Book, ReadingList, ReadingListItem, Review, Quote, Note
from .serializers import (
    BookListSerializer,
    BookDetailSerializer,
    ReadingListSerializer,
    ReadingListCreateSerializer,
    AddToListSerializer,
    ReviewSerializer,
    QuoteSerializer,
    NoteSerializer,
    BookSearchSerializer,
)


def create_default_reading_lists(user):
    defaults = [
        ('خوانده شده', ReadingList.READ),
        ('در حال خواندن', ReadingList.READING),
        ('خواهم خواند', ReadingList.WANT),
    ]

    for name, list_type in defaults:
        ReadingList.objects.get_or_create(
            user=user,
            list_type=list_type,
            defaults={'name': name}
        )

class HomeAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        latest_books = (
            Book.objects
            .select_related('author', 'publisher')
            .annotate(
                average_rating=Coalesce(
                    Avg('reviews__rating'),
                    Value(0.0),
                    output_field=FloatField()
                ),
                reviews_count=Count('reviews', distinct=True)
            )
            .order_by('-created_at')[:10]
        )

        popular_books = (
            Book.objects
            .select_related('author', 'publisher')
            .annotate(
                average_rating=Coalesce(
                    Avg('reviews__rating'),
                    Value(0.0),
                    output_field=FloatField()
                ),
                reviews_count=Count('reviews', distinct=True)
            )
            .order_by('-reviews_count', '-created_at')[:10]
        )

        return Response({
            'latest_books': BookListSerializer(
                latest_books,
                many=True,
                context={'request': request}
            ).data,
            'popular_books': BookListSerializer(
                popular_books,
                many=True,
                context={'request': request}
            ).data,
        })

class BookListAPIView(generics.ListAPIView):
    serializer_class = BookListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = (
            Book.objects
            .select_related('author', 'publisher')
            .annotate(
                average_rating=Coalesce(
                    Avg('reviews__rating'),
                    Value(0.0),
                    output_field=FloatField()
                ),
                reviews_count=Count('reviews', distinct=True)
            )
        )

        q = self.request.query_params.get('q')
        if q:
            queryset = queryset.filter(
                Q(title__icontains=q) |
                Q(author__name__icontains=q) |
                Q(publisher__name__icontains=q)
            )

        return queryset

class BookDetailAPIView(generics.RetrieveAPIView):
    serializer_class = BookDetailSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return (
            Book.objects
            .select_related('author', 'publisher')
            .prefetch_related(
                'categories',
                'reviews__user',
                'quotes__user',
                'notes__user',
            )
            .annotate(
                average_rating=Coalesce(
                    Avg('reviews__rating'),
                    Value(0.0),
                    output_field=FloatField()
                ),
                reviews_count=Count('reviews', distinct=True)
            )
        )

class SearchAPIView(generics.ListAPIView):
    serializer_class = BookSearchSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        q = self.request.query_params.get('q', '').strip()

        if not q:
            return Book.objects.none()

        return (
            Book.objects
            .select_related('author', 'publisher')
            .annotate(
                average_rating=Coalesce(
                    Avg('reviews__rating'),
                    Value(0.0),
                    output_field=FloatField()
                ),
                reviews_count=Count('reviews', distinct=True)
            )
            .filter(
                Q(title__icontains=q) |
                Q(author__name__icontains=q)
            )
        )

class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        create_default_reading_lists(request.user)

        reading_lists = ReadingList.objects.filter(
            user=request.user
        ).prefetch_related(
            'items__book',
            'items__book__author',
            'items__book__publisher'
        )

        notes = Note.objects.filter(
            user=request.user
        ).select_related(
            'book',
            'book__author'
        )[:20]

        reviews = Review.objects.filter(
            user=request.user
        ).select_related(
            'book',
            'book__author'
        )[:20]

        quotes = Quote.objects.filter(
            user=request.user
        ).select_related(
            'book',
            'book__author'
        )[:20]

        read_books_count = ReadingListItem.objects.filter(
            reading_list__user=request.user,
            reading_list__list_type=ReadingList.READ
        ).count()

        reading_books_count = ReadingListItem.objects.filter(
            reading_list__user=request.user,
            reading_list__list_type=ReadingList.READING
        ).count()

        want_books_count = ReadingListItem.objects.filter(
            reading_list__user=request.user,
            reading_list__list_type=ReadingList.WANT
        ).count()

        notes_count = Note.objects.filter(user=request.user).count()
        quotes_count = Quote.objects.filter(user=request.user).count()
        reviews_count = Review.objects.filter(user=request.user).count()

        score = read_books_count + notes_count + quotes_count

        profile_image_url = None

        if hasattr(request.user, 'profile_image') and request.user.profile_image:
            profile_image_url = request.build_absolute_uri(
                request.user.profile_image.url
            )

        return Response({
            'user': {
                'id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'first_name': request.user.first_name,
                'last_name': request.user.last_name,
                'profile_image_url': profile_image_url,
            },
            'stats': {
                'read_books': read_books_count,
                'reading_books': reading_books_count,
                'want_books': want_books_count,
                'notes': notes_count,
                'quotes': quotes_count,
                'reviews': reviews_count,
                'score': score,
            },
            'score_detail': {
                'read_book_score': read_books_count,
                'note_score': notes_count,
                'quote_score': quotes_count,
                'total_score': score,
            },
            'reading_lists': ReadingListSerializer(
                reading_lists,
                many=True,
                context={'request': request}
            ).data,
            'notes': NoteSerializer(
                notes,
                many=True,
                context={'request': request}
            ).data,
            'reviews': ReviewSerializer(
                reviews,
                many=True,
                context={'request': request}
            ).data,
            'quotes': QuoteSerializer(
                quotes,
                many=True,
                context={'request': request}
            ).data,
        })


class ReadingListListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        create_default_reading_lists(self.request.user)
        return ReadingList.objects.filter(user=self.request.user).prefetch_related(
            'items__book',
            'items__book__author',
            'items__book__publisher'
        )

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ReadingListCreateSerializer
        return ReadingListSerializer

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            list_type=ReadingList.CUSTOM
        )


class ReadingListDetailAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = ReadingListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ReadingList.objects.filter(user=self.request.user)

    def perform_destroy(self, instance):
        if instance.list_type != ReadingList.CUSTOM:
            raise PermissionDenied('لیست‌های اصلی قابل حذف نیستند.')
        instance.delete()

class AddBookToListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        create_default_reading_lists(request.user)

        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            raise NotFound('کتاب پیدا نشد.')

        serializer = AddToListSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        list_id = serializer.validated_data.get('list_id')
        list_type = serializer.validated_data.get('list_type')
        rating = serializer.validated_data.get('rating')

        if list_id:
            try:
                reading_list = ReadingList.objects.get(
                    id=list_id,
                    user=request.user
                )
            except ReadingList.DoesNotExist:
                raise NotFound('کتابخانه پیدا نشد.')
        else:
            reading_list = ReadingList.objects.get(
                user=request.user,
                list_type=list_type
            )

        item, created = ReadingListItem.objects.get_or_create(
            reading_list=reading_list,
            book=book
        )

        review_data = None

        if rating is not None:
            review, _ = Review.objects.update_or_create(
                user=request.user,
                book=book,
                defaults={
                    'rating': rating,
                    'text': ''
                }
            )
            review_data = ReviewSerializer(
                review,
                context={'request': request}
            ).data

        return Response({
            'message': 'کتاب به کتابخانه اضافه شد.',
            'created': created,
            'item_id': item.id,
            'review': review_data,
        }, status=status.HTTP_201_CREATED)


class RemoveBookFromListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        list_id = request.data.get('list_id')
        list_type = request.data.get('list_type')

        if not list_id and not list_type:
            return Response(
                {'detail': 'یا list_id بفرستید یا list_type.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        filters = {
            'book_id': pk,
            'reading_list__user': request.user,
        }

        if list_id:
            filters['reading_list_id'] = list_id
        else:
            filters['reading_list__list_type'] = list_type

        deleted_count, _ = ReadingListItem.objects.filter(**filters).delete()

        if deleted_count == 0:
            return Response(
                {'detail': 'این کتاب در این لیست وجود ندارد.'},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response({'message': 'کتاب از لیست حذف شد.'})


class BookReviewListCreateAPIView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, pk):
        reviews = Review.objects.filter(book_id=pk).select_related('user', 'book')
        serializer = ReviewSerializer(reviews, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, pk):
        try:
            book = Book.objects.get(id=pk)
        except Book.DoesNotExist:
            raise NotFound('کتاب پیدا نشد.')

        serializer = ReviewSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        review, created = Review.objects.update_or_create(
            user=request.user,
            book=book,
            defaults={
                'rating': serializer.validated_data['rating'],
                'text': serializer.validated_data.get('text', '')
            }
        )

        output = ReviewSerializer(review, context={'request': request})
        return Response(
            output.data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )


class BookQuoteListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = QuoteSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        return Quote.objects.filter(book_id=self.kwargs['pk']).select_related('user', 'book')

    def perform_create(self, serializer):
        book_id = self.kwargs['pk']
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            raise NotFound('کتاب پیدا نشد.')

        serializer.save(user=self.request.user, book=book)

# class BookNoteCreateAPIView(generics.CreateAPIView):
#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]
#
#     def perform_create(self, serializer):
#         book_id = self.kwargs['pk']
#         try:
#             book = Book.objects.get(id=book_id)
#         except Book.DoesNotExist:
#             raise NotFound('کتاب پیدا نشد.')
#
#         serializer.save(user=self.request.user, book=book)
#
#

class BookNoteListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        return Note.objects.filter(book_id=self.kwargs['pk']).select_related('user', 'book')

    def perform_create(self, serializer):
        book_id = self.kwargs['pk']
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            raise NotFound('کتاب پیدا نشد.')

        serializer.save(user=self.request.user, book=book)

class QuoteDeleteAPIView(generics.DestroyAPIView):
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Quote.objects.filter(
            user=self.request.user
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        return Response(
            {
                'message':
                    'بریده با موفقیت حذف شد.'
            },
            status=status.HTTP_200_OK
        )


class NoteDeleteAPIView(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(
            user=self.request.user
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        return Response(
            {
                'message':
                    'یادداشت با موفقیت حذف شد.'
            },
            status=status.HTTP_200_OK
        )
    
