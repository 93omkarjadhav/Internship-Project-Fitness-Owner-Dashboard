
// import React, { useState } from "react";
// import { Clock, CheckCircle, Shield, Mail, FileText, Users, Lock } from "lucide-react";

// type VerificationStatus = "not_started" | "pending" | "completed" | "rejected";

// const Kyc: React.FC = () => {
//   const [verificationStatus, setVerificationStatus] =
//     useState<VerificationStatus>("pending");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl mb-6 shadow-2xl">
//             <Shield className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
//             KYC Verification
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//             Complete your identity verification to unlock full access to our platform
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//             {/* Progress Steps */}
//             <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-8 border-b border-gray-200">
//               <div className="flex items-center justify-center">
//                 <div className="flex items-center space-x-2">
//                   {/* Step 1 */}
//                   <div className={`flex flex-col items-center space-y-3 ${verificationStatus === "pending" || verificationStatus === "completed" ? "text-blue-600" : "text-gray-400"}`}>
//                     <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//                       verificationStatus === "pending" || verificationStatus === "completed"
//                         ? "bg-blue-600 shadow-lg"
//                         : "bg-gray-300"
//                     }`}>
//                       <FileText className="w-6 h-6 text-white" />
//                     </div>
//                     <div className="text-center">
//                       <div className="font-semibold text-sm">Request Sent</div>
//                       <div className="text-xs opacity-75">Submitted</div>
//                     </div>
//                   </div>

//                   {/* Connector */}
//                   <div className={`w-16 h-0.5 transition-colors duration-300 ${
//                     verificationStatus === "pending" || verificationStatus === "completed" ? "bg-blue-600" : "bg-gray-300"
//                   }`}></div>

//                   {/* Step 2 */}
//                   <div className={`flex flex-col items-center space-y-3 ${verificationStatus === "pending" ? "text-yellow-600" : verificationStatus === "completed" ? "text-blue-600" : "text-gray-400"}`}>
//                     <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//                       verificationStatus === "pending"
//                         ? "bg-yellow-500 shadow-lg animate-pulse"
//                         : verificationStatus === "completed"
//                         ? "bg-blue-600 shadow-lg"
//                         : "bg-gray-300"
//                     }`}>
//                       <Clock className="w-6 h-6 text-white" />
//                     </div>
//                     <div className="text-center">
//                       <div className="font-semibold text-sm">Under Review</div>
//                       <div className="text-xs opacity-75">In Progress</div>
//                     </div>
//                   </div>

//                   {/* Connector */}
//                   <div className={`w-16 h-0.5 transition-colors duration-300 ${
//                     verificationStatus === "completed" ? "bg-blue-600" : "bg-gray-300"
//                   }`}></div>

//                   {/* Step 3 */}
//                   <div className={`flex flex-col items-center space-y-3 ${verificationStatus === "completed" ? "text-green-600" : verificationStatus === "rejected" ? "text-red-600" : "text-gray-400"}`}>
//                     <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//                       verificationStatus === "completed"
//                         ? "bg-green-600 shadow-lg"
//                         : verificationStatus === "rejected"
//                         ? "bg-red-600 shadow-lg"
//                         : "bg-gray-300"
//                     }`}>
//                       {verificationStatus === "rejected" ? (
//                         <span className="text-white font-bold text-lg">✕</span>
//                       ) : (
//                         <CheckCircle className="w-6 h-6 text-white" />
//                       )}
//                     </div>
//                     <div className="text-center">
//                       <div className="font-semibold text-sm">{verificationStatus === "rejected" ? "Rejected" : "Completed"}</div>
//                       <div className="text-xs opacity-75">{verificationStatus === "rejected" ? "Not Approved" : "Verified"}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           {/* Content Area */}
//           <div className="p-12">
//             {verificationStatus === "pending" && (
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-8 shadow-xl">
//                   <Clock className="w-12 h-12 text-white animate-pulse" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6">
//                   Verification in Progress
//                 </h2>

//                 <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-3xl mx-auto">
//                   KYC (Know Your Customer) is a mandatory process used to verify the authenticity of your account and business details.
//                   This ensures a secure and trustworthy platform for all users.
//                 </p>

//                 <div className="grid md:grid-cols-3 gap-8 mb-12">
//                   <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
//                     <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
//                       <Lock className="w-6 h-6 text-white" />
//                     </div>
//                     <h3 className="font-bold text-gray-900 mb-2">Enhanced Security</h3>
//                     <p className="text-gray-600 text-sm leading-relaxed">Ensures account security and builds trust with verified identities</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
//                     <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl mb-4">
//                       <Shield className="w-6 h-6 text-white" />
//                     </div>
//                     <h3 className="font-bold text-gray-900 mb-2">Fraud Prevention</h3>
//                     <p className="text-gray-600 text-sm leading-relaxed">Prevents misuse and fake registrations for a safer platform</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
//                     <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-xl mb-4">
//                       <Users className="w-6 h-6 text-white" />
//                     </div>
//                     <h3 className="font-bold text-gray-900 mb-2">Full Access</h3>
//                     <p className="text-gray-600 text-sm leading-relaxed">Required to access all platform services and features</p>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-8">
//                   <div className="flex items-center justify-center space-x-3 text-blue-800 mb-4">
//                     <Clock className="w-5 h-5" />
//                     <span className="font-semibold">Processing Time</span>
//                   </div>
//                   <p className="text-gray-700 mb-4">
//                     Your KYC request has been received and is currently under review.
//                   </p>
//                   <p className="text-lg font-medium text-blue-600">
//                     Expected completion: <span className="font-bold">24–48 hours</span>
//                   </p>
//                 </div>

//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8">
//                   <div className="flex items-center justify-center space-x-2 text-green-800 mb-3">
//                     <CheckCircle className="w-5 h-5" />
//                     <span className="font-semibold">Once Completed</span>
//                   </div>
//                   <p className="text-green-700 text-sm">
//                     You'll have full access to all platform services and features with enhanced account security.
//                   </p>
//                 </div>

//                 <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 mb-8">
//                   <div className="flex items-center justify-center space-x-2 text-amber-800 mb-3">
//                     <Mail className="w-5 h-5" />
//                     <span className="font-semibold">Need Help?</span>
//                   </div>
//                   <p className="text-amber-700 text-sm mb-3">
//                     For any changes or queries, please contact our support team.
//                   </p>
//                   <div className="flex items-center justify-center space-x-2 text-amber-800 font-medium">
//                     <Mail className="w-4 h-4" />
//                     <span>support@platform.com</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {verificationStatus === "completed" && (
//               <div className="text-center">
//                 <div className="relative mb-8">
//                   <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-2xl shadow-2xl">
//                     <CheckCircle className="w-14 h-14 text-white" />
//                   </div>
//                   <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
//                     <span className="text-white font-bold text-sm">✓</span>
//                   </div>
//                 </div>
//                 <h2 className="text-4xl font-bold text-gray-900 mb-6">
//                   Verification Completed!
//                 </h2>
//                 <p className="text-gray-600 mb-10 text-xl leading-relaxed max-w-2xl mx-auto">
//                   Congratulations! Your KYC verification has been successfully completed.
//                   You now have full access to all platform services and features.
//                 </p>

//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 mb-10">
//                   <div className="flex items-center justify-center space-x-3 text-green-800 mb-4">
//                     <Shield className="w-6 h-6" />
//                     <span className="font-bold text-lg">Account Status: Verified</span>
//                   </div>
//                   <p className="text-green-700 mb-4">
//                     Your account is now fully verified and secured. Enjoy unrestricted access to all platform features.
//                   </p>
//                   <p className="text-green-700 text-sm">
//                     After verification, you can now access premium services, make transactions, and participate in all platform activities without restrictions.
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => window.location.reload()} // Or navigate to dashboard
//                   className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:from-green-700 hover:via-emerald-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
//                 >
//                   Continue to Dashboard
//                 </button>
//               </div>
//             )}

//             {verificationStatus === "rejected" && (
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl mb-8 shadow-xl">
//                   <span className="text-white font-bold text-2xl">✕</span>
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6">
//                   Verification Rejected
//                 </h2>
//                 <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-3xl mx-auto">
//                   Unfortunately, your KYC verification has been rejected. This means you are not approved for full access to the platform at this time.
//                 </p>

//                 <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-8 mb-8">
//                   <div className="flex items-center justify-center space-x-3 text-red-800 mb-4">
//                     <span className="text-red-600 font-bold text-lg">Account Status: Not Approved</span>
//                   </div>
//                   <p className="text-red-700">
//                     Your account has not been verified. You may have limited access to platform features until verification is completed successfully.
//                   </p>
//                 </div>

//                 <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 mb-8">
//                   <div className="flex items-center justify-center space-x-2 text-amber-800 mb-3">
//                     <Mail className="w-5 h-5" />
//                     <span className="font-semibold">Next Steps</span>
//                   </div>
//                   <p className="text-amber-700 text-sm mb-3">
//                     Please contact our support team to understand the reasons for rejection and how to resubmit your verification.
//                   </p>
//                   <div className="flex items-center justify-center space-x-2 text-amber-800 font-medium">
//                     <Mail className="w-4 h-4" />
//                     <span>support@platform.com</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => window.location.reload()} // Or navigate to resubmit
//                   className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
//                 >
//                   Resubmit Verification
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         </div>

//      {/* Footer */}
// <div className="max-w-5xl mx-auto text-center mt-12">
//   <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
    
//     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

//       {/* LEFT SECTION */}
//       <div className="text-left">
//         <p className="text-sm text-gray-500 mb-1">Support</p>
//         <p className="text-gray-700 font-medium">
//           Need assistance with your verification?
//         </p>
//       </div>

//       {/* DIVIDER */}
//       <div className="hidden md:block h-10 w-px bg-gray-300/60"></div>

//       {/* RIGHT SECTION */}
//       <div className="flex items-center justify-start md:justify-end space-x-2 text-gray-700 font-medium">
//         <Mail className="w-5 h-5 text-blue-600" />
//         <span>Contact:</span>
//         <a
//           href="mailto:support@platform.com"
//           className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
//         >
//           support@platform.com
//         </a>
//       </div>

//     </div>

//   </div>
// </div>


//       </div>
//     </div>
//   );
// };

// export default Kyc;


//connected
import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, Shield, Mail, FileText, Users, Lock } from "lucide-react";
import adminApi from "../api/adminApi"; // ✨ Import API

type VerificationStatus = "not_started" | "pending" | "approved" | "rejected";

