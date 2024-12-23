import React from 'react';
import { UtensilsCrossed, Calendar, Star } from 'lucide-react';
import ActionButton from './ActionButton';
import { CONTACT_INFO } from '../../data/constants';

const actionButtons = [
  {
    icon: UtensilsCrossed,
    title: 'Order Now',
    description: 'Get your favorite African dishes delivered to your doorstep',
    buttonText: 'Order on Uber Eats',
    buttonLink: CONTACT_INFO.ubereats,
    buttonColor: 'bg-green-600 hover:bg-green-700',
    iconColor: 'text-green-500',
    isExternalLink: true
  },
  {
    icon: Calendar,
    title: 'Make a Reservation',
    description: 'Book your table for a perfect dining experience',
    buttonText: 'Reserve Now',
    buttonLink: '/reservations',
    buttonColor: 'bg-red-500 hover:bg-red-600',
    iconColor: 'text-red-500'
  },
  {
    icon: Star,
    title: 'Share Your Experience',
    description: 'Let us know about your visit to Kamalo City',
    buttonText: 'Write a Review',
    buttonLink: '/reviews',
    buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
    iconColor: 'text-yellow-500'
  }
];

export default function ActionButtons() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actionButtons.map((button, index) => (
            <ActionButton key={index} {...button} />
          ))}
        </div>
      </div>
    </section>
  );
}