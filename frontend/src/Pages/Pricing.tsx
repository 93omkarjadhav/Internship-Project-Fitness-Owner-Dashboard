// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";


// import { X, Plus, CheckCircle, ChevronDown } from "lucide-react";


// interface Event {
//   start: string;
//   end: string;
//   title: string;
//   color: string;
// }

// export default function Pricing() {
//   const navigate = useNavigate();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [selectedDates, setSelectedDates] = useState<string[]>([]);
//   const [price, setPrice] = useState("₹");

//   const [view, setView] = useState<"month" | "week" | "day">("month");

//   const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1));

//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStartDate, setDragStartDate] = useState<string | null>(null);

//   // ⭐ ALL EVENTS REMOVED
//   const events: Event[] = [];

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();
//   const monthName = currentDate.toLocaleString("default", { month: "long" });

//   const getDaysInMonth = (year: number, month: number) =>
//     new Date(year, month + 1, 0).getDate();
//   const daysInMonth = Array.from(
//     { length: getDaysInMonth(year, month) },
//     (_, i) => i + 1
//   );

//   const changeMonth = (direction: number) => {
//     const newDate = new Date(currentDate);
//     newDate.setMonth(currentDate.getMonth() + direction);
//     setCurrentDate(newDate);
//   };

//   const createDateRange = (start: number, end: number) => {
//     const range: string[] = [];
//     const min = Math.min(start, end);
//     const max = Math.max(start, end);
//     for (let d = min; d <= max; d++) {
//       const dateStr = `${year}-${String(month + 1).padStart(
//         2,
//         "0"
//       )}-${String(d).padStart(2, "0")}`;
//       range.push(dateStr);
//     }
//     return range;
//   };

//   const handleConfirmPricing = () => {
//     setIsModalOpen(false);
//     setIsSuccessModalOpen(true);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       <main className="flex-1 p-4">
//         <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

//         <h1 className="text-2xl font-semibold mt-6 mb-4">Pricing</h1>

//         <div className="bg-white shadow-md rounded-xl p-6">
//           {/* TOP CONTROLS */}
//           <div className="flex justify-between items-center mb-4">
//             <span className="font-medium">Today</span>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => changeMonth(-1)}
//                 className="text-xl font-bold"
//               >
//                 {"<"}
//               </button>
//               <span className="text-lg font-semibold">
//                 {monthName} {year}
//               </span>
//               <button
//                 onClick={() => changeMonth(1)}
//                 className="text-xl font-bold"
//               >
//                 {">"}
//               </button>
//             </div>
//             <div className="flex border rounded-full overflow-hidden">
//               <button
//                 onClick={() => setView("day")}
//                 className={`px-5 py-2 ${
//                   view === "day" ? "bg-blue-600 text-white" : "bg-white"
//                 }`}
//               >
//                 Day
//               </button>
//               <div className="w-[1px] bg-[#D5D5D5]"></div>
//               <button
//                 onClick={() => setView("week")}
//                 className={`px-5 py-2 ${
//                   view === "week" ? "bg-blue-600 text-white" : "bg-white"
//                 }`}
//               >
//                 Week
//               </button>
//               <div className="w-[1px] bg-[#D5D5D5]"></div>
//               <button
//                 onClick={() => setView("month")}
//                 className={`px-5 py-2 ${
//                   view === "month" ? "bg-blue-600 text-white" : "bg-white"
//                 }`}
//               >
//                 Month
//               </button>
//             </div>
//           </div>

//           {/* WEEK HEADER */}
//           {(view === "month" || view === "week") && (
//             <div className="grid grid-cols-7 text-center bg-gray-100 py-2 font-medium">
//               <div>MON</div>
//               <div>TUE</div>
//               <div>WED</div>
//               <div>THU</div>
//               <div>FRI</div>
//               <div>SAT</div>
//               <div className="text-red-500">SUN</div>
//             </div>
//           )}

