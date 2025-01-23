import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Users, Calendar } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <img
            src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=2000"
            alt="Chess pieces"
            className="w-full h-[400px] object-cover rounded-lg shadow-xl mb-8"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            President High School Chess Association
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fostering strategic thinking and competitive excellence through the royal game of chess.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To develop critical thinking, strategic planning, and sportsmanship through chess,
            while building a community of passionate players who represent President High School
            in competitions at all levels.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-8">
          <button
            onClick={() => navigate('/players')}
            className="flex items-center justify-center space-x-3 bg-red-700 text-white p-6 rounded-lg shadow-md hover:bg-red-800 transition"
          >
            <Users size={24} />
            <span className="text-lg font-semibold">Player Information</span>
          </button>
          
          <button
            onClick={() => navigate('/achievements')}
            className="flex items-center justify-center space-x-3 bg-gray-700 text-white p-6 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            <Trophy size={24} />
            <span className="text-lg font-semibold">Achievements</span>
          </button>

          <button
            onClick={() => navigate('/fixtures')}
            className="flex items-center justify-center space-x-3 bg-red-700 text-white p-6 rounded-lg shadow-md hover:bg-red-800 transition"
          >
            <Calendar size={24} />
            <span className="text-lg font-semibold">School Fixtures</span>
          </button>
        </div>
      </div>
    </div>
  );
}