import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CONTACT_INFO } from '../../data/constants';

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-4 mb-4 max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Customer Support</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-gray-300">📍 {CONTACT_INFO.address}</p>
            <p className="text-gray-300">📞 {CONTACT_INFO.phone}</p>
            <a
              href={CONTACT_INFO.ubereats}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700"
            >
              Order on Uber Eats Now!
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white p-4 rounded-full hover:bg-gray-900 transition group relative"
      >
        <MessageCircle className="w-6 h-6" />
        {!isOpen && (
          <span className="absolute -top-12 right-0 bg-white text-black text-sm py-1 px-3 rounded whitespace-nowrap shadow-lg">
            Need help? Talk to customer support!
          </span>
        )}
      </button>
    </div>
  );
}