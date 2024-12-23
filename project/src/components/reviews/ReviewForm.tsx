import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg" id="leave-review">
      <h3 className="text-2xl font-bold text-white mb-6">Leave a Review</h3>
      
      <form className="space-y-6">
        <div>
          <label className="block text-white mb-2">Your Rating</label>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <Star
                  key={index}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    ratingValue <= (hover || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Name</label>
          <input
            type="text"
            className="w-full bg-gray-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Your Review</label>
          <textarea
            rows={4}
            className="w-full bg-gray-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}