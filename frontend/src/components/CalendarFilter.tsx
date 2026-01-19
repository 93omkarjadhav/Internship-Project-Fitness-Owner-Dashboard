import React, { useState, useEffect } from "react";

interface CalendarFilterProps {
  onClose: () => void;
}

export default function CalendarFilter({ onClose }: CalendarFilterProps) {
  // Default to February 2019 to match the UI image initially, 
  // but fully functional for navigation.
  const [currentDate, setCurrentDate] = useState(new Date(2019, 1, 1)); // Feb 1, 2019
  const [selectedDate, setSelectedDate] = useState<number | null>(14);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Calendar Logic
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate grid items
  const generateCalendarGrid = () => {
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month); // 0 = Sunday
    const prevMonthDays = getDaysInMonth(year, month - 1);
    
    const grid = [];

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      grid.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      grid.push({ day: i, isCurrentMonth: true });
    }

    // Next month padding to fill 6 rows (42 cells) standard grid
    const remainingCells = 42 - grid.length;
    for (let i = 1; i <= remainingCells; i++) {
      grid.push({ day: i, isCurrentMonth: false });
    }

    return grid;
  };

  const gridItems = generateCalendarGrid();

  return (
    <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] w-[320px] p-6 border border-gray-100 font-sans animate-in fade-in zoom-in-95 duration-200">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#202224]">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={handlePrevMonth}
            className="w-8 h-8 flex items-center justify-center bg-[#F5F6FA] rounded-md hover:bg-gray-200 transition-colors text-gray-500"
          >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 9L1.5 5L4.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            onClick={handleNextMonth}
            className="w-8 h-8 flex items-center justify-center bg-[#E0E0E0] rounded-md hover:bg-gray-300 transition-colors text-gray-600"
          >
             <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 9L4.5 5L1.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* DAYS HEADER */}
      <div className="grid grid-cols-7 mb-4 text-center">
        {daysOfWeek.map((d, i) => (
          <span key={i} className="text-sm font-semibold text-gray-400">
            {d}
          </span>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-6">
        {gridItems.map((item, index) => {
          const isSelected = item.isCurrentMonth && item.day === selectedDate;
          
          return (
            <div 
              key={index} 
              onClick={() => item.isCurrentMonth && setSelectedDate(item.day)}
              className={`
                h-9 w-9 flex items-center justify-center text-sm rounded-xl cursor-pointer transition-all
                ${!item.isCurrentMonth ? "text-gray-300" : "text-[#202224] font-medium"}
                ${isSelected ? "bg-[#4880FF] text-white shadow-md shadow-blue-200 font-semibold" : item.isCurrentMonth && "hover:bg-gray-50"}
              `}
            >
              {item.day}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-100 pt-4 text-center">
        <p className="text-xs text-gray-500 mb-4 text-left">
          *You can choose multiple date
        </p>
        <button 
          onClick={onClose}
          className="bg-[#4880FF] text-white text-sm font-medium py-2.5 px-8 rounded-lg shadow-blue-200 shadow-md hover:bg-blue-600 transition-colors w-2/3"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}