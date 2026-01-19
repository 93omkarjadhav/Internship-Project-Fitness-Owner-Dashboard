// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// interface InvoiceItem {
//   serialNo: number;
//   description: string;
//   quantity: number;
//   baseCost: number;
//   totalCost: number;
// }

// const Invoice = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const [invoiceItems] = useState<InvoiceItem[]>([
//     {
//       serialNo: 1,
//       description: "Children Toy",
//       quantity: 2,
//       baseCost: 20,
//       totalCost: 80,
//     },
//     {
//       serialNo: 2,
//       description: "Makeup",
//       quantity: 2,
//       baseCost: 50,
//       totalCost: 100,
//     },
//     {
//       serialNo: 3,
//       description: "Asus Laptop",
//       quantity: 5,
//       baseCost: 100,
//       totalCost: 500,
//     },
//     {
//       serialNo: 4,
//       description: "Iphone X",
//       quantity: 4,
//       baseCost: 1000,
//       totalCost: 4000,
//     },
//   ]);

//   const total = invoiceItems.reduce((sum, item) => sum + item.totalCost, 0);

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleSend = () => {
//     alert("Invoice sent successfully!");
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB]">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       {/* MAIN CONTENT START */}
//       <main className="flex-1 p-6">
//         <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

//         <h1 className="text-2xl font-semibold mt-6">Invoice</h1>

//         {/* ✅ INVOICE CARD (UPDATED) */}
//         <div className="bg-white rounded-2xl shadow-sm p-6">
//           {/* 📌 INVOICE DETAILS (Like Screenshot) */}
//           <div className="flex justify-between mb-6 ml-12">
//             <div>
//               <h2 className="text-lg font-regular">Invoice From :</h2>
//               <p className="text-black text-[18px] font-semibold mt-4">
//                 Virginia walker{" "}
//               </p>
//               <p className="text-gray-500 text-sm mt-1">
//                 9694 krajcik Locks Suite 635{" "}
//               </p>
//             </div>
//             <div>
//               <h2 className="text-lg font-regular">Invoice To:</h2>
//               <p className="text-black text-[18px] font-semibold mt-4">
//                 Austin Miller{" "}
//               </p>
//               <p className="text-gray-500 text-sm mt-1">Brookview </p>
//             </div>
//             <div className="text-right mt-12 font-normal mr-12">
//               <p className="text-gray-500 text-sm">Invoice Date :12 Nov 2019</p>
//               <p className="text-gray-500 text-sm mt-1">
//                 {" "}
//                 Due Date :25 Dec 2019
//               </p>
//             </div>
//           </div>

//           {/* 📌 TABLE – NO BORDER LINES */}
//           <table className="w-full text-sm mt-4">
//             <thead>
//               <tr className="bg-gray-100 font-regular text-gray-600">
//                 <th className="p-3 text-left">Serial No</th>
//                 <th className="p-3 text-left">Description</th>
//                 <th className="p-3 text-center">Qty</th>
//                 <th className="p-3 text-right">Base Cost</th>
//                 <th className="p-3 text-right">Total Cost</th>
//               </tr>
//             </thead>
//             <tbody>
//   {invoiceItems.map((item) => (
//     <tr
//       key={item.serialNo}
//       className="hover:bg-gray-50 transition border-b border-gray-200" 
//     >
//       <td className="p-3">{item.serialNo}</td>
//       <td className="p-3">{item.description}</td>
//       <td className="p-3 text-center">{item.quantity}</td>
//       <td className="p-3 text-right">₹{item.baseCost}</td>
//       <td className="p-3 text-right font-medium">₹{item.totalCost}</td>
//     </tr>
//   ))}
// </tbody>

//           </table>

//           {/* 📌 TOTAL – RIGHT END OF TABLE */}
//           <div className="mt-2 w-full text-right">
//             <h3 className="text-[18px] font-semibold">Total: ₹{total}</h3>

