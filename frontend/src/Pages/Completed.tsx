// import React, { useState } from "react";
// import { CheckCircle, Shield, Mail, FileText, Users, Eye, User } from "lucide-react";

// interface KycRequest {
//   id: string;
//   name: string;
//   email: string;
//   submittedDate: string;
//   completedDate: string;
//   status: "completed";
// }

// const Completed: React.FC = () => {
//   const [requests, setRequests] = useState<KycRequest[]>([
//     {
//       id: "1",
//       name: "Alice Cooper",
//       email: "alice.cooper@example.com",
//       submittedDate: "2025-12-20",
//       completedDate: "2025-12-22",
//       status: "completed",
//     },
//     {
//       id: "2",
//       name: "Charlie Brown",
//       email: "charlie.brown@example.com",
//       submittedDate: "2025-12-21",
//       completedDate: "2025-12-23",
//       status: "completed",
//     },
//     {
//       id: "3",
//       name: "Diana Prince",
//       email: "diana.prince@example.com",
//       submittedDate: "2025-12-22",
//       completedDate: "2025-12-24",
//       status: "completed",
//     },
//   ]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl mb-6 shadow-2xl">
//             <CheckCircle className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
//             Completed KYC Verifications
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//             View successfully completed KYC verification requests
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//             <div className="p-8">
//               {requests.length === 0 ? (
//                 <div className="text-center py-12">
//                   <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                   <h2 className="text-2xl font-bold text-gray-900 mb-2">No Completed Requests</h2>
//                   <p className="text-gray-600">No KYC requests have been completed yet.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {requests.map((request) => (
//                     <div key={request.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
//                             <User className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <h3 className="text-lg font-bold text-gray-900">{request.name}</h3>
//                             <p className="text-gray-600">{request.email}</p>
//                             <p className="text-sm text-gray-500">Submitted: {request.submittedDate}</p>
//                             <p className="text-sm text-green-600 font-semibold">Completed: {request.completedDate}</p>
//                           </div>
//                         </div>
//                         <div className="flex space-x-3">
//                           <div className="flex items-center space-x-2 text-green-600">
//                             <CheckCircle className="w-5 h-5" />
//                             <span className="font-semibold">Verified</span>
//                           </div>
//                           <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
//                             <Eye className="w-4 h-4 inline mr-2" />
//                             View Details
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-12">
//           <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
//             <p className="text-gray-600 mb-2">Need assistance?</p>
//             <div className="flex items-center justify-center space-x-2 text-gray-700 font-medium">
//               <Mail className="w-5 h-5 text-blue-600" />
//               <span>Contact support at</span>
//               <a href="mailto:support@platform.com" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
//                 support@platform.com
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Completed;

//connected to backend and fetch data
import React, { useState, useEffect } from "react";
import { CheckCircle, FileText, User, Mail, Eye } from "lucide-react";
import adminApi from "../api/adminApi"; // ✨ Import API

interface KycRequest {
  id: number;
  full_name: string;
  email?: string; // Optional (might be hidden for normal owners)
  created_at: string;
  // status is 'approved'
}

const Completed: React.FC = () => {
  const [requests, setRequests] = useState<KycRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // ✨ FETCH COMPLETED LIST
  useEffect(() => {
    adminApi.get("/kyc/completed")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Completed Failed", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl mb-6 shadow-2xl">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Completed KYC Verifications
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            View successfully completed KYC verification requests
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              {loading ? (
                 <p className="text-center py-10">Loading completed verifications...</p>
              ) : requests.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No Completed Requests</h2>
                  <p className="text-gray-600">No KYC requests have been completed yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {requests.map((request) => (
                    <div key={request.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{request.full_name}</h3>
                            {request.email && <p className="text-gray-600">{request.email}</p>}
                            <p className="text-sm text-gray-500">Submitted: {new Date(request.created_at).toLocaleDateString()}</p>
                            <p className="text-sm text-green-600 font-semibold">Status: Verified</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">Verified</span>
                          </div>
                          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            <Eye className="w-4 h-4 inline mr-2" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <p className="text-gray-600 mb-2">Need assistance?</p>
            <div className="flex items-center justify-center space-x-2 text-gray-700 font-medium">
              <Mail className="w-5 h-5 text-blue-600" />
              <span>Contact support at</span>
              <a href="mailto:support@platform.com" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                support@platform.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;