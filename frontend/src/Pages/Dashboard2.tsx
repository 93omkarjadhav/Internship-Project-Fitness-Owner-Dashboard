// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// export default function Dashboard() {
//   const [selectedMonth, setSelectedMonth] = useState("October");
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const navItems = [
//     { label: "Dashboard", icon: "/Dashboard.png", path: "/dashboard" },
//     { label: "Services", icon: "/Services.png", path: "/services" },
//     { label: "Inbox", icon: "/Inbox.png", path: "/inbox" },
//     { label: "Order Lists", icon: "/Order Lists.png", path: "/orders" },
//   ];

//   const pages = [
//     { label: "Pricing", icon: "/Pricing.png", path: "/pricing" },
//     { label: "Calendar", icon: "/Calender.png", path: "/calendar" },
//     { label: "Invoice", icon: "/Invoice.png", path: "/invoice" },
//     { label: "Team", icon: "/Team.png", path: "/team" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[rgb(246,248,251)]">
//       {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

//       <main className="flex-1 p-4">
//         <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

//         {/* DASHBOARD TITLE */}
//         <h1 className="text-2xl font-semibold mt-6">Revenue Analytics</h1>
//         {/* REVENUE CHART BOX */}
//         <div className="bg-white mt-4 p-6 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-center">
//             <h2 className="font-semibold">Revenue</h2>

//             <div className="relative inline-block">
//               <select
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//                 className="border border-[#D5D5D5] text-sm px-4 py-2 pr-10 rounded-md appearance-none text-[#2B3034] focus:outline-none focus:ring-0"
//               >
//                 {[
//                   "January",
//                   "February",
//                   "March",
//                   "April",
//                   "May",
//                   "June",
//                   "July",
//                   "August",
//                   "September",
//                   "October",
//                   "November",
//                   "December",
//                 ].map((month, index) => (
//                   <option key={index} value={month}>
//                     {month}
//                   </option>
//                 ))}
//               </select>

//               {/* DROPDOWN ICON 🡣 */}
//               <img
//                 src="/down.png"
//                 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
//                 alt="dropdown"
//               />
//             </div>
//           </div>

//           {/* CHART PLACEHOLDER */}
//           <div className="w-full h-[250px] bg-gray-100 rounded-lg mt-4 flex items-center justify-center">
//             <p className="text-gray-400">📈 Chart Area (Insert Chart Here)</p>
//           </div>
//         </div>
//         {/* BOTTOM CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           {/* CUSTOMERS */}
//           <div className="bg-white p-5 rounded-2xl shadow-sm">
//             <p className="font-semibold">Customers</p>
//             <div className="flex justify-between items-center mt-4">
//               <div>
//                 <p className="text-2xl font-bold">34,249</p>
//                 <p className="text-gray-500 text-xs">New Customers</p>
//               </div>
//               <div>
//                 <p className="text-xl font-bold">1420</p>
//                 <p className="text-gray-500 text-xs">Repeated</p>
//               </div>
//             </div>
//           </div>

//           {/* FEATURED SERVICE */}
//           <div className="bg-white p-5 rounded-2xl shadow-sm">
//             <p className="font-semibold">Featured Service</p>
//             <img src="/Image (4).png" className="w-full mt-4" />
//             <p className="text-center mt-2 font-medium">Strength Training</p>
//             <p className="text-center text-blue-500">₹89.00</p>
//           </div>

//           {/* SALES ANALYTICS */}
//           <div className="bg-white p-5 rounded-2xl shadow-sm">
//             <p className="font-semibold">Sales Analytics</p>
//             <div className="w-full h-[200px] bg-gray-100 rounded-lg mt-4 flex items-center justify-center">
//               <p className="text-gray-400">📊 Analytics Chart</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// Add these imports at the top
import adminApi from "../api/adminApi"; // ✨ Import Admin API
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,PieChart, Pie, Cell,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function Dashboard2() {
  const [selectedMonth, setSelectedMonth] = useState("October");
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ✨ State for API Data
  const [customers, setCustomers] = useState({ newCustomers: 0, repeatedCustomers: 0, total: 0 });
  const [featured, setFeatured] = useState({ name: "Loading...", revenue: 0, image: "" });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // 1. Fetch Customer Stats
    adminApi.get("/dashboard/customers")
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));

    // 2. Fetch Featured Service
    adminApi.get("/dashboard/featured-service")
      .then(res => setFeatured(res.data))
      .catch(err => console.error(err));

    // 3. Fetch Revenue Data for Charts
    adminApi.get("/dashboard/revenue-chart")
      .then(res => {
        setChartData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const navItems = [
    { label: "Dashboard", icon: "/Dashboard.png", path: "/dashboard" },
    { label: "Services", icon: "/Services.png", path: "/services" },
    { label: "Inbox", icon: "/Inbox.png", path: "/inbox" },
    { label: "Order Lists", icon: "/Order Lists.png", path: "/orders" },
  ];

  return (
    <div className="flex min-h-screen bg-[rgb(246,248,251)]">
      {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

      <main className="flex-1 p-4">
        <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        {/* DASHBOARD TITLE */}
        <h1 className="text-2xl font-semibold mt-6">Revenue Analytics</h1>
        
        {/* REVENUE CHART BOX (Area Chart) */}
        <div className="bg-white mt-4 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Revenue</h2>

            <div className="relative inline-block">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-[#D5D5D5] text-sm px-4 py-2 pr-10 rounded-md appearance-none text-[#2B3034] focus:outline-none focus:ring-0"
              >
                {[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <img src="/down.png" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" alt="dropdown" />
            </div>
          </div>

          {/* ✨ REAL CHART REPLACING PLACEHOLDER */}
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F99C86" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F99C86" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D0A6F9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D0A6F9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Sales" stroke="#F99C86" fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="Profit" stroke="#D0A6F9" fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTTOM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          
          {/* CUSTOMERS */}
          <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col justify-between">
  <div>
    <p className="font-semibold">Customers</p>
    <div className="w-full h-40 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[
              { name: "New", value: customers.newCustomers },
              { name: "Repeated", value: customers.repeatedCustomers }
            ]}
            innerRadius={40}
            outerRadius={60}
            dataKey="value"
          >
            <Cell fill="#E0E7FF" /> {/* Light Blue for New */}
            <Cell fill="#4880FF" /> {/*Blue for Repeated */}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
  
  <div className="flex justify-between items-center mt-4">
    <div>
      <p className="text-2xl font-bold">{customers.newCustomers}</p>
      <p className="text-gray-500 text-xs">New Customers</p>
    </div>
    <div>
      <p className="text-xl font-bold">{customers.repeatedCustomers}</p>
      <p className="text-blue-500 text-xs">Repeated</p>
    </div>
  </div>
</div>

          {/* FEATURED SERVICE */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <p className="font-semibold">Featured Service</p>
            <div className="flex flex-col items-center mt-4">
                <img 
                    src={featured.image || "/Image (4).png"} 
                    // 2. ✨ SAFETY NET: If it fails, switch to fallback instantly
          onError={(e) => {
            e.currentTarget.src = "/Image (4).png"; 
            e.currentTarget.onerror = null; // Prevent infinite loop
          }}
                    className="w-full h-40 object-cover rounded-xl" 
                    alt="Featured" 
                />
                <p className="text-center mt-4 font-medium text-lg">{featured.name}</p>
                <p className="text-center text-blue-500 font-bold">₹{featured.revenue}</p>
            </div>
          </div>

          {/* SALES ANALYTICS (Mini Line Chart) */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <p className="font-semibold mb-4">Sales Analytics</p>
            <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis dataKey="name" hide />
                        <Tooltip />
                        <Line type="monotone" dataKey="Sales" stroke="#00B69B" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="Profit" stroke="#3B82F6" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}