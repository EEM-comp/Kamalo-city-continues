import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export default function ReviewCard({ name, rating, date, comment }: ReviewCardProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <img
          src="/images/kamalo-logo.jpg"
          alt="Kamalo City"
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-300">{comment}</p>
    </div>
  );
}