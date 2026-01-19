// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import {
//   EMAIL_FOLDERS,
//   EMAIL_LABELS,
//   INBOX_DATA,
// } from "../components/placeholders/inboxConstants";

// // --- ICONS ---
// const Icons = {
//   Compose: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>,
//   Inbox: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
//   Star: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
//   StarFilled: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFC107" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
//   Sent: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
//   Draft: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
//   Spam: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
//   Important: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
//   Bin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
//   Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
//   Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
//   Info: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
//   Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
// };

// // Helper to render icon by name
// const renderIcon = (name: string) => {
//   switch (name) {
//     case "Inbox": return <Icons.Inbox />;
//     case "Star": return <Icons.Star />;
//     case "Sent": return <Icons.Sent />;
//     case "Draft": return <Icons.Draft />;
//     case "Spam": return <Icons.Spam />;
//     case "Important": return <Icons.Important />;
//     case "Bin": return <Icons.Bin />;
//     default: return <Icons.Inbox />;
//   }
// };

// export default function Inbox() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   // Badge Styles
//   const getLabelStyle = (label: string) => {
//     switch (label) {
//       case "Primary": return "bg-[#E6F7F5] text-[#00B69B]";
//       case "Work": return "bg-[#FEF6E0] text-[#FF9F43]";
//       case "Friends": return "bg-[#F2E9FF] text-[#9747FF]";
//       case "Social": return "bg-[#EAF4FE] text-[#4B9CFC]";
//       default: return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB] overflow-hidden font-sans">
//       {/* --- INJECT STYLES FOR SCROLLBAR HIDING --- */}
//       <style>{`
//         /* Hide scrollbars globally for Chrome, Safari, and Opera */
//         ::-webkit-scrollbar {
//           width: 0px;
//           background: transparent;
//           display: none;
//         }
//         /* Hide scrollbars for Firefox, IE, and Edge */
//         * {
//           -ms-overflow-style: none;  /* IE and Edge */
//           scrollbar-width: none;  /* Firefox */
//         }
//       `}</style>

//       {/* --- APP SIDEBAR --- */}
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       {/* --- MAIN LAYOUT --- */}
//       <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
//         <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//         {/* Reduced top padding (p-4) to bring content higher up */}
//          <main className="flex-1 p-4 flex flex-col gap-4">
//           <h1 className="text-3xl font-bold text-[#202224] mt-6">Inbox</h1>

//           {/* --- INBOX CONTAINER --- */}
//           <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden min-h-0">
            
//             {/* 1. LEFT PANEL (Folders & Labels) */}
//             <div className="w-full lg:w-[260px] bg-white rounded-2xl shadow-sm flex flex-col flex-shrink-0 h-full overflow-y-auto">
//               <div className="p-6">
//                 <button className="w-full bg-[#4880FF] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-blue-200 shadow-md">
//                   <Icons.Plus />
//                   Compose
//                 </button>
//               </div>

//               {/* My Email Section */}
//               <div className="px-4">
//                 <h3 className="text-sm font-bold text-[#202224] mb-4 px-2">My Email</h3>
//                 <div className="space-y-1">
//                   {EMAIL_FOLDERS.map((folder) => (
//                     <div
//                       key={folder.id}
//                       className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
//                         folder.isActive
//                           ? "bg-[#E0EBFF] text-[#4880FF]"
//                           : "text-gray-500 hover:bg-gray-50"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className={folder.isActive ? "text-[#4880FF]" : "text-gray-400"}>
//                           {renderIcon(folder.icon)}
//                         </span>
//                         <span className="text-sm font-medium">{folder.label}</span>
//                       </div>
//                       <span className={`text-xs font-semibold ${folder.isActive ? "text-[#4880FF]" : "text-gray-400"}`}>
//                         {folder.count}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Label Section */}
//               <div className="px-4 mt-8 mb-6">
//                 <h3 className="text-sm font-bold text-[#202224] mb-4 px-2">Label</h3>
//                 <div className="space-y-1">
//                   {EMAIL_LABELS.map((label) => (
//                     <div key={label.id} className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-500">
//                       <div
//                         className="w-3 h-3 rounded-md border-2"
//                         style={{ borderColor: label.color }}
//                       ></div>
//                       <span className="text-sm font-medium">{label.label}</span>
//                     </div>
//                   ))}
//                   <div className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-400 mt-2">
//                      <Icons.Plus />
//                      <span className="text-sm font-medium">Create New Label</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 2. RIGHT PANEL (Email List) */}
//             <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
              
