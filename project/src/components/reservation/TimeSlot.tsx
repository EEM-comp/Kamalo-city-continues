import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  isAvailable: boolean;
  onClick: () => void;
}

export default function TimeSlot({ time, isSelected, isAvailable, onClick }: TimeSlotProps) {
  return (
    <button
      onClick={onClick}
      disabled={!isAvailable}
      className={`flex items-center p-3 rounded-lg transition ${
        isSelected
          ? 'bg-red-500 text-white'
          : isAvailable
          ? 'bg-gray-800 text-white hover:bg-red-500'
          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
      }`}
    >
      <Clock className="w-4 h-4 mr-2" />
      {time}
    </button>
  );
}