import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight as ChessKnight, Trophy, Users, Calendar } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-red-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <ChessKnight size={24} />
            <span className="font-bold text-lg">PHS Chess</span>
          </NavLink>
          
          <div className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? 'font-bold' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/players"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? 'font-bold' : ''}`
              }
            >
              Players
            </NavLink>
            <NavLink
              to="/achievements"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? 'font-bold' : ''}`
              }
            >
              Achievements
            </NavLink>
            <NavLink
              to="/fixtures"
              className={({ isActive }) =>
                `hover:text-gray-200 ${isActive ? 'font-bold' : ''}`
              }
            >
              Fixtures
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}