//               {/* Toolbar */}
//               <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
//                 <div className="relative w-full sm:w-[350px]">
//                   <input 
//                     type="text" 
//                     placeholder="Search mail" 
//                     className="w-full pl-10 pr-4 py-2.5 bg-[#F5F6FA] rounded-full text-sm outline-none focus:ring-1 focus:ring-blue-100"
//                   />
//                   <div className="absolute left-3.5 top-2.5">
//                     <Icons.Search />
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-blue-500 transition-colors">
//                     <Icons.Download />
//                   </button>
//                   <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-blue-500 transition-colors">
//                     <Icons.Info />
//                   </button>
//                   <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors">
//                     <Icons.Bin />
//                   </button>
//                 </div>
//               </div>

//               {/* Email List */}
//               <div className="flex-1 overflow-y-auto">
//                 <table className="w-full min-w-[700px]">
//                   <tbody>
//                     {INBOX_DATA.map((email) => (
//                       <tr 
//                         key={email.id} 
//                         className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group"
//                       >
//                         <td className="pl-6 py-3 w-12 align-middle">
//                           <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
//                         </td>
//                         <td className="py-3 w-10 align-middle">
//                           <button className="hover:scale-110 transition-transform flex items-center">
//                             {email.isStarred ? <Icons.StarFilled /> : <Icons.Star />}
//                           </button>
//                         </td>
                        
//                         <td className={`py-3 w-[180px] text-sm align-middle ${email.read ? "text-[#202224] font-semibold" : "text-black font-bold"}`}>
//                           {email.sender}
//                         </td>

//                         <td className="py-3 w-[100px] align-middle">
//                           {email.label && (
//                             <span className={`px-3 py-1 rounded text-xs font-bold inline-block text-center ${getLabelStyle(email.label)}`}>
//                               {email.label}
//                             </span>
//                           )}
//                         </td>

//                         <td className="py-3 text-sm text-gray-600 truncate max-w-[300px] lg:max-w-none align-middle">
//                           {email.subject}
//                         </td>

//                         <td className="pr-6 py-3 text-right text-sm font-medium text-gray-500 align-middle">
//                           {email.time}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               <div className="p-4 border-t border-gray-100 flex items-center justify-between">
//                  <span className="text-sm text-gray-500">Showing 1-12 of 1,253</span>
//                  <div className="flex items-center gap-2">
//                     <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-500">
//                       <span className="text-xs">❮</span>
//                     </button>
//                     <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-500">
//                       <span className="text-xs">❯</span>
//                     </button>
//                  </div>
//               </div>

//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

//22222222222222222222222222222222222222
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// // --- TYPES (Matching the Gmail API response from your Backend) ---
// interface Message {
//   id: string;
//   sender_name: string;
//   subject: string;
//   content: string; // The snippet/preview
//   label: "Primary" | "Social" | "Work" | "Friends"; // For the colored badge
//   category: "Inbox" | "Sent" | "Draft" | "Spam" | "Starred";
//   is_read: boolean;
//   is_starred: number; // 1 = Starred, 0 = Not Starred
//   received_at: string;
// }

// // --- ICONS (Kept exactly as per your design) ---
// const Icons = {
//   Compose: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>,
//   Inbox: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
//   Star: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
//   StarFilled: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFC107" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
//   Sent: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
//   Draft: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
//   Spam: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
//   Important: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
//   Bin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
//   Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
//   Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
//   Info: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
//   Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
// };

// const EMAIL_LABELS = [
//   { id: "primary", label: "Primary", color: "#00B69B" },
//   { id: "social", label: "Social", color: "#4B9CFC" },
//   { id: "work", label: "Work", color: "#FF9F43" },
//   { id: "friends", label: "Friends", color: "#9747FF" },
// ];

// export default function Inbox() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
//   // --- DYNAMIC STATE ---
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [activeCategory, setActiveCategory] = useState("Inbox"); // Default View
//   const [loading, setLoading] = useState(false);
//   const [needsLogin, setNeedsLogin] = useState(false); // Controls the "Sign in" view

//   // 1. Fetch Real Emails from Backend
//   useEffect(() => {
//     fetchGmailData();
//   }, [activeCategory]);

//   const fetchGmailData = async () => {
//     try {
//       setLoading(true);
//       // Fetch data based on selected category (Inbox, Starred, Sent, etc.)
//       const response = await axios.get(`http://localhost:5000/api/gmail/list?category=${activeCategory}`);
//       setMessages(response.data);
//       setNeedsLogin(false); // If successful, we are logged in
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         // Backend says "No Token" -> Show Login Button
//         setNeedsLogin(true);
//       } else {
//         console.error("Error fetching Gmail:", error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. Redirect User to Google Login Page
//   const connectGmail = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/gmail/auth-url');
//       window.location.href = res.data.url; // Allows Google to take over
//     } catch (error) {
//       console.error("Failed to get auth URL");
//     }
//   };

