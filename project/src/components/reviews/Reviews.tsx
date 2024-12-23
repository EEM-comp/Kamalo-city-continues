import React from 'react';
import { Link } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import { reviews } from '../../data/reviews';

export default function Reviews() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Customer <span className="text-red-500">Reviews</span>
          </h2>
          <p className="text-gray-400">What our customers say about us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/reviews"
            className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition inline-block"
          >
            Share Your Experience
          </Link>
        </div>
      </div>
    </section>
  );
}