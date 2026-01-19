// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import adminApi from "../api/adminApi"; // ✨ Import
// const EnterCredentials: React.FC = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
  
//   const [error, setError] = useState("");
// const location = useLocation();
// const state = location.state as { email: string };
// const emailFromState = state?.email || "";

// const [email] = useState(emailFromState); 
//   const handleSignIn = async () => {
//     if (!password) {
//       setError("Please enter password");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       // Save token
//       localStorage.setItem("token", response.data.token);

//       // Navigate to dashboard
//       navigate("/dashboard");

//     } catch (err: any) {
//       setError(err.response?.data?.message || "Invalid credentials");
//     }
//   };

//22222
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import adminApi from "../api/adminApi"; // ✨ Import

// const EnterCredentials: React.FC = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
  
//   const location = useLocation();
//   const state = location.state as { email: string };
//   const emailFromState = state?.email || "";
//   const [email] = useState(emailFromState); 

//   const handleSignIn = async () => {
//     if (!password) {
//       setError("Please enter password");
//       return;
//     }

//     try {
//       // ✨ Use adminApi (Port 5001)
//       const response = await adminApi.post("/auth/login", {
//         email,
//         password,
//       });

//       // Save token
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("admin", JSON.stringify(response.data.admin));

//       // Navigate to dashboard
//       navigate("/dashboard");

//     } catch (err: any) {
//       console.error(err);
//       setError(err.response?.data?.msg || "Invalid credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#538DFF] p-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 md:py-20 flex flex-col justify-center">
//         <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">
//           Enter Credentials
//         </h2>
//         <p className="text-gray-600 text-center text-sm md:text-base mb-8">
//           Please enter your profile password to continue
//         </p>

//         {/* Password Field */}
//         <div className="mb-4">
//           <label className="text-sm md:text-base">Profile Password</label>
//           <div className="relative mt-2">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-blue-500"
//             />

//             {password.length === 0 && !showPassword && (
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-2 pointer-events-none">
//                 {[...Array(6)].map((_, i) => (
//                   <img key={i} src="/dot.png" className="w-2.5 h-2.5" />
//                 ))}
//               </div>
//             )}

//             <div
//               className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//               <img
//                 src="/eye.png"
//                 alt="eye"
//                 className={`w-5 h-5 ${!showPassword ? "opacity-60" : ""}`}
//               />
//               {!showPassword && (
//                 <span className="absolute w-6 h-[2px] bg-gray-400 rotate-45 top-1/2 left-[-3px]"></span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Remember Password */}
//         <div className="flex items-center mb-6">
//           <input type="checkbox" className="mr-2" />
//           <span className="text-sm md:text-base">Remember Password</span>
//         </div>

//         {/* Error message */}
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         {/* Confirm Button */}
//         <button
//           onClick={handleSignIn}
//           className="bg-[#538DFF] text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-base w-[280px] mx-auto mt-7"
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EnterCredentials;

//3333
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import adminApi from "../api/adminApi"; // ✨ Import

// const EnterCredentials: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✨ Get Email from previous page (AccountSelection)
//   const state = location.state as { email: string };
//   const [email] = useState(state?.email || "");

//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // ✨ Added Loading State

//   // ✨ SAFETY CHECK: If no email found, go back to selection
//   useEffect(() => {
//     if (!email) {
//       alert("No account selected. Redirecting...");
//       navigate("/accountselection");
//     }
//   }, [email, navigate]);

//   const handleSignIn = async () => {
//     if (!password) {
//       setError("Please enter your password");
//       return;
//     }

//     setLoading(true); // Start loading
//     setError("");

//     try {
//       // ✨ Use adminApi (Port 5000)
//       const response = await adminApi.post("/auth/login", {
//         email,
//         password,
//       });

//       // Save token
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("admin", JSON.stringify(response.data.admin));

//       // Navigate to dashboard
//       navigate("/dashboard");

//     } catch (err: any) {
//       console.error(err);
//       setError(err.response?.data?.msg || "Invalid credentials");
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#538DFF] p-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 md:py-20 flex flex-col justify-center">
        
//         {/* Dynamic Header */}
//         <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">
//           Welcome Back!
//         </h2>
//         <p className="text-gray-600 text-center text-sm md:text-base mb-2">
//           Logging in as:
//         </p>
//         <p className="text-blue-600 text-center font-bold mb-8">
//           {email}
//         </p>

