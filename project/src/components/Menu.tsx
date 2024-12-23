import React from 'react';
import MenuSection from './menu/MenuSection';
import { menuItems } from '../data/menuItems';

export default function Menu() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Our <span className="text-red-500">Menu</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Main Dishes */}
          <MenuSection
            title="Main Dishes"
            items={menuItems.mains}
          />

          {/* Sides */}
          <MenuSection
            title="Sides"
            items={menuItems.sides}
          />

          {/* Vegetable Sides */}
          <MenuSection
            title="Vegetable Sides"
            items={menuItems.vegSides}
          />

          {/* Daily Specials */}
          {Object.entries(menuItems.dailySpecials).map(([day, items]) => (
            <MenuSection
              key={day}
              title={`${day.charAt(0).toUpperCase() + day.slice(1)}'s Specials`}
              subtitle={`Only available on ${day.charAt(0).toUpperCase() + day.slice(1)}s`}
              items={items}
            />
          ))}
        </div>
      </div>
    </section>
  );
}