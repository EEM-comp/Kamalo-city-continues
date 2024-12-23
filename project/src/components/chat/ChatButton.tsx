import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../../data/constants';

export default function ChatButton() {
  const handleChatClick = () => {
    // Open WhatsApp chat with pre-filled message
    const message = "Hello! I'd like to know more about Kamalo City.";
    window.open(`${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleChatClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition flex items-center gap-2"
    >
      <MessageCircle className="w-5 h-5" />
      Chat with Us
    </button>
  );
}