//         {/* Password Field */}
//         <div className="mb-4">
//           <label className="text-sm md:text-base">Profile Password</label>
//           <div className="relative mt-2">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-blue-500"
//               placeholder="Enter password"
//             />

//             {/* Custom Dot Masking Logic */}
//             {password.length > 0 && !showPassword && (
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-2 pointer-events-none bg-gray-100 pr-2">
//                 {/* Visual trick only - remove if input text overlaps */}
//               </div>
//             )}

//             <div
//               className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//               <img
//                 src={showPassword ? "/eye.png" : "/eye.png"} // Ensure you have an icon for open/close or use CSS
//                 alt="eye"
//                 className={`w-5 h-5 ${!showPassword ? "opacity-60" : ""}`}
//               />
//               {!showPassword && (
//                 <span className="absolute w-6 h-[2px] bg-gray-400 rotate-45 top-1/2 left-[-3px]"></span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Remember Password */}
//         <div className="flex items-center mb-6">
//           <input type="checkbox" className="mr-2" />
//           <span className="text-sm md:text-base">Remember Password</span>
//         </div>

//         {/* Error message */}
//         {error && <p className="text-red-500 text-center mb-4 text-sm font-semibold">{error}</p>}

//         {/* Confirm Button */}
//         <button
//           onClick={handleSignIn}
//           disabled={loading}
//           className={`bg-[#538DFF] text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-base w-[280px] mx-auto mt-7 ${
//             loading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Verifying..." : "Confirm"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EnterCredentials;

//444444
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import adminApi from "../api/adminApi"; 

// const EnterCredentials: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✨ Safe State Access
//   const state = location.state as { email: string } | null;
//   const email = state?.email;

//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✨ Better Redirect Logic: No Alert, just sends them back instantly
//   useEffect(() => {
//     if (!email) {
//       console.warn("No email in state, redirecting to selection...");
//       navigate("/accountselection", { replace: true });
//     }
//   }, [email, navigate]);

//   // If redirecting, show nothing (prevents flicker)
//   if (!email) return null;

//   const handleSignIn = async () => {
//     if (!password) {
//       setError("Please enter your password");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await adminApi.post("/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("admin", JSON.stringify(response.data.admin));

//       navigate("/dashboard");

//     } catch (err: any) {
//       console.error(err);
//       setError(err.response?.data?.msg || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#538DFF] p-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 md:py-20 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300">
        
//         <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">
//           Welcome Back!
//         </h2>
//         <p className="text-gray-600 text-center text-sm md:text-base mb-2">
//           Logging in as:
//         </p>
//         <p className="text-blue-600 text-center font-bold mb-8 text-lg">
//           {email}
//         </p>

//         <div className="mb-4">
//           <label className="text-sm md:text-base font-medium text-gray-700">Profile Password</label>
//           <div className="relative mt-2">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//               placeholder="Enter password"
//             />
            
//             <div
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1"
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//                {/* Simple text toggle or use your eye icon image */}
//                <span className="text-xs font-semibold text-gray-500">
//                  {showPassword ? "HIDE" : "SHOW"}
//                </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center mb-6">
//           <input type="checkbox" className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
//           <span className="text-sm md:text-base text-gray-600">Remember Password</span>
//         </div>

//         {error && <p className="text-red-500 text-center mb-4 text-sm font-semibold bg-red-50 py-2 rounded-lg">{error}</p>}

//         <button
//           onClick={handleSignIn}
//           disabled={loading}
//           className={`bg-[#538DFF] text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-base w-[280px] mx-auto mt-4 shadow-lg hover:shadow-xl ${
//             loading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Verifying..." : "Confirm"}
//         </button>

//         <button 
//           onClick={() => navigate("/accountselection")}
//           className="mt-6 text-gray-400 text-xs hover:text-gray-600 transition-colors mx-auto"
//         >
//           Switch Account
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EnterCredentials;  

//5555555555555555
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import adminApi from "../api/adminApi"; 

// const EnterCredentials: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✨ Read email directly from location.state
//   const state = location.state as { email: string } | null;
//   const email = state?.email;

