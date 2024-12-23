import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export default function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative max-w-6xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-red-500"
        >
          <X className="w-8 h-8" />
        </button>
        <img 
          src={imageUrl} 
          alt="Gallery preview" 
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
}