import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { galleryImages } from '../../data/galleryImages';
import ImageModal from './ImageModal';

const categories = ['All', 'Restaurant', 'Perfumes & Shisha', 'Barbershop'];

// Flatten all images for 'All' category view
const allImages = Object.values(galleryImages).flat();

export default function FullGallery() {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState(
    category ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'All'
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeCategory === 'All'
    ? allImages
    : allImages.filter(img => img.category === activeCategory);

  return (
    <section className="py-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Full <span className="text-red-500">Gallery</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex justify-center w-full mb-4">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full transition ${
                activeCategory === 'All'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >
              All
            </button>
          </div>
          <div className="flex justify-center gap-4 w-full flex-wrap">
            {categories.slice(1).map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition ${
                  activeCategory === category
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredImages.map((image, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <p className="text-white text-center px-4">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </section>
  );
}