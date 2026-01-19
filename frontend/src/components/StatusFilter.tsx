// import React, { useState } from "react";

// interface StatusFilterProps {
//   onClose: () => void;
// }

// export default function StatusFilter({ onClose }: StatusFilterProps) {
//   const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

//   const statuses = [
//     "Completed",
//     "Processing",
//     "Rejected",
//     "On Hold",
//     "In Transit"
//   ];

//   const toggleStatus = (status: string) => {
//     if (selectedStatuses.includes(status)) {
//       setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
//     } else {
//       setSelectedStatuses([...selectedStatuses, status]);
//     }
//   };

//   return (
//     <div className="absolute top-full right-0 md:left-0 mt-2 z-50 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] w-[360px] p-6 border border-gray-100 font-sans animate-in fade-in zoom-in-95 duration-200">
      
//       {/* HEADER */}
//       <div className="mb-6">
//         <h3 className="text-lg font-bold text-[#202224]">
//           Select Order Status
//         </h3>
//       </div>

//       {/* STATUSES GRID */}
//       <div className="flex flex-wrap gap-3 mb-8">
//         {statuses.map((status) => {
//           const isSelected = selectedStatuses.includes(status);
//           return (
//             <button
//               key={status}
//               onClick={() => toggleStatus(status)}
//               className={`
//                 px-6 py-2 rounded-full border text-sm font-medium transition-all
//                 ${isSelected 
//                   ? "bg-[#4880FF] text-white border-[#4880FF] shadow-blue-200 shadow-md" 
//                   : "bg-white text-[#202224] border-gray-300 hover:border-[#4880FF] hover:text-[#4880FF]"
//                 }
//               `}
//             >
//               {status}
//             </button>
//           );
//         })}
//       </div>

//       {/* FOOTER */}
//       <div className="border-t border-gray-100 pt-4 text-center">
//         <p className="text-xs text-gray-500 mb-4 text-left">
//           *You can choose multiple Order Status
//         </p>
//         <button 
//           onClick={onClose}
//           className="bg-[#4880FF] text-white text-sm font-medium py-2.5 px-8 rounded-lg shadow-blue-200 shadow-md hover:bg-blue-600 transition-colors w-1/2"
//         >
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

interface StatusFilterProps {
  onClose: () => void;
  onSelect: (status: string) => void; // ✨ NEW: Prop to send data back
}

export default function StatusFilter({ onClose, onSelect }: StatusFilterProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const statuses = [
    "Completed",
    "Processing",
    "Rejected",
    "On Hold",
    "In Transit"
  ];

  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  // ✨ NEW: Handler for Apply button
  const handleApply = () => {
    // Join array into string like "Completed,Processing" for the API
    const statusString = selectedStatuses.join(",");
    onSelect(statusString); 
    onClose();
  };

  return (
    <div className="absolute top-full right-0 md:left-0 mt-2 z-50 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] w-[360px] p-6 border border-gray-100 font-sans animate-in fade-in zoom-in-95 duration-200">
      
      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#202224]">
          Select Order Status
        </h3>
      </div>

      {/* STATUSES GRID */}
      <div className="flex flex-wrap gap-3 mb-8">
        {statuses.map((status) => {
          const isSelected = selectedStatuses.includes(status);
          return (
            <button
              key={status}
              onClick={() => toggleStatus(status)}
              className={`
                px-6 py-2 rounded-full border text-sm font-medium transition-all
                ${isSelected 
                  ? "bg-[#4880FF] text-white border-[#4880FF] shadow-blue-200 shadow-md" 
                  : "bg-white text-[#202224] border-gray-300 hover:border-[#4880FF] hover:text-[#4880FF]"
                }
              `}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-100 pt-4 text-center">
        <p className="text-xs text-gray-500 mb-4 text-left">
          *You can choose multiple Order Status
        </p>
        <button 
          onClick={handleApply} // ✨ Updated to call handleApply
          className="bg-[#4880FF] text-white text-sm font-medium py-2.5 px-8 rounded-lg shadow-blue-200 shadow-md hover:bg-blue-600 transition-colors w-1/2"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}