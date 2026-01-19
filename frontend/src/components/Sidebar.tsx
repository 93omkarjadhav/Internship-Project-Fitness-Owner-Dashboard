// import { useNavigate, useLocation } from "react-router-dom";

// interface SidebarProps {
//   isOpen: boolean;
//   setIsOpen: (value: boolean) => void;
// }

// export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✨ UPDATED LOGOUT LOGIC
//   const handleLogout = () => {
//     // 1. Confirm intention (Optional but recommended)
//     if (window.confirm("Are you sure you want to logout?")) {
      
//       // 2. Clear Admin Authentication Data
//       localStorage.removeItem("token");
//       localStorage.removeItem("admin");

//       // 3. Redirect to Login Page (Root)
//       navigate("/");
//     }
//   };

//  const menuItems = [
//   { label: "Dashboard", icon: "/Dashboard.png", grayIcon: "/d1.png", path: "/dashboard" },
//   { label: "Services", icon: "/Services.png", path: "/services" }, // stays white
//   { label: "Inbox", icon: "/Inbox.png", path: "/inbox" },
//   { label: "Order Lists", icon: "/Order Lists.png", path: "/orders" },
// ];

// const pageItems = [
//   { label: "Pricing", icon: "/Pricing.png", path: "/pricing" },
//   { label: "Invoice", icon: "/Invoice.png", path: "/invoice" },
//   { label: "Team", icon: "/Team.png", path: "/team" },
//   { label: "Settings", icon: "/settings.png", path: "/settings" }, 
//   { label: "Logout", icon: "/Logout.png", path: "/" }, 
// ];


//   return (
//     <>
//       {/* MOBILE OVERLAY */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
//           isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
//         }`}
//         onClick={() => setIsOpen(false)}
//       />

//       {/* SIDEBAR CONTAINER */}
//       <aside
//         className={`
//           min-h-full bg-white shadow-xl flex flex-col
//           fixed top-0 left-0 z-50 transition-all duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:relative md:translate-x-0
//           ${isOpen ? "md:w-[260px]" : "md:w-0 md:border-none"}
//           overflow-x-hidden
//         `}
//       >
//         {/* SCROLLABLE CONTENT */}
//         <div className="flex-1 overflow-y-auto overflow-x-hidden">
//           <div className="w-[260px] flex-shrink-0 overflow-x-hidden flex flex-col h-full">
//             <div className="flex-grow">
//             {/* LOGO */}
//             <div className="flex items-center gap-2 px-6 py-6">
//               <img src="/logo.jpeg" alt="FitFare" className="w-8 h-8" />
//               <span className="font-semibold text-lg">
//                 <span className="text-blue-600">F</span>
//                 <span className="text-black">it</span>
//                 <span className="text-blue-600">F</span>
//                 <span className="text-black">are</span>
//               </span>
//             </div>

//             {/* MAIN NAV */}
//             <nav className="px-4 space-y-2">
//               {menuItems.map((item, i) => {
//                 const isActive =
//                   location.pathname === item.path || location.pathname.startsWith(item.path + "/");
//                 return (
//                   <div
//                     key={i}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap transition-colors ${
//                       isActive
//                         ? "bg-blue-500 text-white"
//                         : "text-gray-600 hover:bg-blue-50"
//                     }`}
//                     onClick={() => {
//                       navigate(item.path);
//                       if (window.innerWidth < 768) setIsOpen(false);
//                     }}
//                   >
//                     <img
//   src={isActive ? item.icon : item.grayIcon || item.icon}
//   className="w-5 h-5"
//   alt={item.label}
// />

//                     <span className="text-sm font-medium">{item.label}</span>
//                   </div>
//                 );
//               })}
//             </nav>

//            <div className="mt-2 px-4 text-xs text-gray-400 whitespace-nowrap">PAGES</div>

