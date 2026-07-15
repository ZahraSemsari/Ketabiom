from rest_framework import serializers

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


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'bio']


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']


class BookListSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    publisher_name = serializers.CharField(source='publisher.name', read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    reviews_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'author_name',
            'publisher_name',
            'cover_url',
            'pages_count',
            'published_year',
            'average_rating',
            'reviews_count',
            
        ]


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    book_title = serializers.CharField(source='book.title', read_only=True)
    author_name = serializers.CharField(source='book.author.name', read_only=True)
    cover_url = serializers.CharField(source='book.cover_url', read_only=True)

    class Meta:
        model = Review
        fields = [
            'id',
            'username',
            'book',
            'book_title',
            'author_name',
            'cover_url',
            'text',
            'rating',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['book']
        extra_kwargs = {
            'text': {'required': False, 'allow_blank': True},
        }


class QuoteSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    book_title = serializers.CharField(source='book.title', read_only=True)
    author_name = serializers.CharField(source='book.author.name', read_only=True)
    cover_url = serializers.CharField(source='book.cover_url', read_only=True)

    class Meta:
        model = Quote
        fields = [
            'id',
            'username',
            'book',
            'book_title',
            'author_name',
            'cover_url',
            'text',
            'page_number',
            'created_at',
        ]
        read_only_fields = ['book']


class NoteSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    book_title = serializers.CharField(source='book.title', read_only=True)
    author_name = serializers.CharField(source='book.author.name', read_only=True)
    cover_url = serializers.CharField(source='book.cover_url', read_only=True)

    class Meta:
        model = Note
        fields = [
            'id',
            'username',
            'book',
            'book_title',
            'author_name',
            'cover_url',
            'text',
            'created_at',
        ]
        read_only_fields = ['book']


class BookDetailSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    publisher = PublisherSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    reviews_count = serializers.IntegerField(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    quotes = QuoteSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'author',
            'publisher',
            'categories',
            'cover_url',
            'description',
            'pages_count',
            'published_year',
            'average_rating',
            'reviews_count',
            'reviews',
            'quotes',
            'notes',
            'created_at',
        ]


class ReadingListItemSerializer(serializers.ModelSerializer):
    book = BookListSerializer(read_only=True)

    class Meta:
        model = ReadingListItem
        fields = ['id', 'book', 'created_at']


class ReadingListSerializer(serializers.ModelSerializer):
    items = ReadingListItemSerializer(many=True, read_only=True)
    books_count = serializers.SerializerMethodField()

    class Meta:
        model = ReadingList
        fields = [
            'id',
            'name',
            'list_type',
            'books_count',
            'items',
            'created_at',
        ]

    def get_books_count(self, obj):
        return obj.items.count()


class ReadingListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingList
        fields = ['id', 'name']


class AddToListSerializer(serializers.Serializer):
    list_type = serializers.ChoiceField(
        choices=['read', 'reading', 'want'],
        required=False
    )
    list_id = serializers.IntegerField(required=False)
    rating = serializers.IntegerField(required=False, min_value=1, max_value=5)

    def validate(self, attrs):
        if not attrs.get('list_type') and not attrs.get('list_id'):
            raise serializers.ValidationError(
                'یا list_type بفرستید یا list_id.'
            )
        return attrs

class BookSearchSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    publisher_name = serializers.CharField(source='publisher.name', read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    reviews_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'author_name',
            'publisher_name',
            'cover_url',
            'pages_count',
            'published_year',
            'average_rating',
            'reviews_count',
            'description',
        ]
