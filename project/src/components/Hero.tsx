import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../data/constants';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-red-500">Kamalo City</span>
          </h1>
          <p className="text-xl text-white mb-8">
            Experience authentic African cuisine, entertainment, and culture
          </p>
          <div className="space-x-4">
            <Link
              to="/menu"
              className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition"
            >
              See Menu
            </Link>
            <a
              href={CONTACT_INFO.ubereats}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}