//             <nav className="px-4 space-y-2 mt-2">
//               {pageItems.map((item, i) => {
//                 const isActive =
//                   location.pathname === item.path || location.pathname.startsWith(item.path + "/");
//                 return (
//                   <div
//                     key={i}
//                     onClick={() => {
//                       navigate(item.path);
//                       if (window.innerWidth < 768) setIsOpen(false);
//                     }}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap transition-colors ${
//                       isActive
//                         ? "bg-blue-500 text-white"
//                         : "text-gray-600 hover:bg-blue-50"
//                     }`}
//                   >
//                    <img
//   src={isActive ? item.icon : item.grayIcon || item.icon}
//   className="w-5 h-5"
//   alt={item.label}
// />

//                     <span className="text-sm">{item.label}</span>
//                   </div>
//                 );
//               })}
//             </nav>
//             </div>
//           </div>
//         </div>

      
//       </aside>
//     </>
//   );
// }

import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface MenuItem {
  label: string;
  icon: string;
  grayIcon?: string; // Optional because pageItems don't always have it
  path: string;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // ✨ UPDATED LOGOUT LOGIC
  const handleLogout = () => {
    // 1. Confirm intention
    if (window.confirm("Are you sure you want to logout?")) {
      
      // 2. Clear Admin Authentication Data
      localStorage.removeItem("token");
      localStorage.removeItem("admin");

      // 3. Redirect to Login Page (Root)
      navigate("/");
    }
  };

  const menuItems: MenuItem[] = [
    { label: "Dashboard", icon: "/Dashboard.png", grayIcon: "/d1.png", path: "/dashboard" },
    { label: "Services", icon: "/Services.png", path: "/services" },
    { label: "Inbox", icon: "/Inbox.png", path: "/inbox" },
    { label: "Order Lists", icon: "/Order Lists.png", path: "/orders" },
  ];

  const pageItems: MenuItem[] = [
    { label: "Pricing", icon: "/Pricing.png", path: "/pricing" },
    { label: "Invoice", icon: "/Invoice.png", path: "/invoice" },
    { label: "Team", icon: "/Team.png", path: "/team" },
    { label: "Settings", icon: "/settings.png", path: "/settings" }, 
    { label: "Logout", icon: "/Logout.png", path: "/" }, 
  ];

  // Helper to handle clicks (Navigation vs Logout)
  const handleItemClick = (item: MenuItem) => {
    if (item.label === "Logout") {
      handleLogout();
    } else {
      navigate(item.path);
    }
    // Close sidebar on mobile after clicking
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`
          min-h-full bg-white shadow-xl flex flex-col
          fixed top-0 left-0 z-50 transition-all duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
          ${isOpen ? "md:w-[260px]" : "md:w-0 md:border-none"}
          overflow-x-hidden
        `}
      >
        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-[260px] flex-shrink-0 overflow-x-hidden flex flex-col h-full">
            <div className="flex-grow">
              {/* LOGO */}
              <div className="flex items-center gap-2 px-6 py-6">
                <img src="/logo.jpeg" alt="FitFare" className="w-8 h-8" />
                <span className="font-semibold text-lg">
                  <span className="text-blue-600">F</span>
                  <span className="text-black">it</span>
                  <span className="text-blue-600">F</span>
                  <span className="text-black">are</span>
                </span>
              </div>

              {/* MAIN NAV */}
              <nav className="px-4 space-y-2">
                {menuItems.map((item, i) => {
                  const isActive =
                    location.pathname === item.path || location.pathname.startsWith(item.path + "/");
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-blue-50"
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <img
                        src={isActive ? item.icon : item.grayIcon || item.icon}
                        className="w-5 h-5"
                        alt={item.label}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </nav>

              <div className="mt-2 px-4 text-xs text-gray-400 whitespace-nowrap">PAGES</div>

              <nav className="px-4 space-y-2 mt-2">
                {pageItems.map((item, i) => {
                  // Don't highlight "Logout" as active, ever.
                  const isActive = item.label !== "Logout" && (
                    location.pathname === item.path || location.pathname.startsWith(item.path + "/")
                  );
                  return (
                    <div
                      key={i}
                      onClick={() => handleItemClick(item)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-blue-50"
                      }`}
                    >
                      <img
                        src={isActive ? item.icon : item.grayIcon || item.icon}
                        className="w-5 h-5"
                        alt={item.label}
                      />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}