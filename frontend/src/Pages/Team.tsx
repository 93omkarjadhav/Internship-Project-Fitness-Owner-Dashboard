// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// const teamMembers = [
//   { name: "Jason Price", role: "Admin", email: "janick_parisian@yahoo.com", image: "/Bitmap.png" },
//   { name: "Jukko Sisao", role: "CEO", email: "siby_kozey@gmail.com", image: "/Image (10).png" },
//   { name: "Harriet King", role: "CTO", email: "nadia.block@hotmail.com", image: "/Image (11).png" },
//   { name: "Lenora Benson", role: "Lead", email: "feil.walack@kunde.as", image: "/Image (12).png" },
//   // { name: "Olivia Reese", role: "Strategist", email: "kemmer.natite@termin.us", image: "/Image (16).png" },
//   // { name: "Bertha Valdez", role: "CEO", email: "loraine.xebing@trompia.lp", image: "/Image (15).png" },
//   // { name: "Harriett Payne", role: "Digital Marketer", email: "nannis.west@strelak.tv", image: "/Image (14).png" },
//   // { name: "George Bryant", role: "Social Media", email: "delmer.ling@gmail.com", image: "/Image (13).png" },
//   // { name: "Lily French", role: "Strategist", email: "lucienne.schaefer@hotmail.com", image: "/Image (19).png" },
//   // { name: "Howard Adkins", role: "CEO", email: "wiggald.jenrigh@herman.us", image: "/Image (17).png" },
//   // { name: "Earl Bowman", role: "Digital Marketer", email: "wayne.janis@kvinsted.dk", image: "/Image (14).png" },
//   // { name: "Patrick Padilla", role: "Social Media", email: "octavia.sienekreichter.net", image: "/Image (18).png" },
// ];

// const Team: React.FC = () => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB]">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       {/* MAIN CONTENT START */}
//       <main className="flex-1 p-6">
//         <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

// <div className="flex items-center justify-between mt-6">
//   <h1 className="text-2xl font-semibold">Team</h1>
//   <button
//     onClick={() => navigate("/addteam")}
//     className="px-4 py-3 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//   >
//     Add New Member
//   </button>
// </div>

//         {/* TEAM GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
//           {teamMembers.map((member, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm"
//             >
//               <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
//                 <img
//                   src={member.image}
//                   alt={member.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h3 className="font-semibold text-gray-800">{member.name}</h3>
//               <p className="text-sm text-gray-500">{member.role}</p>
//               <p className="text-xs text-gray-400 mt-1">{member.email}</p>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* MOBILE BOTTOM NAV */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 md:hidden">
//         {[{ icon: "/images/dashboard.png" }, { icon: "/images/services.png" }, { icon: "/images/inbox.png" }, { icon: "/images/orders.png" }].map((item, i) => (
//           <img key={i} src={item.icon} className="w-6 h-6" alt="nav-icon" />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Team;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import adminApi from "../api/adminApi"; // ✨ Import Admin API

interface TeamMember {
  id: number;
  full_name: string; // DB field
  email: string;
  role: string;
  position?: string;
  avatar_url?: string;
}

const Team: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [members, setMembers] = useState<TeamMember[]>([]); // ✨ Dynamic State
  const [loading, setLoading] = useState(true);

  // ✨ Fetch Team Members
  useEffect(() => {
    adminApi.get("/team")
      .then(res => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load team", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F6F8FB]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 p-6">
        <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <div className="flex items-center justify-between mt-6">
          <h1 className="text-2xl font-semibold">Team</h1>
          <button
            onClick={() => navigate("/addteam")}
            className="px-4 py-3 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Add New Member
          </button>
        </div>

        {/* TEAM GRID */}
        {loading ? (
            <p className="text-center mt-10 text-gray-500">Loading team members...</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {members.map((member) => (
                <div
                key={member.id}
                className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm"
                >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-100">
                    <img
                    src={member.avatar_url || "/Bitmap.png"} // Fallback image
                    alt={member.full_name}
                    className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="font-semibold text-gray-800">{member.full_name}</h3>
                <p className="text-sm text-gray-500">{member.position || member.role}</p>
                <p className="text-xs text-gray-400 mt-1">{member.email}</p>
                </div>
            ))}
            </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 md:hidden">
        {[{ icon: "/images/dashboard.png" }, { icon: "/images/services.png" }, { icon: "/images/inbox.png" }, { icon: "/images/orders.png" }].map((item, i) => (
          <img key={i} src={item.icon} className="w-6 h-6" alt="nav-icon" />
        ))}
      </div>
    </div>
  );
};

export default Team;