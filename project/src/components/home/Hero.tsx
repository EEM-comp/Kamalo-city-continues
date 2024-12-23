import React from 'react';
import HeroButton from './HeroButton';
import ChatButton from '../chat/ChatButton';
import { CONTACT_INFO } from '../../data/constants';

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
          <p className="text-xl text-white mb-8 px-4">
            Experience authentic African cuisine at Kamalo City in Cape Town. Enjoy shisha, unique perfumes, and our welcoming atmosphere in Goodwood.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <HeroButton to="/menu" color="bg-red-500 hover:bg-red-600">
              See Menu
            </HeroButton>
            <HeroButton href={CONTACT_INFO.instagram} color="bg-purple-600 hover:bg-purple-700">
              See Our Instagram
            </HeroButton>
            <ChatButton />
          </div>
        </div>
      </div>
    </div>
  );
}