//           {/* MONTH VIEW */}
//           {view === "month" && (
//             <div
//               className="grid grid-cols-7 border border-[#D5D5D5] select-none"
//               onMouseUp={() => {
//                 if (isDragging) {
//                   setIsDragging(false);
//                   setIsModalOpen(true);
//                 }
//               }}
//             >
//               {daysInMonth.map((day) => {
//                 const dateString = `${year}-${String(month + 1).padStart(
//                   2,
//                   "0"
//                 )}-${String(day).padStart(2, "0")}`;

//                 return (
//                   <div
//                     key={day}
//                     onMouseDown={() => {
//                       setIsDragging(true);
//                       setDragStartDate(dateString);
//                       setSelectedDates([dateString]);
//                     }}
//                     onMouseEnter={() => {
//                       if (isDragging && dragStartDate) {
//                         const startDay = Number(
//                           dragStartDate.split("-")[2]
//                         );
//                         const newRange = createDateRange(startDay, day);
//                         setSelectedDates(newRange);
//                       }
//                     }}
//                     onMouseUp={() => {
//                       setIsDragging(false);
//                       setIsModalOpen(true);
//                     }}
//                     className={`min-h-[100px] p-2 cursor-pointer hover:bg-gray-50 flex flex-col justify-between ${
//                       selectedDates.includes(dateString)
//                         ? "border-2 !border-blue-500 bg-blue-50"
//                         : "border border-[#D5D5D5]"
//                     }`}
//                   >
//                     <div className="text-sm font-semibold">{day}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* WEEK VIEW */}
//           {view === "week" && (
//             <div className="grid grid-cols-7 border border-[#D5D5D5]">
//               {[...Array(7)].map((_, i) => {
//                 const weekDate = new Date(currentDate);
//                 weekDate.setDate(currentDate.getDate() + i);

//                 return (
//                   <div
//                     key={i}
//                     className="border border-[#D5D5D5] p-4 min-h-[120px] flex flex-col justify-between"
//                   >
//                     <div className="font-semibold">
//                       {weekDate.getDate()} {monthName}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* DAY VIEW */}
//           {view === "day" && (
//             <div className="border border-[#D5D5D5] p-6 min-h-[300px]">
//               <h2 className="font-semibold mb-4">
//                 {currentDate.toDateString()}
//               </h2>
//               <div className="text-gray-500">No scheduled events</div>
//             </div>
//           )}
//         </div>
//       </main>

//      {/* PRICING MODAL */}
// {isModalOpen && (
//   <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//     <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
      
//       <button
//         className="absolute top-3 right-3"
//         onClick={() => setIsModalOpen(false)}
//       >
//         <X />
//       </button>

//       <h2 className="text-lg font-semibold text-center mb-4">
//         Set Pricing for {selectedDates.join(", ")}
//       </h2>

//       {/* PRICE INPUT */}
//     <label className="text-sm mb-2 block">Set Price:</label>
// <input
//   type="text"
//   className="w-full border rounded-lg p-2 mb-4"
//   placeholder="Enter your price"
//   value={price}
//   onChange={(e) => {
//     let val = e.target.value.replace("₹", ""); 
//     setPrice("₹" + val);
//   }}
// />


//       {/* ⭐ CATEGORY DROPDOWN WITH LUCIDE ICON */}
//       <label className="text-sm mb-2 block">Select Category:</label>

//       <div className="relative mb-4">
//         <select
//           className="w-full border rounded-lg p-2 appearance-none text-gray-700"
//         >
//           <option value="">Select Type</option>
//           <option>Strength Training</option>
//           <option>Cardio</option>
//           <option>Yoga & Meditation</option>
//           <option>Calisthenics</option>
//           <option>Zumba</option>
//           <option>Kick Boxing</option>
//         </select>

//         {/* Lucide Dropdown Icon */}
//         <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-500 pointer-events-none" />
//       </div>