//             <div className="flex gap-4 mt-14 justify-end">
//               {/* Print Image Button */}
//               <button
//                 onClick={handlePrint}
//                 className="p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <img src="/print (1).png" alt="Print" className="w-5 h-5" />
//               </button>

//               {/* Send Image Button */}
//               <button
//                 onClick={handleSend}
//                 className="w-48 py-4 bg-[#4880FF] text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-5"
//               >
//                 Send
//                 <div className="w-12 h-9 bg-[#6E9AFF] flex items-center justify-center rounded ">
//                   <img src="/print (2).png" alt="Print" className="w-4 h-4" />
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Invoice;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import adminApi from "../api/adminApi"; // ✨ Import

interface InvoiceItem {
  serialNo: number; // We might need to map this from DB ID
  description: string;
  quantity: number;
  baseCost: number;
  totalCost: number;
}

const Invoice = () => {
  const navigate = useNavigate();
  // If you use routing like /invoice/:id, use useParams
  // For demo, we default to Order #1
  const orderId = 1; 

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [invoiceData, setInvoiceData] = useState<any>(null); // Store full response
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  useEffect(() => {
    adminApi.get(`/invoice/${orderId}`)
      .then(res => {
        setInvoiceData(res.data);
        // Map backend items to frontend interface
        const items = res.data.items.map((item: any, index: number) => ({
            serialNo: index + 1,
            description: item.description,
            quantity: item.quantity,
            baseCost: parseFloat(item.base_cost),
            totalCost: parseFloat(item.total_cost)
        }));
        setInvoiceItems(items);
      })
      .catch(err => console.error("Error fetching invoice", err));
  }, []);

  const total = invoiceItems.reduce((sum, item) => sum + item.totalCost, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
    adminApi.post(`/invoice/${orderId}/send`)
        .then(() => alert("Invoice sent successfully!"))
        .catch(() => alert("Failed to send invoice"));
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FB]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 p-6">
        <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <h1 className="text-2xl font-semibold mt-6">Invoice</h1>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between mb-6 ml-12">
            <div>
              <h2 className="text-lg font-regular">Invoice From :</h2>
              <p className="text-black text-[18px] font-semibold mt-4">
                {invoiceData?.from.name || "Loading..."}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {invoiceData?.from.address}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-regular">Invoice To:</h2>
              <p className="text-black text-[18px] font-semibold mt-4">
                {invoiceData?.to.name || "Loading..."}
              </p>
              <p className="text-gray-500 text-sm mt-1">{invoiceData?.to.address}</p>
            </div>
            <div className="text-right mt-12 font-normal mr-12">
              <p className="text-gray-500 text-sm">
                  Invoice Date : {invoiceData?.dates.invoiceDate ? new Date(invoiceData.dates.invoiceDate).toDateString() : ""}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Due Date : {invoiceData?.dates.dueDate ? new Date(invoiceData.dates.dueDate).toDateString() : ""}
              </p>
            </div>
          </div>

          <table className="w-full text-sm mt-4">
            <thead>
              <tr className="bg-gray-100 font-regular text-gray-600">
                <th className="p-3 text-left">Serial No</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Base Cost</th>
                <th className="p-3 text-right">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item) => (
                <tr key={item.serialNo} className="hover:bg-gray-50 transition border-b border-gray-200">
                  <td className="p-3">{item.serialNo}</td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">₹{item.baseCost}</td>
                  <td className="p-3 text-right font-medium">₹{item.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-2 w-full text-right">
            <h3 className="text-[18px] font-semibold">Total: ₹{total}</h3>
            {/* Buttons (Print/Send) unchanged... */}
             <div className="flex gap-4 mt-14 justify-end">
              <button onClick={handlePrint} className="p-2 rounded-lg hover:bg-gray-100">
                <img src="/print (1).png" alt="Print" className="w-5 h-5" />
              </button>
              <button onClick={handleSend} className="w-48 py-4 bg-[#4880FF] text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-5">
                Send
                <div className="w-12 h-9 bg-[#6E9AFF] flex items-center justify-center rounded ">
                  <img src="/print (2).png" alt="Print" className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Invoice;
