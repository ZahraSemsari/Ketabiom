import { useNavigate } from "react-router-dom";
import React from "react";
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/book/${book.id}`)}
      className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
      dir="rtl"
    >
      <img
        src={book.cover}
        alt={book.title}
        className="w-[146px] h-[191px] rounded-[30px] object-cover transition-all duration-200 group-hover:scale-105"
      />

      <p className="text-[21px] font-medium">{book.title}</p>

      <p className="text-[#3d3d3d] text-[17px]">{book.author}</p>
    </button>
  );
}
