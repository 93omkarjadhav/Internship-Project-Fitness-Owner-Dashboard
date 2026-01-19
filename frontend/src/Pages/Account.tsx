// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import adminApi from "../api/adminApi"; // ✨ Import Admin API
// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalType, setModalType] = useState<"error" | "success">("error");
// const [loading, setLoading] = useState(false);
// // ✨ Connected Logic
//   const handleSignIn = async () => {
//     if (!email || !password) {
//       setModalMessage("Fill the information first");
//       setModalType("error");
//       setShowModal(true);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await adminApi.post("/auth/login", {
//         email,
//         password,
//       });

//       setModalMessage("Login Successful!");
//       setModalType("success");
//       setShowModal(true);

//       // Save token
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("admin", JSON.stringify(response.data.admin));

//       setTimeout(() => {
//         setShowModal(false);
//         navigate("/dashboard"); // Redirect to Dashboard
//       }, 1500);

//     } catch (error: any) {
//       console.error("Login failed", error);
//       setModalMessage(
//         error.response?.data?.msg || "Invalid credentials. Please try again."
//       );
//       setModalType("error");
//       setShowModal(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
    
//     <div className="flex items-center justify-center min-h-screen bg-[#4880FF] font-jakarta">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 md:p-10 mx-4 relative">
//         <h2 className="text-center text-2xl font-semibold mb-2">
//           Login to Account
//         </h2>
//         <p className="text-center text-gray-500 text-sm font-normal mb-6">
//           Please enter your email and password to continue
//         </p>

//         {/* Email */}
//         <label className="block text-sm font-regular mb-1">
//           Email address:
//         </label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="admin@fitfare.in"
//           className="w-full border border-[#D8D8D8] bg-[#F1F4F9] rounded-lg px-3 py-2 text-sm 
//               focus:outline-none focus:ring-0 focus:border-[#D8D8D8] mb-4 font-normal"
//         />

//         {/* Password */}
//         <div className="flex justify-between items-center mb-1">
//           <label className="text-sm font-semibold">Password</label>
//           <a
//             href="#"
//             className="text-xs text-[#202224] hover:underline font-normal "
//           >
//             Forgot Password?
//           </a>
//         </div>
//         <div className="relative">
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border border-[#D8D8D8] rounded-lg px-3 py-2 text-sm font-normal
//               focus:outline-none focus:ring-0 focus:border-[#D8D8D8]
//               bg-[#F1F4F9] mb-4 placeholder:text-gray-500"
//           />

//           {!password && (
//             <div className="absolute top-4 left-3 gap-2 flex space-x-1 pointer-events-none">
//               {[...Array(6)].map((_, i) => (
//                  <img key={i} src="/dot.png" alt="dot" className="w-2 h-2" />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Remember Password with custom checkbox */}
//         <div className="flex items-center mb-4">
//           <input
//             type="checkbox"
//             className="w-4 h-4 appearance-none border border-gray-400 rounded
//                         checked:border-black checked:bg-white
//                         relative cursor-pointer
//                         before:content-[''] before:absolute before:inset-0
//                         checked:before:content-['✔']
//                         checked:before:text-black
//                         checked:before:text-xs
//                         checked:before:flex
//                         checked:before:items-center
//                         checked:before:justify-center"
//           />
//           <span className="text-sm font-normal ml-2">Remember Password</span>
//         </div>

//         {/* Sign In Button */}
//         <button
//           onClick={handleSignIn}
//           disabled={loading}
//           className="bg-[#4880FF] text-white py-2 rounded-lg hover:bg-blue-700 
//               transition font-medium text-sm w-2/3 mx-auto block disabled:bg-gray-400"
//         >
//           {loading ? "Signing In..." : "Sign In"}
//         </button>

//         {/* Footer */}
//         <p className="text-center text-xs mt-4 font-normal">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-[#5A8Cff] hover:underline font-semibold"
//           >
//             Create Account
//           </Link>
//         </p>

//         {/* Modal */}
//         {showModal && (
//           <div className="absolute top-0 left-0 w-full h-full  bg-opacity-40 flex items-center justify-center">
//             <div
//               className={`rounded-lg p-6 max-w-xs text-center shadow-xl border ${
//                 modalType === "error" ? "bg-white border-red-200" : "bg-green-50 border-green-200"
//               }`}
//             >
//               <p
//                 className={`mb-4 ${
//                   modalType === "error" ? "text-red-600" : "text-green-800"
//                 }`}
//               >
//                 {modalMessage}
//               </p>
//               {modalType === "error" && (
//                 <button
//                   className="bg-[#4880FF] text-white px-4 py-2 rounded hover:bg-blue-600"
//                   onClick={() => setShowModal(false)}
//                 >
//                   OK
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminApi from "../api/adminApi"; // ✨ Import API

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Login State
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");
  const [loading, setLoading] = useState(false);

  // Forgot Password Modal State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP & New Pass
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotMessageType, setForgotMessageType] = useState<"error" | "success" | "">("");
  const [modalLoading, setModalLoading] = useState(false);

  // ✨ HANDLE LOGIN
  const handleSignIn = async () => {
    if (!email || !password) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await adminApi.post("/auth/login", { email, password });
      
      // Save Token & User Info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      setMessage("Login Successful! Redirecting...");
      setMessageType("success");

      setTimeout(() => {
        navigate("/accountselection"); // Or directly to /dashboard
      }, 1000);

    } catch (error: any) {
      console.error("Login Error:", error);
      setMessage(error.response?.data?.msg || "Invalid credentials");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // ✨ HANDLE SEND OTP (Step 1)
  const handleSendOtp = async () => {
    if (!forgotEmail) {
      setForgotMessage("Please enter your email address");
      setForgotMessageType("error");
      return;
    }

    setModalLoading(true);
    setForgotMessage("");

    try {
      await adminApi.post("/auth/forgot-password", { email: forgotEmail });
      setForgotMessage(`OTP sent to ${forgotEmail}`);
      setForgotMessageType("success");
      setForgotStep(2); // Move to next step
    } catch (error: any) {
      setForgotMessage(error.response?.data?.msg || "Failed to send OTP");
      setForgotMessageType("error");
    } finally {
      setModalLoading(false);
    }
  };

  // ✨ HANDLE RESET PASSWORD (Step 2)
  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      setForgotMessage("Please enter OTP and new password");
      setForgotMessageType("error");
      return;
    }

    setModalLoading(true);
    setForgotMessage("");

    try {
      await adminApi.post("/auth/reset-password", {
        email: forgotEmail,
        otp,
        newPassword
      });
      
      setForgotMessage("Password reset successful! Please login.");
      setForgotMessageType("success");

      // Close modal after success
      setTimeout(() => {
        resetModal();
      }, 2000);

    } catch (error: any) {
      setForgotMessage(error.response?.data?.msg || "Invalid OTP or Error");
      setForgotMessageType("error");
    } finally {
      setModalLoading(false);
    }
  };

  const resetModal = () => {
    setShowForgotPassword(false);
    setForgotStep(1);
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setForgotMessage("");
    setForgotMessageType("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 font-jakarta">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 mx-4 relative border border-gray-100">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Sign In
          </h2>
          <p className="text-gray-600 text-sm font-medium">
            Please enter your credentials to continue
          </p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Email address:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@fitfare.in"
            className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 font-medium"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

        {/* Remember Password */}
        <div className="flex items-center mb-8">
          <input
            type="checkbox"
            className="w-4 h-4 mr-3 text-blue-600 focus:ring-blue-500 rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Remember Password
          </span>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-[18px] w-full shadow-md hover:shadow-lg transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-6 text-center text-sm font-semibold ${
              messageType === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Footer */}
        <p className="text-center text-sm mt-8 font-medium text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-semibold"
          >
            Create Account
          </Link>
        </p>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-2xl z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
              <h3 className="text-xl font-bold text-center mb-6 text-gray-800">
                {forgotStep === 1 ? "Reset Password" : "Enter New Password"}
              </h3>

              <p className="text-center text-gray-600 text-sm mb-6">
                {forgotStep === 1 
                  ? "Enter your email address and we'll send you an OTP to reset your password."
                  : `Enter the OTP sent to ${forgotEmail} and your new password.`}
              </p>

              {/* STEP 1: Email Input */}
              {forgotStep === 1 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>
              )}

              {/* STEP 2: OTP & New Password Input */}
              {forgotStep === 2 && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      OTP Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest text-center"
                      placeholder="XXXXXX"
                      maxLength={6}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter new password"
                    />
                  </div>
                </>
              )}

              {forgotMessage && (
                <p
                  className={`text-center text-sm font-semibold mb-4 ${
                    forgotMessageType === "error"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {forgotMessage}
                </p>
              )}

              {/* Action Buttons */}
              <button
                onClick={forgotStep === 1 ? handleSendOtp : handleResetPassword}
                disabled={modalLoading}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-md ${modalLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {modalLoading 
                  ? "Processing..." 
                  : forgotStep === 1 ? "Send OTP" : "Reset Password"
                }
              </button>

              <button
                onClick={resetModal}
                className="w-full mt-3 text-gray-600 text-sm font-medium hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;