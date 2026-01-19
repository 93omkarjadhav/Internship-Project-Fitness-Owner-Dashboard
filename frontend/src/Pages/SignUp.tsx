// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import adminApi from "../api/adminApi"; // ✨ Import Admin API
// const Signup: React.FC = () => {
//   const [ownerName, setOwnerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [gymAddress, setGymAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     if (!ownerName || !phone || !gymAddress || !email || !password || !confirmPassword) {
//       alert("Please fill all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//   //     const res = await axios.post("http://localhost:5000/api/auth/register", {
//   //       ownerName,
//   //       phone,
//   //       gymAddress,
//   //       email,
//   //       password,
//   //     });

//   //     alert("Signup Successful ✅");
//   //     navigate("/");
//   //   } catch (error: any) {
//   //     alert(error.response?.data?.message || "Signup failed");
//   //   }
//   // };
// // ✨ Use adminApi (Port 5001)
//       const res = await adminApi.post("/auth/register", {
//         full_name: ownerName, // Map 'ownerName' to 'full_name'
//         email,
//         password,
//         role: "Owner" // Force role for signups
//       });

//       alert("Signup Successful ✅");
//       navigate("/");
//     } catch (error: any) {
//       console.error(error);
//       alert(error.response?.data?.msg || "Signup failed");
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#4880FF] px-4">
//       <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-10">

//         <h2 className="text-center text-2xl font-semibold">Create an Account</h2>
//         <p className="text-center text-sm text-gray-500 mt-1">
//           Create an account to continue
//         </p>

//         {/* Owner Name */}
//         <div className="mt-5">
//           <label className="text-sm font-normal">Owner Name:</label>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             value={ownerName}
//             onChange={(e) => setOwnerName(e.target.value)}
//             className="w-full mt-2 px-3 py-2 border rounded-lg bg-[#F1F4F9]"
//           />
//         </div>

//         {/* Phone Number */}
//         <div className="mt-5">
//           <label className="text-sm font-normal">Phone Number:</label>
//           <input
//             type="number"
//             placeholder="Enter your phone number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full mt-2 px-3 py-2 border rounded-lg bg-[#F1F4F9]"
//           />
//         </div>

//         {/* Gym Address */}
//         <div className="mt-5">
//           <label className="text-sm font-normal">Gym Address:</label>
//           <input
//             type="text"
//             placeholder="Enter gym address"
//             value={gymAddress}
//             onChange={(e) => setGymAddress(e.target.value)}
//             className="w-full mt-2 px-3 py-2 border rounded-lg bg-[#F1F4F9]"
//           />
//         </div>

//         {/* Email */}
//         <div className="mt-5">
//           <label className="text-sm font-normal">Email address:</label>
//           <input
//             type="email"
//             placeholder="example@gmail.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full mt-2 px-3 py-2 border rounded-lg bg-[#F1F4F9]"
//           />
//         </div>

//         {/* Password */}
//         <div className="mt-4">
//           <label className="text-sm font-normal">Enter Password</label>
//           <div className="relative mt-2">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Abcd@1234"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg bg-[#F1F4F9]"
//             />

//             <div
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               <img src="/eye.png" className="w-5 h-5" />
//             </div>
//           </div>
//         </div>

//         {/* Confirm Password */}
//         <div className="mt-4">
//           <label className="text-sm font-normal">Confirm Password</label>
//           <div className="relative mt-2">
//             <input
//               type={showConfirm ? "text" : "password"}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg bg-[#F1F4F9]"
//             />

//             <div
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//               onClick={() => setShowConfirm(!showConfirm)}
//             >
//               <img src="/eye.png" className="w-5 h-5" />
//             </div>
//           </div>
//         </div>

//         {/* Terms */}
//         <div className="mt-4 flex items-start gap-2">
//           <input type="checkbox" className="mt-1 cursor-pointer" />
//           <p className="text-sm text-gray-600">I accept terms and conditions</p>
//         </div>

//         {/* Sign Up Button */}
//         <button
//           onClick={handleSignup}
//           className="bg-[#4880FF] text-white py-3 rounded-lg w-[300px] mx-auto block mt-6"
//         >
//           Continue to get verified
//         </button>

//         <p className="text-center text-sm mt-3 text-gray-600">
//           Already have an account?{" "}
//           <Link to="/" className="text-blue-600 font-semibold">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

//2222222revised
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminApi from "../api/adminApi"; // ✨ Import Admin API

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false); // ✨ Loading State

  const handleSignup = async () => {
    // 1. Basic Validation
    if (!ownerName || !phone || !gymAddress || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // 2. ✨ Backend Call (Port 5001)
      const res = await adminApi.post("/auth/register", {
        full_name: ownerName, // Backend expects 'full_name'
        email,
        phone,
        password,
        role: "Owner", // Force role
        // You might want to send gymAddress too if your backend supports it,
        // otherwise it's just collected here for UI purposes.
      });

      // 3. Success
      alert("Signup Successful! Proceeding to KYC... ✅");
      
      // Redirect to KYC page as requested
      navigate("/kyc");

    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.msg || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-4 py-8">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-10 border border-gray-100">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-2">Create an Account</h2>
        <p className="text-center text-gray-600 text-lg mb-8 leading-relaxed">
          Create an account to continue
        </p>

        {/* Owner Name */}
        <div className="mb-6">
          <label className="text-lg font-semibold text-gray-700 mb-3 block">Owner Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="text-lg font-semibold text-gray-700 mb-3 block">Phone Number:</label>
          <input
            type="number" // changed from 'text' to 'number' for better mobile UX
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
          />
        </div>

        {/* Gym Address */}
        <div className="mb-6">
          <label className="text-lg font-semibold text-gray-700 mb-3 block">Gym Address:</label>
          <input
            type="text"
            placeholder="Enter gym address"
            value={gymAddress}
            onChange={(e) => setGymAddress(e.target.value)}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-lg font-semibold text-gray-700 mb-3 block">Email address:</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-lg font-semibold text-gray-700 mb-3 block">Enter Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Abcd@1234"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src="/eye.png" className="w-6 h-6" alt="Toggle Password" />
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-lg font-semibold text-gray-700 mb-3 block">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              <img src="/eye.png" className="w-6 h-6" alt="Toggle Confirm Password" />
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 mb-8">
          <input type="checkbox" className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
          <p className="text-base text-gray-700 leading-relaxed">I accept terms and conditions</p>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl w-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-semibold text-xl mb-6 
            ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Creating Account..." : "Continue to get verified"}
        </button>

        <p className="text-center text-base text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;