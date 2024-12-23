import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO, BUSINESS_HOURS } from '../../data/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <div className="flex items-start space-x-2">
              <Clock className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <p className="text-gray-300">{BUSINESS_HOURS.days}</p>
                <p className="text-gray-300">{BUSINESS_HOURS.open} - {BUSINESS_HOURS.close}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-red-500" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-300 hover:text-white">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <p className="text-gray-300">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Kamalo City. All rights reserved.</p>
          <p className="text-red-500 mt-4 font-semibold">More exciting things are coming to Kamalo City soon!</p>
        </div>
      </div>
    </footer>
  );
}