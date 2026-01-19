import React, { useState } from "react";

interface PriceFilterProps {
  onClose: () => void;
}

export default function PriceFilter({ onClose }: PriceFilterProps) {
  // Using an array to track multiple selected indices or values
  // Design implies multi-select ("You can choose multiple Price Ranges")
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);

  const ranges = [
    "<4000",
    "4000-8000",
    "8000-12000",
    "12000-16000",
    "16000-20000"
  ];

  const toggleRange = (range: string) => {
    if (selectedRanges.includes(range)) {
      setSelectedRanges(selectedRanges.filter((r) => r !== range));
    } else {
      setSelectedRanges([...selectedRanges, range]);
    }
  };

  return (
    <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] w-[400px] p-6 border border-gray-100 font-sans animate-in fade-in zoom-in-95 duration-200">
      
      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#202224]">
          Select Price Range
        </h3>
      </div>

      {/* RANGES GRID */}
      <div className="flex flex-wrap gap-3 mb-8">
        {ranges.map((range) => {
          const isSelected = selectedRanges.includes(range);
          return (
            <button
              key={range}
              onClick={() => toggleRange(range)}
              className={`
                px-6 py-2 rounded-full border text-sm font-medium transition-all
                ${isSelected 
                  ? "bg-[#4880FF] text-white border-[#4880FF] shadow-blue-200 shadow-md" 
                  : "bg-white text-[#202224] border-gray-300 hover:border-[#4880FF] hover:text-[#4880FF]"
                }
              `}
            >
              {range}
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-100 pt-4 text-center">
        <p className="text-xs text-gray-500 mb-4 text-left">
          *You can choose multiple Price Ranges
        </p>
        <button 
          onClick={onClose}
          className="bg-[#4880FF] text-white text-sm font-medium py-2.5 px-8 rounded-lg shadow-blue-200 shadow-md hover:bg-blue-600 transition-colors w-1/2"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}