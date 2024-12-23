import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  image: string;
  alt: string;
  onClose: () => void;
}

export default function ImagePreview({ image, alt, onClose }: ImagePreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative max-w-4xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-red-500"
        >
          <X className="w-8 h-8" />
        </button>
        <img src={image} alt={alt} className="w-full h-auto rounded-lg" />
      </div>
    </div>
  );
}