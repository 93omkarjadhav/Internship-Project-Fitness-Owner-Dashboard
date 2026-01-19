// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts";

// export default function Dashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [selectedMonth, setSelectedMonth] = useState("October");
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalOrders: 0,
//     totalSales: 0,
//     totalPending: 0,
//   });

//   const [salesGraph, setSalesGraph] = useState([]);

//   useEffect(() => {
//     // Dashboard cards
//     fetch("http://localhost:5000/api/dashboard/stats")
//       .then(res => res.json())
//       .then(data => setStats(data))
//       .catch(err => console.error(err));

//     // Sales Graph
//     fetch("http://localhost:5000/api/dashboard/sales-graph")
//       .then(res => res.json())
//       .then(data => {
//         const formatted = data.map(item => ({
//           day: item.day,
//           sales: item.total
//         }));
//         setSalesGraph(formatted);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const handleLogout = () => navigate("/");

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB]">

//       {/* SIDEBAR */}
//       {isSidebarOpen && (
//         <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
//       )}

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-4">
//         {/* HEADER */}
//         <Header toggleSidebar={toggleSidebar} />

//         {/* DASHBOARD CARDS */}
//         <div>
//           <h1 className="text-2xl font-semibold mt-6">Dashboard</h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
//             {[
//               { title: "Total User", value: stats.totalUsers, icon: "/Icon (4).png", sub: "8.5% Up from yesterday" },
//               { title: "Total Orders", value: stats.totalOrders, icon: "/Icon (1).png", sub: "1.3% Up from past week" },
//               { title: "Total Sales", value: `₹${stats.totalSales}`, icon: "/Icon (2).png", sub: "4.3% Down from yesterday" },
//               { title: "Total Pending", value: stats.totalPending, icon: "/Icon (3).png", sub: "1.8% Up from yesterday" },
//             ].map((card, i) => {
//               const [number, ...rest] = card.sub.split(" ");
//               const remainingText = rest.join(" ");
//               return (
//                 <div key={i} className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-center w-[240px]">
//                   <div>
//                     <div className="text-gray-500 text-sm">{card.title}</div>
//                     <div className="text-2xl font-semibold mt-1">{card.value}</div>

//                     <div className="text-xs mt-1 flex items-center gap-2">
//                       <img
//                         src={card.sub.includes("Down") ? "/green (2).png" : "/green (1).png"}
//                         className="w-4 h-4"
//                       />
//                       <span
//                         className={`font-semibold ${
//                           card.sub.includes("Down") ? "text-[#F93C65]" : "text-[#00B69B]"
//                         }`}
//                       >
//                         {number}
//                       </span>
//                       <span className="text-gray-400 text-[12px]">{remainingText}</span>
//                     </div>
//                   </div>
//                   <img src={card.icon} className="w-10 h-10" />
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* SALES DETAILS */}
//         <div className="bg-white mt-8 p-6 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-semibold">Sales Details</h2>
//             <div className="relative">
//               <select
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//                 className="border border-[#D5D5D5] text-sm px-4 py-2 pr-10 rounded-md appearance-none text-[#2B3034]"
//               >
//                 {[
//                   "January","February","March","April","May","June",
//                   "July","August","September","October","November","December"
//                 ].map((month, index) => (
//                   <option key={index} value={month}>{month}</option>
//                 ))}
//               </select>
//               <img src="/down.png" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
//             </div>
//           </div>

//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={salesGraph}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="sales"
//                 stroke="#3B82F6"
//                 strokeWidth={2}
//                 dot={{ r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* CONTINUE BUTTON */}
//         <div className="mt-8 flex items-center justify-center">
          
//           <button
//             onClick={() => navigate("/dashboarddetail")}
//             className="bg-blue-600  hover:bg-blue-700 text-white px-6 py-4 rounded-lg text-[20px]"
//           >
//             Explore  analytics. →
//           </button>
//         </div>
 

//         <div className="bg-white mt-8 p-6 rounded-2xl shadow-sm overflow-x-auto overflow-y-visible">
//   <div className="flex justify-between items-center mb-4 relative overflow-visible">
//     <h2 className="font-semibold">Deals Details</h2>

//     <div className="relative">
// <select
//   value={selectedMonth}
//   onChange={(e) => setSelectedMonth(e.target.value)}
//   className="border border-[#D5D5D5] text-sm px-4 py-2 pr-10 rounded-md appearance-none text-[#2B3034] focus:outline-none focus:ring-0"
// >
//   {[
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December"
//   ].map((month, index) => (
//     <option key={index} value={month}>{month}</option>
//   ))}
// </select>


//   <img
//     src="/down.png"
//     className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
//     alt="dropdown"
//   />
// </div>

//   </div>


//           <table className="w-full text-sm min-w-[800px]">
//             <thead className="bg-gray-100">
//               <tr className="text-left text-gray-500">
//                 <th className="p-3">Service Name</th>
//                 <th className="p-3">Location</th>
//                 <th className="p-3">Date - Time</th>
//                 <th className="p-3">S. ID</th>
//                 <th className="p-3">Amount</th>
//                 <th className="p-3">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b">
//                 <td className="p-3 flex items-center gap-2">
//                   <img src="/Image (2).png" className="w-6 h-6" /> Strength Training
//                 </td>
//                 <td className="p-3">Hinjewadi, Pune</td>
//                 <td className="p-3">12.09.2019 - 12.53 PM</td>
//                 <td className="p-3">001</td>
//                 <td className="p-3">₹200</td>
//                 <td className="p-3">
//                   <span className="bg-[#00B69B] text-[#FFFFFF] px-3 py-1 rounded-full text-xs">Completed</span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {/* MOBILE BOTTOM NAV */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 md:hidden">
//         {[
//           { icon: "/images/dashboard.png" },
//           { icon: "/images/services.png" },
//           { icon: "/images/inbox.png" },
//           { icon: "/images/orders.png" },
//         ].map((item, i) => (
//           <img key={i} src={item.icon} className="w-6 h-6" />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import adminApi from "../api/adminApi"; // ✨ Import Admin API
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