//   // 3. Handle Star Toggle (Real-time update)
//   const handleToggleStar = async (id: string, currentStatus: number, e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     // Optimistic UI Update (Update screen immediately)
//     setMessages((prev) => 
//       prev.map((msg) => msg.id === id ? { ...msg, is_starred: currentStatus ? 0 : 1 } : msg)
//     );

//     try {
//       await axios.put(`http://localhost:5000/api/gmail/star/${id}`);
//       // Success - Silent update
//     } catch (error) {
//       console.error("Failed to sync star with Google");
//       // Revert if failed (Optional)
//     }
//   };

//   // Helper for Badge Styles
//   const getLabelStyle = (label: string) => {
//     switch (label) {
//       case "Primary": return "bg-[#E6F7F5] text-[#00B69B]";
//       case "Work": return "bg-[#FEF6E0] text-[#FF9F43]";
//       case "Friends": return "bg-[#F2E9FF] text-[#9747FF]";
//       case "Social": return "bg-[#EAF4FE] text-[#4B9CFC]";
//       default: return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#F6F8FB] overflow-hidden font-sans">
//       <style>{`
//         ::-webkit-scrollbar { width: 0px; background: transparent; display: none; }
//         * { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       {/* --- APP SIDEBAR --- */}
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       {/* --- MAIN CONTENT --- */}
//       <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
//         <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//         <main className="flex-1 overflow-hidden p-4 flex flex-col gap-4">
//           <h1 className="text-3xl font-bold text-[#202224]">Inbox</h1>

//           <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden min-h-0">
            
//             {/* 1. LEFT PANEL (Navigation) */}
//             <div className="w-full lg:w-[260px] bg-white rounded-2xl shadow-sm flex flex-col flex-shrink-0 h-full overflow-y-auto">
//               <div className="p-6">
//                 <button className="w-full bg-[#4880FF] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-blue-200 shadow-md">
//                   <Icons.Plus />
//                   Compose
//                 </button>
//               </div>

//               <div className="px-4">
//                 <h3 className="text-sm font-bold text-[#202224] mb-4 px-2">My Email</h3>
//                 <div className="space-y-1">
//                   {[
//                     { id: "Inbox", icon: <Icons.Inbox /> },
//                     { id: "Starred", icon: <Icons.Star /> },
//                     { id: "Sent", icon: <Icons.Sent /> },
//                     { id: "Draft", icon: <Icons.Draft /> },
//                     { id: "Spam", icon: <Icons.Spam /> },
//                     { id: "Bin", icon: <Icons.Bin /> },
//                   ].map((folder) => (
//                     <div
//                       key={folder.id}
//                       onClick={() => setActiveCategory(folder.id)}
//                       className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
//                         activeCategory === folder.id
//                           ? "bg-[#E0EBFF] text-[#4880FF]"
//                           : "text-gray-500 hover:bg-gray-50"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className={activeCategory === folder.id ? "text-[#4880FF]" : "text-gray-400"}>
//                           {folder.icon}
//                         </span>
//                         <span className="text-sm font-medium">{folder.id}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Labels */}
//               <div className="px-4 mt-8 mb-6">
//                 <h3 className="text-sm font-bold text-[#202224] mb-4 px-2">Label</h3>
//                 <div className="space-y-1">
//                   {EMAIL_LABELS.map((label) => (
//                     <div key={label.id} className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-500">
//                       <div className="w-3 h-3 rounded-md border-2" style={{ borderColor: label.color }}></div>
//                       <span className="text-sm font-medium">{label.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* 2. RIGHT PANEL (Email List) */}
//             <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
              
//               {/* Toolbar */}
//               <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
//                 <div className="relative w-full sm:w-[350px]">
//                   <input type="text" placeholder="Search mail" className="w-full pl-10 pr-4 py-2.5 bg-[#F5F6FA] rounded-full text-sm outline-none focus:ring-1 focus:ring-blue-100" />
//                   <div className="absolute left-3.5 top-2.5"><Icons.Search /></div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><Icons.Download /></button>
//                   <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><Icons.Info /></button>
//                   <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-red-500"><Icons.Bin /></button>
//                 </div>
//               </div>

//               {/* DYNAMIC CONTENT AREA */}
//               <div className="flex-1 overflow-y-auto relative">
                
//                 {/* STATE A: Loading */}
//                 {loading && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
//                     <p className="text-blue-500 font-semibold animate-pulse">Fetching emails from Google...</p>
//                   </div>
//                 )}

