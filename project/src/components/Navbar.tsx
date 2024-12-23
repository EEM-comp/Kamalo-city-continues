import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-black text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-gold font-bold text-xl">KAMALO CITY</Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:text-red-500 px-3 py-2">Home</Link>
              <Link to="/discover" className="hover:text-red-500 px-3 py-2">Discover</Link>
              <Link to="/menu" className="hover:text-red-500 px-3 py-2">Menu</Link>
              <Link to="/about" className="hover:text-red-500 px-3 py-2">About Us</Link>
              <Link to="/contact" className="hover:text-red-500 px-3 py-2">Contact Us</Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block hover:text-red-500 px-3 py-2">Home</Link>
            <Link to="/discover" className="block hover:text-red-500 px-3 py-2">Discover</Link>
            <Link to="/menu" className="block hover:text-red-500 px-3 py-2">Menu</Link>
            <Link to="/about" className="block hover:text-red-500 px-3 py-2">About Us</Link>
            <Link to="/contact" className="block hover:text-red-500 px-3 py-2">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}