import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Calendar, Star } from 'lucide-react';
import { CONTACT_INFO } from '../data/constants';

export default function ActionButtons() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Uber Eats Order */}
          <div className="bg-black p-8 rounded-lg text-center group hover:bg-gray-800 transition">
            <div className="mb-4 text-green-500">
              <UtensilsCrossed className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Order Now</h3>
            <p className="text-gray-400 mb-6">Get your favorite African dishes delivered to your doorstep</p>
            <a
              href={CONTACT_INFO.ubereats}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition"
            >
              Order on Uber Eats
            </a>
          </div>

          {/* Reservations */}
          <div className="bg-black p-8 rounded-lg text-center group hover:bg-gray-800 transition">
            <div className="mb-4 text-red-500">
              <Calendar className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Make a Reservation</h3>
            <p className="text-gray-400 mb-6">Book your table for a perfect dining experience</p>
            <Link
              to="/reservations"
              className="inline-block bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition"
            >
              Reserve Now
            </Link>
          </div>

          {/* Reviews */}
          <div className="bg-black p-8 rounded-lg text-center group hover:bg-gray-800 transition">
            <div className="mb-4 text-yellow-500">
              <Star className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Share Your Experience</h3>
            <p className="text-gray-400 mb-6">Let us know about your visit to Kamalo City</p>
            <Link
              to="/reviews"
              className="inline-block bg-yellow-500 text-white px-8 py-3 rounded-full hover:bg-yellow-600 transition"
            >
              Write a Review
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}