interface Order {
  id: number;
  service_name: string;
  location: string;
  order_date: string;
  amount: string;
  status: string;
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("October");
  const navigate = useNavigate();

  // ✨ State for Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalSales: 0,
    totalPending: 0,
  });

  // ✨ State for Chart
  const [salesGraph, setSalesGraph] = useState([]);

  // ✨ State for Table
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    // 1. Fetch Stats
    adminApi.get("/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Stats Error:", err));

    // 2. Fetch Chart Data
    adminApi.get("/dashboard/revenue-chart")
      .then(res => {
        const formatted = res.data.map((item: any) => ({
          day: item.name, // Matches XAxis dataKey
          sales: item.Sales
        }));
        setSalesGraph(formatted);
      })
      .catch(err => console.error("Chart Error:", err));

    // 3. Fetch Recent Orders
    adminApi.get("/dashboard/recent-orders")
      .then(res => setRecentOrders(res.data))
      .catch(err => console.error("Orders Error:", err));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed": return "bg-[#00B69B] text-white";
      case "Pending": return "bg-yellow-100 text-yellow-600";
      case "Processing": return "bg-purple-100 text-purple-600";
      case "Rejected": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FB]">

      {/* SIDEBAR */}
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4">
        {/* HEADER */}
        <Header toggleSidebar={toggleSidebar} />

        {/* DASHBOARD CARDS */}
        <div>
          <h1 className="text-2xl font-semibold mt-6">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[
              { title: "Total User", value: stats.totalUsers, icon: "/Icon (4).png", sub: "8.5% Up from yesterday" },
              { title: "Total Orders", value: stats.totalOrders, icon: "/Icon (1).png", sub: "1.3% Up from past week" },
              { title: "Total Sales", value: `₹${stats.totalSales}`, icon: "/Icon (2).png", sub: "4.3% Down from yesterday" },
              { title: "Total Pending", value: stats.totalPending, icon: "/Icon (3).png", sub: "1.8% Up from yesterday" },
            ].map((card, i) => {
              const [number, ...rest] = card.sub.split(" ");
              const remainingText = rest.join(" ");
              return (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-center w-full">
                  <div>
                    <div className="text-gray-500 text-sm">{card.title}</div>
                    <div className="text-2xl font-semibold mt-1">{card.value}</div>

                    <div className="text-xs mt-1 flex items-center gap-2">
                      <img
                        src={card.sub.includes("Down") ? "/green (2).png" : "/green (1).png"}
                        className="w-4 h-4"
                      />
                      <span
                        className={`font-semibold ${
                          card.sub.includes("Down") ? "text-[#F93C65]" : "text-[#00B69B]"
                        }`}
                      >
                        {number}
                      </span>
                      <span className="text-gray-400 text-[12px]">{remainingText}</span>
                    </div>
                  </div>
                  <img src={card.icon} className="w-10 h-10" />
                </div>
              );
            })}
          </div>
        </div>

        {/* SALES DETAILS CHART */}
        <div className="bg-white mt-8 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Sales Details</h2>
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-[#D5D5D5] text-sm px-4 py-2 pr-10 rounded-md appearance-none text-[#2B3034]"
              >
                {[
                  "January","February","March","April","May","June",
                  "July","August","September","October","November","December"
                ].map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
              <img src="/down.png" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesGraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* EXPLORE BUTTON */}
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={() => navigate("/dashboarddetail")}
            className="bg-blue-600  hover:bg-blue-700 text-white px-6 py-4 rounded-lg text-[20px]"
          >
            Explore analytics. →
          </button>
        </div>

        {/* DEALS DETAILS TABLE */}
        <div className="bg-white mt-8 p-6 rounded-2xl shadow-sm overflow-x-auto overflow-y-visible">
          <div className="flex justify-between items-center mb-4 relative overflow-visible">
            <h2 className="font-semibold">Deals Details</h2>
            {/* Table Dropdown */}
            <div className="relative">
                <select className="border border-[#D5D5D5] text-sm px-4 py-2 pr-10 rounded-md appearance-none text-[#2B3034] focus:outline-none focus:ring-0">
                <option>October</option>
                </select>
                <img src="/down.png" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" alt="dropdown"/>
            </div>
          </div>

          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-500">
                <th className="p-3">Service Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Date - Time</th>
                <th className="p-3">S. ID</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <img src="/Image (2).png" className="w-6 h-6" alt="icon" /> 
                      {order.service_name}
                    </td>
                    <td className="p-3">{order.location}</td>
                    <td className="p-3">{new Date(order.order_date).toLocaleString()}</td>
                    <td className="p-3">{String(order.id).padStart(3, '0')}</td>
                    <td className="p-3">₹{order.amount}</td>
                    <td className="p-3">
                      <span className={`${getStatusStyle(order.status)} px-3 py-1 rounded-full text-xs`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan={6} className="p-6 text-center text-gray-500">No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 md:hidden">
        {[
          { icon: "/images/dashboard.png" },
          { icon: "/images/services.png" },
          { icon: "/images/inbox.png" },
          { icon: "/images/orders.png" },
        ].map((item, i) => (
          <img key={i} src={item.icon} className="w-6 h-6" />
        ))}
      </div>
    </div>
  );
}