//       {/* CUSTOM TIME BOX */}
//       <div className="w-full h-12 rounded-lg flex items-center mb-2 text-gray-500 text-sm border border-gray-300">
//         <span className="px-3">Custom Price / Time</span>
//       </div>

//       <div className="w-full flex justify-start mb-4">
//         <button className="p-2 border-2 border-dotted border-gray-400 rounded-lg">
//           <Plus className="text-gray-500 w-6 h-6" />
//         </button>
//       </div>

//       <button
//         onClick={handleConfirmPricing}
//         className="w-full bg-blue-600 text-white py-2 rounded-lg"
//       >
//         Confirm New Pricing
//       </button>
//     </div>
//   </div>
// )}


//       {/* SUCCESS MODAL */}
//       {isSuccessModalOpen && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 animate-fadeIn">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-[350px] text-center relative">
//             <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-3" />
//             <h2 className="text-xl font-semibold mb-2">
//               Pricing Added Successfully!
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Your pricing has been saved for the selected dates.
//             </p>
//             <button
//              onClick={() => navigate("/services")}

//               className="w-full bg-blue-600 text-white py-2 rounded-lg"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//22222
// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { X, CheckCircle, ChevronDown } from "lucide-react";

// export default function Pricing() {
//   const navigate = useNavigate();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [selectedDates, setSelectedDates] = useState<string[]>([]);
//   const [price, setPrice] = useState("₹");
//   const [showCustomPrice, setShowCustomPrice] = useState(false);
//   const [customPrice, setCustomPrice] = useState("");
//   const [fromTime, setFromTime] = useState("");
//   const [toTime, setToTime] = useState("");

//   const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));

//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStartDate, setDragStartDate] = useState<string | null>(null);
//   const [modalTimeout, setModalTimeout] = useState<NodeJS.Timeout | null>(null);

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();
//   const monthName = currentDate.toLocaleString("default", { month: "long" });

//   const getDaysInMonth = (year: number, month: number) =>
//     new Date(year, month + 1, 0).getDate();

//   const daysInMonth = Array.from(
//     { length: getDaysInMonth(year, month) },
//     (_, i) => i + 1
//   );

//   const changeMonth = (direction: number) => {
//     const newDate = new Date(currentDate);
//     newDate.setMonth(currentDate.getMonth() + direction);
//     setCurrentDate(newDate);
//   };

//   const createDateRange = (start: number, end: number) => {
//     const range: string[] = [];
//     const min = Math.min(start, end);
//     const max = Math.max(start, end);

//     for (let d = min; d <= max; d++) {
//       const dateStr = `${year}-${String(month + 1).padStart(
//         2,
//         "0"
//       )}-${String(d).padStart(2, "0")}`;
//       range.push(dateStr);
//     }
//     return range;
//   };

//   // ✅ NEW: Get FROM & TO dates
//   const getFromToDates = () => {
//     if (selectedDates.length === 0) return null;
//     const sorted = [...selectedDates].sort();
//     return {
//       from: sorted[0],
//       to: sorted[sorted.length - 1],
//     };
//   };

//   // ✅ NEW: Format date DD-MM-YYYY
//   const formatDate = (dateStr: string) => {
//     const [y, m, d] = dateStr.split("-");
//     return `${d}-${m}-${y}`;
//   };

//   const handleConfirmPricing = () => {
//     setIsModalOpen(false);
//     setIsSuccessModalOpen(true);
//   };
//   const handleDoubleClickDate = (dateString: string) => {
//   setSelectedDates((prev) =>
//     prev.filter((date) => date !== dateString)
//   );
// };

// const toggleSingleDate = (dateString: string) => {
//   setSelectedDates((prev) =>
//     prev.includes(dateString)
//       ? prev.filter((d) => d !== dateString) // unselect
//       : [...prev, dateString]                // select
//   );
// };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       <main className="flex-1 p-6">
//         <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-3xl font-bold mt-6 mb-8 text-gray-900">Pricing Management</h1>

//           <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
//             {/* TOP CONTROLS */}
//             <div className="flex justify-between items-center mb-8">
//               <span className="font-medium text-gray-700 text-lg">Choose Dates for Pricing</span>

//               <div className="flex items-center gap-4">
//                 <button onClick={() => changeMonth(-1)} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-colors duration-200">
//                   <span className="text-lg font-semibold">‹</span>
//                 </button>
//                 <span className="text-xl font-semibold text-gray-900 min-w-[160px] text-center">
//                   {monthName} {year}
//                 </span>
//                 <button onClick={() => changeMonth(1)} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-colors duration-200">
//                   <span className="text-lg font-semibold">›</span>
//                 </button>
//               </div>
//             </div>

//             {/* WEEK HEADER */}
//             <div className="grid grid-cols-7 text-center bg-gray-100 py-4 font-semibold text-gray-700 rounded-t-xl border-b border-gray-200">
//               <div>MON</div>
//               <div>TUE</div>
//               <div>WED</div>
//               <div>THU</div>
//               <div>FRI</div>
//               <div>SAT</div>
//               <div className="text-red-600">SUN</div>
//             </div>

//           {/* MONTH VIEW */}
//           <div
//             className="grid grid-cols-7 border border-gray-200 select-none rounded-b-xl overflow-hidden bg-white"
//             onMouseUp={() => {
//               if (isDragging) {
//                 setIsDragging(false);
//                 const timeout = setTimeout(() => {
//                   setIsModalOpen(true);
//                 }, 300);
//                 setModalTimeout(timeout);
//               }
//             }}
//           >
//             {/* Empty cells for days before the 1st */}
//             {Array.from({ length: (new Date(year, month, 1).getDay() - 1 + 7) % 7 }, (_, i) => (
//               <div key={`empty-${i}`} className="min-h-[120px] border-r border-b border-gray-100 bg-gray-50"></div>
//             ))}
//             {daysInMonth.map((day) => {
//               const dateString = `${year}-${String(month + 1).padStart(
//                 2,
//                 "0"
//               )}-${String(day).padStart(2, "0")}`;
//               const isSunday = new Date(year, month, day).getDay() === 0;

//               return (
//              <div
//   key={day}
//  onMouseDown={() => {
//   // If clicking an already selected date → allow unselect
//   if (!isDragging && selectedDates.includes(dateString)) {
//     toggleSingleDate(dateString);
//     return;
//   }

//   setIsDragging(true);
//   setDragStartDate(dateString);
//   setSelectedDates([dateString]);
// }}

//   onMouseEnter={() => {
//     if (isDragging && dragStartDate) {
//       const startDay = Number(dragStartDate.split("-")[2]);
//       const newRange = createDateRange(startDay, day);
//       setSelectedDates(newRange);
//     }
//   }}
//   onMouseUp={() => {
//     setIsDragging(false);
//     const timeout = setTimeout(() => {
//       setIsModalOpen(true);
//     }, 300);
//     setModalTimeout(timeout);
//   }}
//   onDoubleClick={(e) => {
//     e.stopPropagation();
//     if (modalTimeout) {
//       clearTimeout(modalTimeout);
//       setModalTimeout(null);
//     }
//     handleDoubleClickDate(dateString);
//   }}
//   className={`min-h-[120px] p-3 cursor-pointer hover:bg-blue-50 flex flex-col justify-start border-r border-b border-gray-100 transition-colors duration-200 ${
//     selectedDates.includes(dateString)
//       ? "bg-blue-100 border-blue-300"
//       : "bg-white hover:bg-gray-50"
//   }`}
// >
//   <div className={`text-lg font-medium ${isSunday ? "text-red-600" : "text-gray-900"}`}>
//     {day}
//   </div>
// </div>

//               );
//             })}
//           </div>
//         </div>
//         </div>
//       </main>

//       {/* PRICING MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative border border-gray-200">
//             <button
//               className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200"
//               onClick={() => setIsModalOpen(false)}
//             >
//               <X className="w-5 h-5" />
//             </button>

//             {(() => {
//               const range = getFromToDates();
//               if (!range) return null;

//               return (
//                 <h2 className="text-lg font-semibold text-center mb-6 text-gray-900">
//                   Set Pricing from{" "}
//                   <span className="text-blue-600 font-medium">
//                     {formatDate(range.from)}
//                   </span>{" "}
//                   to{" "}
//                   <span className="text-blue-600 font-medium">
//                     {formatDate(range.to)}
//                   </span>
//                 </h2>
//               );
//             })()}

//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium mb-2 block text-gray-700">Select Category:</label>
//                 <div className="relative">
//                   <select className="w-full border border-gray-300 rounded-lg p-3 appearance-none bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200">
//                     <option>Select Type</option>
//                     <option>Strength Training</option>
//                     <option>Cardio</option>
//                     <option>Yoga</option>
//                     <option>Calisthenics</option>
//                     <option>Zumba</option>
//                     <option>Kick Boxing</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-gray-500" />
//                 </div>
//               </div>

//               {!showCustomPrice && (
//                 <div>
                  
//                   <label className="text-sm font-medium mb-2 block text-gray-700">Set Price:</label>
//                   <input
//                     type="text"
//                     className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
//                     placeholder="Enter your price"
//                     value={price}
//                     onChange={(e) => {
//                       let val = e.target.value.replace("₹", "");
//                       setPrice("₹" + val);
//                     }}
//                   />
//                 </div>
//               )}

//               <div>
//              <button
//   onClick={() => setShowCustomPrice(!showCustomPrice)}
//   className={`text-sm font-medium transition-colors duration-200 mb-2 ${
//     showCustomPrice
//       ? "text-gray-700"
//       : "text-blue-600 hover:text-blue-800"
//   }`}
// >
//   {showCustomPrice ? "Custom Price" : "Custom Price / time"}
// </button>




//                 {showCustomPrice && (
//                   <div className="space-y-3">
//                     <div className="relative w-full">
//   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//     ₹
//   </span>

//   <input
//     type="text"
//     className="w-full border border-gray-300 rounded-lg p-3 pl-8 bg-white 
//                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
//                transition-colors duration-200"
//     placeholder="Enter custom price"
//     value={customPrice}
//     onChange={(e) => setCustomPrice(e.target.value)}
//   />
// </div>


//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="text-sm font-medium mb-1 block text-gray-700">From Time</label>
//                        <input
//   type="time"
//   className="w-full border border-gray-300 rounded-lg p-3 bg-white 
//              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
//              transition-colors duration-200 cursor-pointer"
//   value={fromTime}
//   onChange={(e) => setFromTime(e.target.value)}
//   onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
// />


//                       </div>
//                       <div>
//                         <label className="text-sm font-medium mb-1 block text-gray-700">To Time</label>
//                         <input
//                           type="time"
//                           className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
//                           value={toTime}
//                           onChange={(e) => setToTime(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <button
//                 onClick={handleConfirmPricing}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
//               >
//                 Confirm New Pricing
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* SUCCESS MODAL */}
//       {isSuccessModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm text-center border border-gray-200">
//             <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
//             <h2 className="text-xl font-semibold mb-4 text-gray-900">
//               Pricing Added Successfully!
//             </h2>
//             <button
//               onClick={() => navigate("/services")}
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


//connected 
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { X, CheckCircle, ChevronDown } from "lucide-react";
import adminApi from "../api/adminApi"; // ✨ Import Admin API

