import React, { useState } from 'react';
import { Clock } from 'lucide-react';

interface TimeSlotPickerProps {
  selectedDate: Date;
  onTimeSelect: (time: string) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ selectedDate, onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate time slots from 9 AM to 5 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  const isTimeSlotAvailable = (time: string) => {
    // Mock availability check - implement actual logic here
    return Math.random() > 0.3;
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Selected Date: {selectedDate.toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {generateTimeSlots().map((time) => {
          const isAvailable = isTimeSlotAvailable(time);
          return (
            <button
              key={time}
              onClick={() => isAvailable && handleTimeClick(time)}
              disabled={!isAvailable}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg border ${
                selectedTime === time
                  ? 'bg-indigo-600 text-white border-transparent'
                  : isAvailable
                  ? 'border-gray-200 hover:border-indigo-600 text-gray-900'
                  : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>{time}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
            <span className="text-gray-600">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white border border-gray-200 rounded-full"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-50 border border-gray-100 rounded-full"></div>
            <span className="text-gray-600">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotPicker;