// import React, { useState } from "react";
// import { Clock, CheckCircle, XCircle, Shield, Mail, FileText, Users, Eye, User } from "lucide-react";

// interface KycRequest {
//   id: string;
//   name: string;
//   email: string;
//   submittedDate: string;
//   status: "pending";
// }

// const Pending: React.FC = () => {
//   const [requests, setRequests] = useState<KycRequest[]>([
//     {
//       id: "1",
//       name: "John Doe",
//       email: "john.doe@example.com",
//       submittedDate: "2025-12-25",
//       status: "pending",
//     },
//     {
//       id: "2",
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       submittedDate: "2025-12-26",
//       status: "pending",
//     },
//     {
//       id: "3",
//       name: "Bob Johnson",
//       email: "bob.johnson@example.com",
//       submittedDate: "2025-12-27",
//       status: "pending",
//     },
//   ]);

//   const handleApprove = (id: string) => {
//     // Logic to approve the request
//     console.log(`Approved request ${id}`);
//     setRequests(requests.filter(req => req.id !== id));
//   };

//   const handleReject = (id: string) => {
//     // Logic to reject the request
//     console.log(`Rejected request ${id}`);
//     setRequests(requests.filter(req => req.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl mb-6 shadow-2xl">
//             <Clock className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
//             Pending KYC Verifications
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//             Review and manage pending KYC verification requests
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//             <div className="p-8">
//               {requests.length === 0 ? (
//                 <div className="text-center py-12">
//                   <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//                   <h2 className="text-2xl font-bold text-gray-900 mb-2">No Pending Requests</h2>
//                   <p className="text-gray-600">All KYC requests have been processed.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {requests.map((request) => (
//                     <div key={request.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
//                             <User className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <h3 className="text-lg font-bold text-gray-900">{request.name}</h3>
//                             <p className="text-gray-600">{request.email}</p>
//                             <p className="text-sm text-gray-500">Submitted: {request.submittedDate}</p>
//                           </div>
//                         </div>
//                         <div className="flex space-x-3">
//                           <button
//                             onClick={() => handleApprove(request.id)}
//                             className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
//                           >
//                             <CheckCircle className="w-4 h-4 inline mr-2" />
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleReject(request.id)}
//                             className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
//                           >
//                             <XCircle className="w-4 h-4 inline mr-2" />
//                             Reject
//                           </button>
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

// export default Pending;

//connected version
import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, User, Mail, Eye } from "lucide-react";
import adminApi from "../api/adminApi"; // ✨ Import API

interface KycRequest {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
  // status is implied 'pending' here
}

const Pending: React.FC = () => {
  const [requests, setRequests] = useState<KycRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // ✨ FETCH PENDING LIST
  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await adminApi.get("/kyc/pending");
      setRequests(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Pending Failed", error);
      setLoading(false);
    }
  };

  // ✨ HANDLE APPROVE
  const handleApprove = async (id: number) => {
    if (!window.confirm("Are you sure you want to approve this owner?")) return;
    try {
      await adminApi.put(`/kyc/${id}/action`, { action: "approve" });
      setRequests(requests.filter(req => req.id !== id)); // Remove from list UI
      alert("Owner Approved ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to approve owner");
    }
  };

  // ✨ HANDLE REJECT
  const handleReject = async (id: number) => {
    if (!window.confirm("Are you sure you want to reject this owner?")) return;
    try {
      await adminApi.put(`/kyc/${id}/action`, { action: "reject" });
      setRequests(requests.filter(req => req.id !== id)); // Remove from list UI
      alert("Owner Rejected ❌");
    } catch (error) {
      console.error(error);
      alert("Failed to reject owner");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl mb-6 shadow-2xl">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Pending KYC Verifications
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Review and manage pending KYC verification requests
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              {loading ? (
                 <p className="text-center py-10">Loading pending requests...</p>
              ) : requests.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No Pending Requests</h2>
                  <p className="text-gray-600">All KYC requests have been processed.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {requests.map((request) => (
                    <div key={request.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{request.full_name}</h3>
                            <p className="text-gray-600">{request.email}</p>
                            <p className="text-sm text-gray-500">Submitted: {new Date(request.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                          >
                            <CheckCircle className="w-4 h-4 inline mr-2" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                          >
                            <XCircle className="w-4 h-4 inline mr-2" />
                            Reject
                          </button>
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

export default Pending;