const Kyc: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("pending");
  const [loading, setLoading] = useState(true);

  // ✨ FETCH REAL STATUS
  useEffect(() => {
    adminApi.get("/kyc/my-status")
      .then((res) => {
        setVerificationStatus(res.data.status); // 'pending', 'approved', 'rejected'
        setLoading(false);
      })
      .catch((err) => {
        console.error("KYC Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <p className="text-xl font-semibold text-blue-600">Loading verification status...</p>
      </div>
    );
  }

  // Helper to map DB status 'approved' to UI status 'completed'
  const uiStatus = verificationStatus === "approved" ? "completed" : verificationStatus;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl mb-6 shadow-2xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            KYC Verification
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Complete your identity verification to unlock full access to our platform
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            
            {/* Progress Steps */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-8 border-b border-gray-200">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  
                  {/* Step 1: Request Sent */}
                  <div className={`flex flex-col items-center space-y-3 ${uiStatus === "pending" || uiStatus === "completed" || uiStatus === "rejected" ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      uiStatus === "pending" || uiStatus === "completed" || uiStatus === "rejected"
                        ? "bg-blue-600 shadow-lg"
                        : "bg-gray-300"
                    }`}>
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">Request Sent</div>
                      <div className="text-xs opacity-75">Submitted</div>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className={`w-16 h-0.5 transition-colors duration-300 ${
                    uiStatus === "pending" || uiStatus === "completed" || uiStatus === "rejected" ? "bg-blue-600" : "bg-gray-300"
                  }`}></div>

                  {/* Step 2: Under Review */}
                  <div className={`flex flex-col items-center space-y-3 ${uiStatus === "pending" ? "text-yellow-600" : uiStatus === "completed" || uiStatus === "rejected" ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      uiStatus === "pending"
                        ? "bg-yellow-500 shadow-lg animate-pulse"
                        : uiStatus === "completed" || uiStatus === "rejected"
                        ? "bg-blue-600 shadow-lg"
                        : "bg-gray-300"
                    }`}>
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">Under Review</div>
                      <div className="text-xs opacity-75">In Progress</div>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className={`w-16 h-0.5 transition-colors duration-300 ${
                    uiStatus === "completed" || uiStatus === "rejected" ? "bg-blue-600" : "bg-gray-300"
                  }`}></div>

                  {/* Step 3: Result */}
                  <div className={`flex flex-col items-center space-y-3 ${uiStatus === "completed" ? "text-green-600" : uiStatus === "rejected" ? "text-red-600" : "text-gray-400"}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      uiStatus === "completed"
                        ? "bg-green-600 shadow-lg"
                        : uiStatus === "rejected"
                        ? "bg-red-600 shadow-lg"
                        : "bg-gray-300"
                    }`}>
                      {uiStatus === "rejected" ? (
                        <span className="text-white font-bold text-lg">✕</span>
                      ) : (
                        <CheckCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">{uiStatus === "rejected" ? "Rejected" : "Completed"}</div>
                      <div className="text-xs opacity-75">{uiStatus === "rejected" ? "Not Approved" : "Verified"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-12">
              {uiStatus === "pending" && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-8 shadow-xl">
                    <Clock className="w-12 h-12 text-white animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Verification in Progress
                  </h2>

                  <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-3xl mx-auto">
                    KYC (Know Your Customer) is a mandatory process used to verify the authenticity of your account and business details.
                    This ensures a secure and trustworthy platform for all users.
                  </p>

                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">Enhanced Security</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">Ensures account security and builds trust with verified identities</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl mb-4">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">Fraud Prevention</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">Prevents misuse and fake registrations for a safer platform</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-xl mb-4">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">Full Access</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">Required to access all platform services and features</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-8">
                    <div className="flex items-center justify-center space-x-3 text-blue-800 mb-4">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Processing Time</span>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Your KYC request has been received and is currently under review.
                    </p>
                    <p className="text-lg font-medium text-blue-600">
                      Expected completion: <span className="font-bold">24–48 hours</span>
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-center space-x-2 text-green-800 mb-3">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Once Completed</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      You'll have full access to all platform services and features with enhanced account security.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-center space-x-2 text-amber-800 mb-3">
                      <Mail className="w-5 h-5" />
                      <span className="font-semibold">Need Help?</span>
                    </div>
                    <p className="text-amber-700 text-sm mb-3">
                      For any changes or queries, please contact our support team.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-amber-800 font-medium">
                      <Mail className="w-4 h-4" />
                      <span>support@platform.com</span>
                    </div>
                  </div>
                </div>
              )}

              {uiStatus === "completed" && (
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-2xl shadow-2xl">
                      <CheckCircle className="w-14 h-14 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Verification Completed!
                  </h2>
                  <p className="text-gray-600 mb-10 text-xl leading-relaxed max-w-2xl mx-auto">
                    Congratulations! Your KYC verification has been successfully completed.
                    You now have full access to all platform services and features.
                  </p>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 mb-10">
                    <div className="flex items-center justify-center space-x-3 text-green-800 mb-4">
                      <Shield className="w-6 h-6" />
                      <span className="font-bold text-lg">Account Status: Verified</span>
                    </div>
                    <p className="text-green-700 mb-4">
                      Your account is now fully verified and secured. Enjoy unrestricted access to all platform features.
                    </p>
                    <p className="text-green-700 text-sm">
                      After verification, you can now access premium services, make transactions, and participate in all platform activities without restrictions.
                    </p>
                  </div>

                  <button
                    onClick={() => window.location.reload()} // Or navigate to dashboard
                    className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:from-green-700 hover:via-emerald-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
                  >
                    Continue to Dashboard
                  </button>
                </div>
              )}

              {uiStatus === "rejected" && (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl mb-8 shadow-xl">
                    <span className="text-white font-bold text-2xl">✕</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Verification Rejected
                  </h2>
                  <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-3xl mx-auto">
                    Unfortunately, your KYC verification has been rejected. This means you are not approved for full access to the platform at this time.
                  </p>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-8 mb-8">
                    <div className="flex items-center justify-center space-x-3 text-red-800 mb-4">
                      <span className="text-red-600 font-bold text-lg">Account Status: Not Approved</span>
                    </div>
                    <p className="text-red-700">
                      Your account has not been verified. You may have limited access to platform features until verification is completed successfully.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-center space-x-2 text-amber-800 mb-3">
                      <Mail className="w-5 h-5" />
                      <span className="font-semibold">Next Steps</span>
                    </div>
                    <p className="text-amber-700 text-sm mb-3">
                      Please contact our support team to understand the reasons for rejection and how to resubmit your verification.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-amber-800 font-medium">
                      <Mail className="w-4 h-4" />
                      <span>support@platform.com</span>
                    </div>
                  </div>

                  <button
                    onClick={() => window.location.reload()} // Or navigate to resubmit
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
                  >
                    Resubmit Verification
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-5xl mx-auto text-center mt-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* LEFT SECTION */}
              <div className="text-left">
                <p className="text-sm text-gray-500 mb-1">Support</p>
                <p className="text-gray-700 font-medium">
                  Need assistance with your verification?
                </p>
              </div>

              {/* DIVIDER */}
              <div className="hidden md:block h-10 w-px bg-gray-300/60"></div>

              {/* RIGHT SECTION */}
              <div className="flex items-center justify-start md:justify-end space-x-2 text-gray-700 font-medium">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>Contact:</span>
                <a
                  href="mailto:support@platform.com"
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
                >
                  support@platform.com
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Kyc;