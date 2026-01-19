// import { useState, useRef, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { ORDER_DATA } from "../components/placeholders/constants";
// import CalendarFilter from "../components/CalendarFilter"; 
// import PriceFilter from "../components/PriceFilter"; 
// import StatusFilter from "../components/StatusFilter"; // Import Status Filter

// export default function Orders() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
//   // State for Popups
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showPriceFilter, setShowPriceFilter] = useState(false);
//   const [showStatusFilter, setShowStatusFilter] = useState(false); // New State
  
//   // Refs for click outside
//   const dateFilterRef = useRef<HTMLDivElement>(null);
//   const priceFilterRef = useRef<HTMLDivElement>(null);
//   const statusFilterRef = useRef<HTMLDivElement>(null); // New Ref

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       // Close Calendar
//       if (dateFilterRef.current && !dateFilterRef.current.contains(event.target as Node)) {
//         setShowCalendar(false);
//       }
//       // Close Price Filter
//       if (priceFilterRef.current && !priceFilterRef.current.contains(event.target as Node)) {
//         setShowPriceFilter(false);
//       }
//       // Close Status Filter
//       if (statusFilterRef.current && !statusFilterRef.current.contains(event.target as Node)) {
//         setShowStatusFilter(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const getStatusStyles = (status: string) => {
//     switch (status) {
//       case "Completed": return "bg-[#CCF0EB] text-[#00B69B]";
//       case "Processing": return "bg-[#E0D4FC] text-[#5A2CDE]";
//       case "Rejected": return "bg-[#FCD7D4] text-[#EF3826]";
//       case "On Hold": return "bg-[#FDEBD0] text-[#FF9F43]";
//       case "In Transit": return "bg-[#F4D3F7] text-[#DA48EA]";
//       default: return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB] font-sans overflow-hidden">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
//         <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//         <main className="flex-1 p-4 md:p-8">
//            <h1 className="text-2xl md:text-3xl font-bold text-[#202224] mt-6 mb-6">
//     Order Lists
//   </h1>

//           <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-6">
            
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center w-full xl:w-auto overflow-visible z-20">
//               <div className="flex items-center gap-3 px-5 py-3 border-r border-gray-100 w-full sm:w-auto bg-gray-50 sm:bg-white">
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
//                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
//                 </svg>
//                 <span className="font-semibold text-sm text-[#202224]">Filter By</span>
//               </div>

//               <div className="flex flex-wrap flex-1 items-center">
                
//                 {/* --- DATE FILTER --- */}
//                 <div 
//                   ref={dateFilterRef}
//                   className="relative px-5 py-3 border-r border-gray-100 flex items-center gap-2 md:gap-8 cursor-pointer hover:bg-gray-50 flex-1 min-w-[100px] justify-between group"
//                   onClick={() => setShowCalendar(!showCalendar)}
//                 >
//                   <span className={`text-sm font-semibold ${showCalendar ? "text-blue-600" : "text-[#202224]"}`}>Date</span>
//                   <img 
//                     src="/down.png" 
//                     className={`w-2.5 h-2.5 opacity-80 transition-transform ${showCalendar ? "rotate-180" : ""}`} 
//                     alt="chevron" 
//                   />
//                   {showCalendar && (
//                     <div className="absolute top-12 left-0 z-50" onClick={(e) => e.stopPropagation()}>
//                       <CalendarFilter onClose={() => setShowCalendar(false)} />
//                     </div>
//                   )}
//                 </div>

//                 {/* --- PRICE RANGE FILTER --- */}
//                 <div 
//                   ref={priceFilterRef}
//                   className="relative px-5 py-3 border-r border-gray-100 flex items-center gap-2 md:gap-8 cursor-pointer hover:bg-gray-50 flex-1 min-w-[130px] justify-between group"
//                   onClick={() => setShowPriceFilter(!showPriceFilter)}
//                 >
//                   <span className={`text-sm font-semibold ${showPriceFilter ? "text-blue-600" : "text-[#202224]"}`}>Price Range</span>
//                   <img 
//                     src="/down.png" 
//                     className={`w-2.5 h-2.5 opacity-80 transition-transform ${showPriceFilter ? "rotate-180" : ""}`} 
//                     alt="chevron" 
//                   />
//                   {showPriceFilter && (
//                     <div className="absolute top-12 left-0 z-50" onClick={(e) => e.stopPropagation()}>
//                       <PriceFilter onClose={() => setShowPriceFilter(false)} />
//                     </div>
//                   )}
//                 </div>
                
//                 {/* --- STATUS FILTER --- */}
//                 <div 
//                   ref={statusFilterRef}
//                   className="relative px-5 py-3 border-r border-gray-100 flex items-center gap-2 md:gap-8 cursor-pointer hover:bg-gray-50 flex-1 min-w-[130px] justify-between group"
//                   onClick={() => setShowStatusFilter(!showStatusFilter)}
//                 >
//                   <span className={`text-sm font-semibold ${showStatusFilter ? "text-blue-600" : "text-[#202224]"}`}>Order Status</span>
//                   <img 
//                     src="/down.png" 
//                     className={`w-2.5 h-2.5 opacity-80 transition-transform ${showStatusFilter ? "rotate-180" : ""}`} 
//                     alt="chevron" 
//                   />
//                    {/* STATUS POPUP */}
//                    {showStatusFilter && (
//                     <div className="absolute top-12 left-0 md:left-auto md:right-0 xl:left-0 z-50" onClick={(e) => e.stopPropagation()}>
//                       <StatusFilter onClose={() => setShowStatusFilter(false)} />
//                     </div>
//                   )}
//                 </div>
                
//                 {/* --- RESET --- */}
//                 <div className="px-5 py-3 flex items-center gap-2 cursor-pointer hover:bg-red-50 text-[#EA0234] flex-1 justify-center min-w-[120px]">
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
//                   </svg>
//                   <span className="text-sm font-semibold whitespace-nowrap">Reset Filter</span>
//                 </div>
//               </div>
//             </div>

//              <div className="text-left xl:text-right w-full xl:w-auto bg-white p-4 rounded-xl xl:bg-transparent xl:p-0 shadow-sm xl:shadow-none">
//                 <div className="text-sm text-gray-500 font-medium">Total <span className="text-blue-600 font-semibold">Monthly</span> Sales:</div>
//                 <div className="text-2xl font-bold text-[#202224] mt-1">₹ 4,40,530</div>
//              </div>
//           </div>

//           {/* TABLE */}
//           <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden mb-8">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[900px]">
//                 <thead className="bg-[#F8F9FA]">
//                   <tr className="text-left">
//                     {["ID", "NAME", "ADDRESS", "DATE", "PRICE (in ₹)", "STATUS"].map((h) => (
//                       <th key={h} className="py-4 px-6 text-xs font-bold text-[#202224] uppercase tracking-wider">{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {ORDER_DATA.map((order) => (
//                     <tr key={order.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="py-5 px-6 text-sm font-semibold text-[#202224]">{order.id}</td>
//                       <td className="py-5 px-6 text-sm font-medium text-[#202224]">{order.name}</td>
//                       <td className="py-5 px-6 text-sm text-[#202224]">{order.address}</td>
//                       <td className="py-5 px-6 text-sm text-[#202224]">{order.date}</td>
//                       <td className="py-5 px-6 text-sm font-semibold text-[#202224]">{order.price}</td>
//                       <td className="py-5 px-6">
//                         <span className={`px-4 py-1.5 rounded-md text-xs font-bold inline-block min-w-[90px] text-center ${getStatusStyles(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="bg-[#F8F9FA] px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 gap-4">
//               <div className="text-sm text-gray-500 font-medium">Showing 1-09 of 78</div>
//               <div className="flex items-center gap-2">
//                 <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
//                 </button>
//                 <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// Removed static data import
import CalendarFilter from "../components/CalendarFilter"; 
import PriceFilter from "../components/PriceFilter"; 
import StatusFilter from "../components/StatusFilter"; 
import adminApi from "../api/adminApi"; // ✨ Import Admin API

interface Order {
  id: number;
  name: string;
  address: string;
  date: string;
  price: string; // Backend sends decimal string
  status: string;
}

export default function Orders() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // --- ✨ NEW: Data State ---
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- ✨ NEW: Pagination State ---
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const limit = 9; // Items per page

  // --- ✨ NEW: Filter State ---
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{ min?: number, max?: number } | null>(null);

  // State for Popups (UI)
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  
  // Refs for click outside
  const dateFilterRef = useRef<HTMLDivElement>(null);
  const priceFilterRef = useRef<HTMLDivElement>(null);
  const statusFilterRef = useRef<HTMLDivElement>(null);

  // --- ✨ FETCH ORDERS FUNCTION ---
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params: any = {
        page,
        limit,
      };

      // Add filters if they exist
      if (filterDate) params.date = filterDate;
      if (filterStatus) params.status = filterStatus;
      if (priceRange?.min) params.minPrice = priceRange.min;
      if (priceRange?.max) params.maxPrice = priceRange.max;

      const response = await adminApi.get("/dashboard/orders", { params });
      
      setOrders(response.data.orders);
      setTotalOrders(response.data.total);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- ✨ Trigger Fetch when filters change ---
  useEffect(() => {
    fetchOrders();
  }, [page, filterDate, filterStatus, priceRange]);

  // Click Outside Logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateFilterRef.current && !dateFilterRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
      if (priceFilterRef.current && !priceFilterRef.current.contains(event.target as Node)) {
        setShowPriceFilter(false);
      }
      if (statusFilterRef.current && !statusFilterRef.current.contains(event.target as Node)) {
        setShowStatusFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Handlers for Filter Components ---
  // You need to pass these to your Filter Components as props
  const handleDateSelect = (date: string) => {
    setFilterDate(date); // Format should be YYYY-MM-DD
    setPage(1); // Reset to page 1
    setShowCalendar(false);
  };

  const handleStatusSelect = (status: string) => {
    setFilterStatus(status);
    setPage(1);
    setShowStatusFilter(false);
  };

  const handlePriceSelect = (min: number, max: number) => {
    setPriceRange({ min, max });
    setPage(1);
    setShowPriceFilter(false);
  };

  const handleResetFilters = () => {
    setFilterDate(null);
    setFilterStatus(null);
    setPriceRange(null);
    setPage(1);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed": return "bg-[#CCF0EB] text-[#00B69B]";
      case "Processing": return "bg-[#E0D4FC] text-[#5A2CDE]";
      case "Rejected": return "bg-[#FCD7D4] text-[#EF3826]";
      case "On Hold": return "bg-[#FDEBD0] text-[#FF9F43]";
      case "In Transit": return "bg-[#F4D3F7] text-[#DA48EA]";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FB] font-sans overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 p-4 md:p-8">
           <h1 className="text-2xl md:text-3xl font-bold text-[#202224] mt-6 mb-6">
             Order Lists
           </h1>

          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-6">
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center w-full xl:w-auto overflow-visible z-20">
              <div className="flex items-center gap-3 px-5 py-3 border-r border-gray-100 w-full sm:w-auto bg-gray-50 sm:bg-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                   <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <span className="font-semibold text-sm text-[#202224]">Filter By</span>
              </div>

              <div className="flex flex-wrap flex-1 items-center">
                
                {/* --- DATE FILTER --- */}
                <div 
                  ref={dateFilterRef}
                  className="relative px-5 py-3 border-r border-gray-100 flex items-center gap-2 md:gap-8 cursor-pointer hover:bg-gray-50 flex-1 min-w-[100px] justify-between group"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <span className={`text-sm font-semibold ${filterDate ? "text-blue-600" : "text-[#202224]"}`}>
                    {filterDate || "Date"}
                  </span>
                  <img 
                    src="/down.png" 
                    className={`w-2.5 h-2.5 opacity-80 transition-transform ${showCalendar ? "rotate-180" : ""}`} 
                    alt="chevron" 
                  />
                  {showCalendar && (
                    <div className="absolute top-12 left-0 z-50" onClick={(e) => e.stopPropagation()}>
                      {/* Pass handler to child: onClose={...} onSelect={handleDateSelect} */}
                      <CalendarFilter onClose={() => setShowCalendar(false)} />
                    </div>
                  )}
                </div>

                {/* --- PRICE RANGE FILTER --- */}
                <div 
                  ref={priceFilterRef}
                  className="relative px-5 py-3 border-r border-gray-100 flex items-center gap-2 md:gap-8 cursor-pointer hover:bg-gray-50 flex-1 min-w-[130px] justify-between group"
                  onClick={() => setShowPriceFilter(!showPriceFilter)}
                >
                  <span className={`text-sm font-semibold ${priceRange ? "text-blue-600" : "text-[#202224]"}`}>
                    Price Range
                  </span>
                  <img 
                    src="/down.png" 
                    className={`w-2.5 h-2.5 opacity-80 transition-transform ${showPriceFilter ? "rotate-180" : ""}`} 
                    alt="chevron" 
                  />
                  {showPriceFilter && (
                    <div className="absolute top-12 left-0 z-50" onClick={(e) => e.stopPropagation()}>
                      {/* Pass handler: onSelect={handlePriceSelect} */}
                      <PriceFilter onClose={() => setShowPriceFilter(false)} />
                    </div>
                  )}
                </div>
                
                {/* --- STATUS FILTER --- */}
                <div 
                  ref={statusFilterRef}
                  className="relative px-5 py-3 border-r border-gray-100 flex items-center gap-2 md:gap-8 cursor-pointer hover:bg-gray-50 flex-1 min-w-[130px] justify-between group"
                  onClick={() => setShowStatusFilter(!showStatusFilter)}
                >
                  <span className={`text-sm font-semibold ${filterStatus ? "text-blue-600" : "text-[#202224]"}`}>
                    {filterStatus || "Order Status"}
                  </span>
                  <img 
                    src="/down.png" 
                    className={`w-2.5 h-2.5 opacity-80 transition-transform ${showStatusFilter ? "rotate-180" : ""}`} 
                    alt="chevron" 
                  />
                   {showStatusFilter && (
                    <div className="absolute top-12 left-0 md:left-auto md:right-0 xl:left-0 z-50" onClick={(e) => e.stopPropagation()}>
                      {/* ✨ Pass the handler here */}
    <StatusFilter 
      onClose={() => setShowStatusFilter(false)} 
      onSelect={handleStatusSelect} 
    />
                    </div>
                  )}
                </div>
                
                {/* --- RESET --- */}
                <div 
                    onClick={handleResetFilters}
                    className="px-5 py-3 flex items-center gap-2 cursor-pointer hover:bg-red-50 text-[#EA0234] flex-1 justify-center min-w-[120px]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span className="text-sm font-semibold whitespace-nowrap">Reset Filter</span>
                </div>
              </div>
            </div>

             <div className="text-left xl:text-right w-full xl:w-auto bg-white p-4 rounded-xl xl:bg-transparent xl:p-0 shadow-sm xl:shadow-none">
                <div className="text-sm text-gray-500 font-medium">Total <span className="text-blue-600 font-semibold">Monthly</span> Sales:</div>
                {/* We can fetch this from the stats API if needed, for now showing hardcoded or total sales */}
                <div className="text-2xl font-bold text-[#202224] mt-1">₹ 4,40,530</div>
             </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-[#F8F9FA]">
                  <tr className="text-left">
                    {["ID", "NAME", "ADDRESS", "DATE", "PRICE (in ₹)", "STATUS"].map((h) => (
                      <th key={h} className="py-4 px-6 text-xs font-bold text-[#202224] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                      <tr><td colSpan={6} className="p-6 text-center text-gray-500">Loading orders...</td></tr>
                  ) : orders.length === 0 ? (
                      <tr><td colSpan={6} className="p-6 text-center text-gray-500">No orders found.</td></tr>
                  ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-5 px-6 text-sm font-semibold text-[#202224]">{String(order.id).padStart(5, '0')}</td>
                          <td className="py-5 px-6 text-sm font-medium text-[#202224]">{order.name}</td>
                          <td className="py-5 px-6 text-sm text-[#202224]">{order.address}</td>
                          <td className="py-5 px-6 text-sm text-[#202224]">
                              {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="py-5 px-6 text-sm font-semibold text-[#202224]">{order.price}</td>
                          <td className="py-5 px-6">
                            <span className={`px-4 py-1.5 rounded-md text-xs font-bold inline-block min-w-[90px] text-center ${getStatusStyles(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="bg-[#F8F9FA] px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 gap-4">
              <div className="text-sm text-gray-500 font-medium">
                  Showing {orders.length === 0 ? 0 : (page - 1) * limit + 1}-{Math.min(page * limit, totalOrders)} of {totalOrders}
              </div>
              <div className="flex items-center gap-2">
                <button 
                    disabled={page === 1}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-500 disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                </button>
                <button 
                    disabled={page === totalPages}
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-500 disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}