//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✨ Redirect only if email is missing (check location.state directly)
//   useEffect(() => {
//     const currentState = location.state as { email: string } | null;
//     if (!currentState?.email) {
//       navigate("/accountselection", { replace: true });
//     }
//   }, [location.state, navigate]);

//   // If no email, show nothing (prevents flicker)
//   if (!email) return null;

//   const handleSignIn = async () => {
//     if (!password) {
//       setError("Please enter your password");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await adminApi.post("/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("admin", JSON.stringify(response.data.admin));

//       navigate("/dashboard");

//     } catch (err: any) {
//       console.error(err);
//       setError(err.response?.data?.msg || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#538DFF] p-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 md:py-20 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300">
        
//         <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">
//           Welcome Back!
//         </h2>
//         <p className="text-gray-600 text-center text-sm md:text-base mb-2">
//           Logging in as:
//         </p>
//         <p className="text-blue-600 text-center font-bold mb-8 text-lg">
//           {email}
//         </p>

//         <div className="mb-4">
//           <label className="text-sm md:text-base font-medium text-gray-700">Profile Password</label>
//           <div className="relative mt-2">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//               placeholder="Enter password"
//             />
            
//             <div
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1"
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//                {/* Simple text toggle or use your eye icon image */}
//                <span className="text-xs font-semibold text-gray-500">
//                  {showPassword ? "HIDE" : "SHOW"}
//                </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center mb-6">
//           <input type="checkbox" className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
//           <span className="text-sm md:text-base text-gray-600">Remember Password</span>
//         </div>

//         {error && <p className="text-red-500 text-center mb-4 text-sm font-semibold bg-red-50 py-2 rounded-lg">{error}</p>}

//         <button
//           onClick={handleSignIn}
//           disabled={loading}
//           className={`bg-[#538DFF] text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-base w-[280px] mx-auto mt-4 shadow-lg hover:shadow-xl ${
//             loading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Verifying..." : "Confirm"}
//         </button>

//         <button 
//           onClick={() => navigate("/accountselection")}
//           className="mt-6 text-gray-400 text-xs hover:text-gray-600 transition-colors mx-auto"
//         >
//           Switch Account
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EnterCredentials;

//66666666666666
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import adminApi from "../api/adminApi"; 

const EnterCredentials: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Try to get email from Navigation State
  const stateEmail = (location.state as { email: string } | null)?.email;
  
  // 2. Fallback: Try to get email from Session Storage
  const storageEmail = sessionStorage.getItem("selected_account_email");
  
  // 3. Final Email (Prioritize State, then Storage)
  const email = stateEmail || storageEmail;

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if NO email found anywhere
  useEffect(() => {
    if (!email) {
      console.warn("No email found. Redirecting...");
      navigate("/accountselection", { replace: true });
    }
  }, [email, navigate]);

  // Don't render if we have no email (prevents "undefined" flash)
  if (!email) return null;

  const handleSignIn = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await adminApi.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      // Clear the temp storage after success
      sessionStorage.removeItem("selected_account_email");

      navigate("/dashboard");

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#538DFF] p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 md:py-20 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300">
        
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">
          Welcome Back!
        </h2>
        <p className="text-gray-600 text-center text-sm md:text-base mb-2">
          Logging in as:
        </p>
        <p className="text-blue-600 text-center font-bold mb-8 text-lg">
          {email}
        </p>

        <div className="mb-4">
          <label className="text-sm md:text-base font-medium text-gray-700">Profile Password</label>
          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              placeholder="Enter password"
            />
            
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span className="text-xs font-semibold text-gray-500 select-none">
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <input type="checkbox" className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
          <span className="text-sm md:text-base text-gray-600">Remember Password</span>
        </div>

        {error && <p className="text-red-500 text-center mb-4 text-sm font-semibold bg-red-50 py-2 rounded-lg">{error}</p>}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className={`bg-[#538DFF] text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-base w-[280px] mx-auto mt-4 shadow-lg hover:shadow-xl ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Verifying..." : "Confirm"}
        </button>

        <button 
          onClick={() => navigate("/accountselection")}
          className="mt-6 text-gray-400 text-xs hover:text-gray-600 transition-colors mx-auto"
        >
          Switch Account
        </button>
      </div>
    </div>
  );
};

export default EnterCredentials;  