//                 {/* STATE B: Needs Login */}
//                 {needsLogin && !loading ? (
//                    <div className="flex flex-col items-center justify-center h-full space-y-4">
//                      <div className="bg-blue-50 p-6 rounded-full">
//                        <Icons.Inbox /> 
//                      </div>
//                      <h2 className="text-xl font-bold text-gray-800">Connect your Gmail</h2>
//                      <p className="text-gray-500 max-w-md text-center">To see your real emails here, you need to authorize FitFare to access your Gmail account.</p>
//                      <button 
//                        onClick={connectGmail}
//                        className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-bold flex items-center gap-3 shadow-sm transition-all transform hover:scale-105"
//                      >
//                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-5 h-5" alt="Google" />
//                        Sign in with Google
//                      </button>
//                    </div>
//                 ) : (
                  
//                   /* STATE C: Email List */
//                   <table className="w-full min-w-[700px]">
//                     <tbody>
//                       {messages.length === 0 && !loading ? (
//                         <tr><td colSpan={6} className="text-center py-10 text-gray-400">No emails found in {activeCategory}</td></tr>
//                       ) : (
//                         messages.map((email) => (
//                           <tr 
//                             key={email.id} 
//                             className={`border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group ${!email.is_read ? 'bg-blue-50/30' : ''}`}
//                           >
//                             <td className="pl-6 py-3 w-12 align-middle">
//                               <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
//                             </td>
//                             <td className="py-3 w-10 align-middle">
//                               <button 
//                                 onClick={(e) => handleToggleStar(email.id, email.is_starred, e)}
//                                 className="hover:scale-110 transition-transform flex items-center"
//                               >
//                                 {email.is_starred ? <Icons.StarFilled /> : <Icons.Star />}
//                               </button>
//                             </td>
                            
//                             <td className={`py-3 w-[180px] text-sm align-middle ${!email.is_read ? "text-[#202224] font-bold" : "text-gray-900 font-medium"}`}>
//                               {email.sender_name}
//                             </td>

//                             <td className="py-3 w-[100px] align-middle">
//                               <span className={`px-3 py-1 rounded text-xs font-bold inline-block text-center ${getLabelStyle(email.label)}`}>
//                                 {email.label}
//                               </span>
//                             </td>

//                             <td className="py-3 text-sm text-gray-600 max-w-[300px] truncate align-middle">
//                               <span className={!email.is_read ? "font-semibold text-gray-900" : ""}>
//                                 {email.subject}
//                               </span>
//                               <span className="text-gray-400 ml-2 font-normal">
//                                 - {email.content.substring(0, 40)}...
//                               </span>
//                             </td>

//                             <td className="pr-6 py-3 text-right text-sm font-medium text-gray-500 align-middle">
//                               {/* Using moment for nice formatting like "8:30 AM" or "Dec 5" */}
//                               {moment(email.received_at).format('MMM D, h:mm A')}
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 )}
//               </div>

//               {/* Pagination */}
//               <div className="p-4 border-t border-gray-100 flex items-center justify-between">
//                 <span className="text-sm text-gray-500">
//                   {messages.length > 0 ? `Showing 1-${messages.length} emails` : 'No emails to show'}
//                 </span>
//                 <div className="flex items-center gap-2">
//                   <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-500"><span className="text-xs">❮</span></button>
//                   <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-500"><span className="text-xs">❯</span></button>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

//3333333333333333333

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// // --- TYPES ---
// interface Message {
//   id: string;
//   sender_name: string;
//   subject: string;
//   content: string;
//   label: "Primary" | "Social" | "Work" | "Friends";
//   category: "Inbox" | "Sent" | "Draft" | "Spam" | "Starred";
//   is_read: boolean;
//   is_starred: number;
//   received_at: string;
// }

// // --- ICONS (Now includes Close) ---
// const Icons = {
//   Compose: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>,
//   Inbox: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
//   Star: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
//   StarFilled: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFC107" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
//   Sent: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
//   Draft: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
//   Spam: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
//   Important: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
//   Bin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
//   Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
//   Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
//   Info: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
//   Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
//   Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
// };

// const EMAIL_LABELS = [
//   { id: "primary", label: "Primary", color: "#00B69B" },
//   { id: "social", label: "Social", color: "#4B9CFC" },
//   { id: "work", label: "Work", color: "#FF9F43" },
//   { id: "friends", label: "Friends", color: "#9747FF" },
// ];

// export default function Inbox() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
//   // --- STATE ---
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [activeCategory, setActiveCategory] = useState("Inbox");
//   const [loading, setLoading] = useState(false);
//   const [needsLogin, setNeedsLogin] = useState(false);

//   // --- COMPOSE STATE ---
//   const [isComposeOpen, setIsComposeOpen] = useState(false);
//   const [composeData, setComposeData] = useState({ to: '', subject: '', message: '' });
//   const [sending, setSending] = useState(false);

//   // Fetch Logic
//   useEffect(() => {
//     fetchGmailData();
//   }, [activeCategory]);

