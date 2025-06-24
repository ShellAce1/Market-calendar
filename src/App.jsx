// src/components/App.jsx
import React from 'react';
import './CalendarGrid.css'; // Optional: Add styles here or in Tailwind

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Dummy data for June 2025
const mockDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  events: i === 2 || i === 15 ? ['FOMC Meeting'] : [],
}));

const CalendarGrid = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">June 2025</h2>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {mockDays.map(({ day, events }) => (
          <div
            key={day}
            className="border rounded-lg p-2 min-h-[80px] bg-white shadow-sm"
          >
            <div className="font-bold">{day}</div>
            {events.map((event, idx) => (
              <div key={idx} className="text-xs text-blue-600">
                {event}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
