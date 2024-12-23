import React from 'react';
import MenuItem from './MenuItem';

interface MenuSectionProps {
  title: string;
  subtitle?: string;
  items: Array<{
    name: string;
    price: string;
    description?: string;
    image?: string;
    isPopular?: boolean;
  }>;
}

export default function MenuSection({ title, subtitle, items }: MenuSectionProps) {
  return (
    <div className="bg-gray-900 p-8 rounded-lg">
      <h3 className="text-2xl font-bold text-red-500 mb-6">{title}</h3>
      {subtitle && (
        <p className="text-yellow-500 mb-4 text-sm">{subtitle}</p>
      )}
      <div className="space-y-6">
        {items.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}