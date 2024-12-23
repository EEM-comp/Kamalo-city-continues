import React, { useState } from 'react';
import { Calendar, Users } from 'lucide-react';
import TimeSlot from './TimeSlot';
import { CONTACT_INFO, BUSINESS_HOURS } from '../../data/constants';
import { generateTimeSlots } from '../../utils/dateUtils';

export default function ReservationForm() {
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState('');
  const timeSlots = generateTimeSlots(BUSINESS_HOURS.open, BUSINESS_HOURS.close);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `New Reservation Request:\nDate: ${date}\nTime: ${selectedTime}\nGuests: ${guests}`;
    window.open(`${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg">
      <h3 className="text-2xl font-bold text-white mb-6">Make a Reservation</h3>
      <p className="text-gray-400 mb-6">
        Open {BUSINESS_HOURS.open} to {BUSINESS_HOURS.close}, {BUSINESS_HOURS.days}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white mb-2">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-gray-800 text-white rounded-lg p-3 pl-10 focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Number of Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              min="1"
              max="20"
              className="w-full bg-gray-800 text-white rounded-lg p-3 pl-10 focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Time</label>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time) => (
              <TimeSlot
                key={time}
                time={time}
                isSelected={time === selectedTime}
                isAvailable={true}
                onClick={() => setSelectedTime(time)}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          Confirm via WhatsApp
        </button>
      </form>
    </div>
  );
}