export default function Pricing() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Data State
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState(""); // ✨ New State
  const [price, setPrice] = useState("₹"); // Standard price input
  
  // Custom Pricing State
  const [showCustomPrice, setShowCustomPrice] = useState(false);
  const [customPrice, setCustomPrice] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [loading, setLoading] = useState(false); // ✨ Loading State

  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartDate, setDragStartDate] = useState<string | null>(null);
  const [modalTimeout, setModalTimeout] = useState<NodeJS.Timeout | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const daysInMonth = Array.from(
    { length: getDaysInMonth(year, month) },
    (_, i) => i + 1
  );

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const createDateRange = (start: number, end: number) => {
    const range: string[] = [];
    const min = Math.min(start, end);
    const max = Math.max(start, end);

    for (let d = min; d <= max; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(d).padStart(2, "0")}`;
      range.push(dateStr);
    }
    return range;
  };

  const getFromToDates = () => {
    if (selectedDates.length === 0) return null;
    const sorted = [...selectedDates].sort();
    return {
      from: sorted[0],
      to: sorted[sorted.length - 1],
    };
  };

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}-${y}`;
  };

  // ✨ CONNECTED BACKEND LOGIC
  const handleConfirmPricing = async () => {
    // 1. Validation
    if (!selectedService || selectedService === "Select Type") {
      alert("Please select a service category.");
      return;
    }

    const range = getFromToDates();
    if (!range) return;

    // Decide which price to use (Custom Price field takes priority if shown)
    const finalPrice = showCustomPrice 
      ? customPrice 
      : price.replace("₹", "");

    if (!finalPrice) {
      alert("Please enter a price.");
      return;
    }

    setLoading(true);

    try {
      // 2. API Call
      await adminApi.post("/pricing/add", {
        service_name: selectedService,
        start_date: range.from,
        end_date: range.to,
        start_time: showCustomPrice ? fromTime : "", // Send empty string if not using time
        end_time: showCustomPrice ? toTime : "",
        custom_price: finalPrice
      });

      // 3. Success Handling
      setLoading(false);
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);

    } catch (error: any) {
      console.error("Pricing Error", error);
      alert(error.response?.data?.msg || "Failed to set pricing.");
      setLoading(false);
    }
  };

  const handleDoubleClickDate = (dateString: string) => {
    setSelectedDates((prev) =>
      prev.filter((date) => date !== dateString)
    );
  };

  const toggleSingleDate = (dateString: string) => {
    setSelectedDates((prev) =>
      prev.includes(dateString)
        ? prev.filter((d) => d !== dateString)
        : [...prev, dateString]
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 p-6">
        <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mt-6 mb-8 text-gray-900">Pricing Management</h1>

          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
            {/* TOP CONTROLS */}
            <div className="flex justify-between items-center mb-8">
              <span className="font-medium text-gray-700 text-lg">Choose Dates for Pricing</span>

              <div className="flex items-center gap-4">
                <button onClick={() => changeMonth(-1)} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                  <span className="text-lg font-semibold">‹</span>
                </button>
                <span className="text-xl font-semibold text-gray-900 min-w-[160px] text-center">
                  {monthName} {year}
                </span>
                <button onClick={() => changeMonth(1)} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                  <span className="text-lg font-semibold">›</span>
                </button>
              </div>
            </div>

            {/* WEEK HEADER */}
            <div className="grid grid-cols-7 text-center bg-gray-100 py-4 font-semibold text-gray-700 rounded-t-xl border-b border-gray-200">
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
              <div className="text-red-600">SUN</div>
            </div>

            {/* MONTH VIEW */}
            <div
              className="grid grid-cols-7 border border-gray-200 select-none rounded-b-xl overflow-hidden bg-white"
              onMouseUp={() => {
                if (isDragging) {
                  setIsDragging(false);
                  const timeout = setTimeout(() => {
                    setIsModalOpen(true);
                  }, 300);
                  setModalTimeout(timeout);
                }
              }}
            >
              {Array.from({ length: (new Date(year, month, 1).getDay() - 1 + 7) % 7 }, (_, i) => (
                <div key={`empty-${i}`} className="min-h-[120px] border-r border-b border-gray-100 bg-gray-50"></div>
              ))}
              {daysInMonth.map((day) => {
                const dateString = `${year}-${String(month + 1).padStart(
                  2,
                  "0"
                )}-${String(day).padStart(2, "0")}`;
                const isSunday = new Date(year, month, day).getDay() === 0;

                return (
                  <div
                    key={day}
                    onMouseDown={() => {
                      if (!isDragging && selectedDates.includes(dateString)) {
                        toggleSingleDate(dateString);
                        return;
                      }
                      setIsDragging(true);
                      setDragStartDate(dateString);
                      setSelectedDates([dateString]);
                    }}
                    onMouseEnter={() => {
                      if (isDragging && dragStartDate) {
                        const startDay = Number(dragStartDate.split("-")[2]);
                        const newRange = createDateRange(startDay, day);
                        setSelectedDates(newRange);
                      }
                    }}
                    onMouseUp={() => {
                      setIsDragging(false);
                      const timeout = setTimeout(() => {
                        setIsModalOpen(true);
                      }, 300);
                      setModalTimeout(timeout);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      if (modalTimeout) {
                        clearTimeout(modalTimeout);
                        setModalTimeout(null);
                      }
                      handleDoubleClickDate(dateString);
                    }}
                    className={`min-h-[120px] p-3 cursor-pointer hover:bg-blue-50 flex flex-col justify-start border-r border-b border-gray-100 transition-colors duration-200 ${
                      selectedDates.includes(dateString)
                        ? "bg-blue-100 border-blue-300"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className={`text-lg font-medium ${isSunday ? "text-red-600" : "text-gray-900"}`}>
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* PRICING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <button
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {(() => {
              const range = getFromToDates();
              if (!range) return null;

              return (
                <h2 className="text-lg font-semibold text-center mb-6 text-gray-900">
                  Set Pricing from{" "}
                  <span className="text-blue-600 font-medium">
                    {formatDate(range.from)}
                  </span>{" "}
                  to{" "}
                  <span className="text-blue-600 font-medium">
                    {formatDate(range.to)}
                  </span>
                </h2>
              );
            })()}

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700">Select Category:</label>
                <div className="relative">
                  {/* ✨ UPDATED: Value and OnChange */}
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 appearance-none bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option>Select Type</option>
                    <option>Strength Training</option>
                    <option>Cardio</option>
                    <option>Yoga & Meditation</option> {/* Updated Name to match services */}
                    <option>Calisthenics</option>
                    <option>Zumba</option>
                    <option>Kick Boxing</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-gray-500" />
                </div>
              </div>

              {!showCustomPrice && (
                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-700">Set Price:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                    placeholder="Enter your price"
                    value={price}
                    onChange={(e) => {
                      let val = e.target.value.replace("₹", "");
                      setPrice("₹" + val);
                    }}
                  />
                </div>
              )}

              <div>
                <button
                  onClick={() => setShowCustomPrice(!showCustomPrice)}
                  className={`text-sm font-medium transition-colors duration-200 mb-2 ${
                    showCustomPrice
                      ? "text-gray-700"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  {showCustomPrice ? "Custom Price" : "Custom Price / time"}
                </button>

                {showCustomPrice && (
                  <div className="space-y-3">
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 pl-8 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                        placeholder="Enter custom price"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block text-gray-700">From Time</label>
                        <input
                          type="time"
                          className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 cursor-pointer"
                          value={fromTime}
                          onChange={(e) => setFromTime(e.target.value)}
                          onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block text-gray-700">To Time</label>
                        <input
                          type="time"
                          className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                          value={toTime}
                          onChange={(e) => setToTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleConfirmPricing} // ✨ Connected Function
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Saving..." : "Confirm New Pricing"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm text-center border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Pricing Added Successfully!
            </h2>
            <button
              onClick={() => navigate("/services")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}