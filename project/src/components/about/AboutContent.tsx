import React from 'react';

export default function AboutContent() {
  const images = {
    founder: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    staff: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c",
    customers: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8"
  };

  return (
    <div className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Beginning</h2>
            <p className="text-gray-300 leading-relaxed">
              Kamalo City began its journey when founder Pitchou Ntumba transformed an abandoned building into a vibrant hub of culture and flavor. From these humble beginnings, Kamalo City grew into more than just a restaurant—it became a place where food connects people and cultures. Driven by a passion for sharing the rich and diverse tastes of Africa, we are committed to offering our customers an unforgettable experience while prioritizing sustainability and ethical sourcing.
            </p>
          </div>
          <div className="relative h-96">
            <img
              src={images.founder}
              alt="Pitchou Ntumba - Founder"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <img
              src={images.staff}
              alt="Our dedicated staff"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Our Team</h3>
              <p className="text-gray-300">
                Our passionate team brings expertise and warmth to every interaction, ensuring your experience is memorable.
              </p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <img
              src={images.customers}
              alt="Happy customers"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Our Community</h3>
              <p className="text-gray-300">
                We're proud to be a gathering place where cultures meet and memories are made.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}