//   const fetchGmailData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:5000/api/gmail/list?category=${activeCategory}`);
//       setMessages(response.data);
//       setNeedsLogin(false);
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         setNeedsLogin(true);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const connectGmail = async () => {
//     const res = await axios.get('http://localhost:5000/api/gmail/auth-url');
//     window.location.href = res.data.url;
//   };

//   const handleToggleStar = async (id: string, currentStatus: number, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setMessages((prev) => 
//       prev.map((msg) => msg.id === id ? { ...msg, is_starred: currentStatus ? 0 : 1 } : msg)
//     );
//     try {
//       await axios.put(`http://localhost:5000/api/gmail/star/${id}`);
//     } catch (error) {
//       console.error("Failed to sync star");
//     }
//   };

//   // --- SEND EMAIL FUNCTION ---
//   const handleSendEmail = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSending(true);
//     try {
//       await axios.post('http://localhost:5000/api/gmail/send', composeData);
//       alert('Email Sent Successfully!');
//       setIsComposeOpen(false); // Close modal
//       setComposeData({ to: '', subject: '', message: '' }); // Reset form
//       fetchGmailData(); // Refresh list to show in "Sent" if applicable
//     } catch (error) {
//       alert('Failed to send email. Make sure you are logged in.');
//     } finally {
//       setSending(false);
//     }
//   };

//   const getLabelStyle = (label: string) => {
//     switch (label) {
//       case "Primary": return "bg-[#E6F7F5] text-[#00B69B]";
//       case "Work": return "bg-[#FEF6E0] text-[#FF9F43]";
//       case "Friends": return "bg-[#F2E9FF] text-[#9747FF]";
//       case "Social": return "bg-[#EAF4FE] text-[#4B9CFC]";
//       default: return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#F6F8FB] overflow-hidden font-sans relative">
    
//       <style>{`
//         ::-webkit-scrollbar { width: 0px; background: transparent; display: none; }
//         * { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       {/* --- SIDEBAR & HEADER --- */}
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
//       <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
//         <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//         <main className="flex-1 overflow-hidden p-4 flex flex-col gap-4">
//           <h1 className="text-3xl font-bold text-[#202224]">Inbox</h1>

//           <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden min-h-0">
//             {/* LEFT PANEL */}
//             <div className="w-full lg:w-[260px] bg-white rounded-2xl shadow-sm flex flex-col flex-shrink-0 h-full overflow-y-auto">
//               <div className="p-6">
//                 <button 
//                   onClick={() => setIsComposeOpen(true)}
//                   className="w-full bg-[#4880FF] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-blue-200 shadow-md"
//                 >
//                   <Icons.Plus /> Compose
//                 </button>
//               </div>
//               <div className="px-4">
//                 <h3 className="text-sm font-bold text-[#202224] mb-4 px-2">My Email</h3>
//                 <div className="space-y-1">
//                   {[
//                     { id: "Inbox", icon: <Icons.Inbox /> },
//                     { id: "Starred", icon: <Icons.Star /> },
//                     { id: "Sent", icon: <Icons.Sent /> },
//                     { id: "Draft", icon: <Icons.Draft /> },
//                     { id: "Spam", icon: <Icons.Spam /> },
//                     { id: "Bin", icon: <Icons.Bin /> },
//                   ].map((folder) => (
//                     <div
//                       key={folder.id}
//                       onClick={() => setActiveCategory(folder.id)}
//                       className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
//                         activeCategory === folder.id ? "bg-[#E0EBFF] text-[#4880FF]" : "text-gray-500 hover:bg-gray-50"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                          <span className={activeCategory === folder.id ? "text-[#4880FF]" : "text-gray-400"}>{folder.icon}</span>
//                          <span className="text-sm font-medium">{folder.id}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="px-4 mt-8 mb-6">
//                 <h3 className="text-sm font-bold text-[#202224] mb-4 px-2">Label</h3>
//                 <div className="space-y-1">
//                   {EMAIL_LABELS.map((label) => (
//                     <div key={label.id} className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-500">
//                       <div className="w-3 h-3 rounded-md border-2" style={{ borderColor: label.color }}></div>
//                       <span className="text-sm font-medium">{label.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT PANEL (Email List) */}
//             <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
//                {/* TOOLBAR */}
//                <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
//                 <div className="relative w-full sm:w-[350px]">
//                   <input type="text" placeholder="Search mail" className="w-full pl-10 pr-4 py-2.5 bg-[#F5F6FA] rounded-full text-sm outline-none focus:ring-1 focus:ring-blue-100" />
//                   <div className="absolute left-3.5 top-2.5"><Icons.Search /></div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><Icons.Download /></button>
//                   <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><Icons.Info /></button>
//                   <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-red-500"><Icons.Bin /></button>
//                 </div>
//               </div>
               
//                {/* EMAIL LIST */}
//                <div className="flex-1 overflow-y-auto relative">
//                 {loading && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
//                     <p className="text-blue-500 font-semibold animate-pulse">Fetching emails from Google...</p>
//                   </div>
//                 )}

//                 {needsLogin && !loading ? (
//                    <div className="flex flex-col items-center justify-center h-full space-y-4">
//                      <h2 className="text-xl font-bold text-gray-800">Connect your Gmail</h2>
//                      <button onClick={connectGmail} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-bold flex items-center gap-3 shadow-sm">
//                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-5 h-5" alt="Google" />
//                        Sign in with Google
//                      </button>
//                    </div>
//                 ) : (
//                   <table className="w-full min-w-[700px]">
//                     <tbody>
//                       {messages.map((email) => (
//                           <tr key={email.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group ${!email.is_read ? 'bg-blue-50/30' : ''}`}>
//                             <td className="pl-6 py-3 w-12 align-middle"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /></td>
//                             <td className="py-3 w-10 align-middle">
//                               <button onClick={(e) => handleToggleStar(email.id, email.is_starred, e)}>
//                                 {email.is_starred ? <Icons.StarFilled /> : <Icons.Star />}
//                               </button>
//                             </td>
//                             <td className="py-3 w-[180px] text-sm font-bold align-middle">{email.sender_name}</td>
//                             <td className="py-3 w-[100px] align-middle"><span className={`px-3 py-1 rounded text-xs font-bold inline-block text-center ${getLabelStyle(email.label)}`}>{email.label}</span></td>
//                             <td className="py-3 text-sm text-gray-600 max-w-[300px] truncate align-middle">
//                                <span className={!email.is_read ? "font-bold text-black" : ""}>{email.subject}</span> - {email.content.substring(0, 40)}...
//                             </td>
//                             <td className="pr-6 py-3 text-right text-sm font-medium text-gray-500 align-middle">
//                               {moment(email.received_at).format('MMM D, h:mm A')}
//                             </td>
//                           </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//                </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* --- COMPOSE MODAL --- */}
//       {isComposeOpen && (
//         <div className="absolute bottom-0 right-10 w-[500px] bg-white shadow-2xl rounded-t-lg z-50 flex flex-col border border-gray-200" style={{ height: '600px' }}>
          
//           {/* Modal Header */}
//           <div className="bg-[#202124] text-white px-4 py-3 rounded-t-lg flex justify-between items-center cursor-pointer">
//             <span className="font-medium text-sm">New Message</span>
//             <button onClick={() => setIsComposeOpen(false)} className="text-gray-400 hover:text-white">
//               <Icons.Close />
//             </button>
//           </div>

//           {/* Modal Body */}
//           <form onSubmit={handleSendEmail} className="flex-1 flex flex-col">
//             <input 
//               type="email" 
//               placeholder="Recipients" 
//               required
//               className="border-b border-gray-100 p-3 text-sm focus:outline-none"
//               value={composeData.to}
//               onChange={(e) => setComposeData({...composeData, to: e.target.value})}
//             />
//             <input 
//               type="text" 
//               placeholder="Subject" 
//               required
//               className="border-b border-gray-100 p-3 text-sm focus:outline-none"
//               value={composeData.subject}
//               onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
//             />
//             <textarea 
//               className="flex-1 p-3 text-sm focus:outline-none resize-none"
//               placeholder="Message body..."
//               value={composeData.message}
//               onChange={(e) => setComposeData({...composeData, message: e.target.value})}
//             ></textarea>

//             {/* Modal Footer */}
//             <div className="p-4 border-t border-gray-100 flex items-center justify-between">
//               <button 
//                 type="submit" 
//                 disabled={sending}
//                 className="bg-[#0B57D0] hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium text-sm transition-colors flex items-center gap-2"
//               >
//                 {sending ? 'Sending...' : 'Send'}
//               </button>
//               <button type="button" onClick={() => setIsComposeOpen(false)} className="text-gray-500 hover:bg-gray-100 p-2 rounded">
//                 <Icons.Bin />
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//     </div>
//   );
// }
//444-------------------------

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// --- TYPES ---
interface Message {
  id: string;
  sender_name: string;
  subject: string;
  content: string;
  label: "Primary" | "Social" | "Work" | "Friends";
  category: "Inbox" | "Sent" | "Draft" | "Spam" | "Starred";
  is_read: boolean;
  is_starred: number;
  received_at: string;
}

// --- ICONS ---
const Icons = {
  Compose: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>,
  Inbox: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Star: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  StarFilled: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFC107" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Sent: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
  Draft: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Spam: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
  Important: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  Bin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  Info: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Attach: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-45"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
};

const EMAIL_LABELS = [
  { id: "primary", label: "Primary", color: "#00B69B" },
  { id: "social", label: "Social", color: "#4B9CFC" },
  { id: "work", label: "Work", color: "#FF9F43" },
  { id: "friends", label: "Friends", color: "#9747FF" },
];

export default function Inbox() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // --- STATE ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeCategory, setActiveCategory] = useState("Inbox");
  const [loading, setLoading] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);

  // --- COMPOSE STATE ---
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({ to: '', subject: '', message: '' });
  const [attachments, setAttachments] = useState<File[]>([]); // New: Store files
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch Logic
  useEffect(() => {
    fetchGmailData();
  }, [activeCategory]);

  const fetchGmailData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/gmail/list?category=${activeCategory}`);
      setMessages(response.data);
      setNeedsLogin(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setNeedsLogin(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const connectGmail = async () => {
    const res = await axios.get('http://localhost:5000/api/gmail/auth-url');
    window.location.href = res.data.url;
  };

  const handleToggleStar = async (id: string, currentStatus: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages((prev) => 
      prev.map((msg) => msg.id === id ? { ...msg, is_starred: currentStatus ? 0 : 1 } : msg)
    );
    try {
      await axios.put(`http://localhost:5000/api/gmail/star/${id}`);
    } catch (error) {
      console.error("Failed to sync star");
    }
  };

  // --- HANDLE ATTACHMENT ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachments([...attachments, e.target.files[0]]);
    }
  };

  // --- SEND EMAIL (With Rich Text & Attachments) ---
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // We must convert files to Base64 to send via JSON (Simpler for this setup)
      const processedAttachments = await Promise.all(attachments.map(async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve({
            filename: file.name,
            content: (reader.result as string).split(',')[1], // Get only base64 data
            contentType: file.type
          });
        });
      }));

      const payload = {
        to: composeData.to,
        subject: composeData.subject,
        message: composeData.message, // This is now HTML from ReactQuill
        attachments: processedAttachments
      };

      await axios.post('http://localhost:5000/api/gmail/send', payload);
      
      alert('Email Sent Successfully!');
      setIsComposeOpen(false);
      setComposeData({ to: '', subject: '', message: '' });
      setAttachments([]);
      fetchGmailData();
    } catch (error) {
      alert('Failed to send email. Check console.');
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const getLabelStyle = (label: string) => {
    switch (label) {
      case "Primary": return "bg-[#E6F7F5] text-[#00B69B]";
      case "Work": return "bg-[#FEF6E0] text-[#FF9F43]";
      case "Friends": return "bg-[#F2E9FF] text-[#9747FF]";
      case "Social": return "bg-[#EAF4FE] text-[#4B9CFC]";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex h-screen bg-[#F6F8FB] overflow-hidden font-sans relative">
      <style>{`
        ::-webkit-scrollbar { width: 0px; background: transparent; display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
        .ql-container { border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem; font-family: inherit; }
        .ql-toolbar { border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; }
        .ql-editor { min-height: 200px; }
      `}</style>

      {/* --- SIDEBAR & HEADER --- */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-hidden p-4 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-[#202224]">Inbox</h1>

          <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden min-h-0">
            {/* LEFT PANEL */}
            <div className="w-full lg:w-[260px] bg-white rounded-2xl shadow-sm flex flex-col flex-shrink-0 h-full overflow-y-auto">
              <div className="p-6">
                <button 
                  onClick={() => setIsComposeOpen(true)}
                  className="w-full bg-[#4880FF] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-blue-200 shadow-md"
                >
                  <Icons.Plus /> Compose
                </button>
              </div>
              <div className="px-4">
                <h3 className="text-sm font-bold text-[#202224] mb-4 px-2">My Email</h3>
                <div className="space-y-1">
                  {[
                    { id: "Inbox", icon: <Icons.Inbox /> },
                    { id: "Starred", icon: <Icons.Star /> },
                    { id: "Sent", icon: <Icons.Sent /> },
                    { id: "Draft", icon: <Icons.Draft /> },
                    { id: "Spam", icon: <Icons.Spam /> },
                    { id: "Bin", icon: <Icons.Bin /> },
                  ].map((folder) => (
                    <div
                      key={folder.id}
                      onClick={() => setActiveCategory(folder.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                        activeCategory === folder.id ? "bg-[#E0EBFF] text-[#4880FF]" : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                         <span className={activeCategory === folder.id ? "text-[#4880FF]" : "text-gray-400"}>{folder.icon}</span>
                         <span className="text-sm font-medium">{folder.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="px-4 mt-8 mb-6">
                <h3 className="text-sm font-bold text-[#202224] mb-4 px-2">Label</h3>
                <div className="space-y-1">
                  {EMAIL_LABELS.map((label) => (
                    <div key={label.id} className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-500">
                      <div className="w-3 h-3 rounded-md border-2" style={{ borderColor: label.color }}></div>
                      <span className="text-sm font-medium">{label.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL (Email List) */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
               {/* TOOLBAR */}
               <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-[350px]">
                  <input type="text" placeholder="Search mail" className="w-full pl-10 pr-4 py-2.5 bg-[#F5F6FA] rounded-full text-sm outline-none focus:ring-1 focus:ring-blue-100" />
                  <div className="absolute left-3.5 top-2.5"><Icons.Search /></div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><Icons.Download /></button>
                  <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><Icons.Info /></button>
                  <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-red-500"><Icons.Bin /></button>
                </div>
              </div>
               
               {/* EMAIL LIST */}
               <div className="flex-1 overflow-y-auto relative">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                    <p className="text-blue-500 font-semibold animate-pulse">Fetching emails from Google...</p>
                  </div>
                )}

                {needsLogin && !loading ? (
                   <div className="flex flex-col items-center justify-center h-full space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">Connect your Gmail</h2>
                     <button onClick={connectGmail} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-bold flex items-center gap-3 shadow-sm">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-5 h-5" alt="Google" />
                       Sign in with Google
                     </button>
                   </div>
                ) : (
                  <table className="w-full min-w-[700px]">
                    <tbody>
                      {messages.map((email) => (
                          <tr key={email.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group ${!email.is_read ? 'bg-blue-50/30' : ''}`}>
                            <td className="pl-6 py-3 w-12 align-middle"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /></td>
                            <td className="py-3 w-10 align-middle">
                              <button onClick={(e) => handleToggleStar(email.id, email.is_starred, e)}>
                                {email.is_starred ? <Icons.StarFilled /> : <Icons.Star />}
                              </button>
                            </td>
                            <td className="py-3 w-[180px] text-sm font-bold align-middle">{email.sender_name}</td>
                            <td className="py-3 w-[100px] align-middle"><span className={`px-3 py-1 rounded text-xs font-bold inline-block text-center ${getLabelStyle(email.label)}`}>{email.label}</span></td>
                            <td className="py-3 text-sm text-gray-600 max-w-[300px] truncate align-middle">
                               <span className={!email.is_read ? "font-bold text-black" : ""}>{email.subject}</span> - {email.content.substring(0, 40)}...
                            </td>
                            <td className="pr-6 py-3 text-right text-sm font-medium text-gray-500 align-middle">
                              {moment(email.received_at).format('MMM D, h:mm A')}
                            </td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                )}
               </div>
            </div>
          </div>
        </main>
      </div>

      {/* --- COMPOSE MODAL (Updated) --- */}
      {isComposeOpen && (
        <div className="absolute bottom-0 right-10 w-[600px] bg-white shadow-2xl rounded-t-lg z-50 flex flex-col border border-gray-200" style={{ height: '700px' }}>
          
          {/* Header */}
          <div className="bg-[#202124] text-white px-4 py-3 rounded-t-lg flex justify-between items-center cursor-pointer">
            <span className="font-medium text-sm">New Message</span>
            <button onClick={() => setIsComposeOpen(false)} className="text-gray-400 hover:text-white">
              <Icons.Close />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSendEmail} className="flex-1 flex flex-col overflow-hidden">
            <input 
              type="email" 
              placeholder="Recipients" 
              required
              className="border-b border-gray-100 p-3 text-sm focus:outline-none"
              value={composeData.to}
              onChange={(e) => setComposeData({...composeData, to: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Subject" 
              required
              className="border-b border-gray-100 p-3 text-sm focus:outline-none"
              value={composeData.subject}
              onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
            />
            
            {/* RICH TEXT EDITOR */}
            <div className="flex-1 overflow-auto p-1">
              <ReactQuill 
                theme="snow"
                value={composeData.message} 
                onChange={(value) => setComposeData({...composeData, message: value})}
                placeholder="Message body..."
                className="h-[350px]"
              />
            </div>

            {/* ATTACHMENT PREVIEW */}
            {attachments.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 max-h-24 overflow-y-auto">
                <p className="text-xs font-bold text-gray-500 mb-1">Attachments:</p>
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-white border p-1 rounded mb-1">
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <button type="button" onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))} className="text-red-500 font-bold ml-2">×</button>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <button 
                  type="submit" 
                  disabled={sending}
                  className="bg-[#0B57D0] hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium text-sm transition-colors"
                >
                  {sending ? 'Sending...' : 'Send'}
                </button>
                
                {/* ATTACHMENT BUTTON */}
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-gray-500 hover:bg-gray-100 p-2 rounded transform transition-transform hover:scale-110">
                  <Icons.Attach />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  multiple 
                />
              </div>

              <button type="button" onClick={() => setIsComposeOpen(false)} className="text-gray-500 hover:bg-gray-100 p-2 rounded">
                <Icons.Bin />
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}