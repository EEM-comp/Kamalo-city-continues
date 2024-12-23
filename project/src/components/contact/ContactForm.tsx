import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import LocationMap from './LocationMap';

export default function ContactForm() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div className="bg-gray-900 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
        <form className="space-y-6">
          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              className="w-full bg-gray-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Message</label>
            <textarea
              rows={4}
              className="w-full bg-gray-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-900 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-center">
              <Phone className="text-red-500 w-6 h-6 mr-4" />
              <a href="tel:+27731598909" className="text-white hover:text-red-500">
                +27 73 159 8909
              </a>
            </div>
            <div className="flex items-center">
              <MessageSquare className="text-red-500 w-6 h-6 mr-4" />
              <a
                href="https://wa.me/27731598909"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500"
              >
                WhatsApp Us
              </a>
            </div>
            <div className="flex items-center">
              <MapPin className="text-red-500 w-6 h-6 mr-4" />
              <span className="text-white">90 Voortrekker Road, Goodwood, Western Cape</span>
            </div>
          </div>
        </div>
        
        <LocationMap />
      </div>
    </div>
  );
}