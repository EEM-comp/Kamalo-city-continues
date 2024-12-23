import React from 'react';

export default function AboutHero() {
  return (
    <div className="relative h-[60vh] bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-red-500">Story</span>
          </h1>
          <p className="text-xl text-white">
            A journey of flavor, culture, and community
          </p>
        </div>
      </div>
    </div>
  );
}