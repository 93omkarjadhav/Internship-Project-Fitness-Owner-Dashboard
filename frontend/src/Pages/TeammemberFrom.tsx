// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Camera } from "lucide-react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// const TeamMemberForm = () => {
//   const navigate = useNavigate();

//   const [photo, setPhoto] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     position: "",
//     gender: "",
//   });

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPhoto(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Team member added successfully!");
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB]">
//       {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

//       <main className="flex-1 p-6">
//         <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

//         <h1 className="text-2xl font-semibold mt-6">Add Team Member</h1>

//         {/* FORM CONTAINER */}
//         <div className="bg-white rounded-lg p-6 md:p-8 max-w-3xl mx-auto mt-8">
//           {/* YOUR FORM - unchanged */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Photo Upload */}
//             <div className="flex justify-center">
//               <label className="cursor-pointer">
//                 <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
//                   {photo ? (
//                     <img
//                       src={photo}
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   ) : (
//                     <Camera className="w-8 h-8 text-gray-500" />
//                   )}
//                 </div>
//                 <p className="text-sm text-blue-600 text-center mt-2">
//                   Upload Photo
//                 </p>
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={handlePhotoUpload}
//                 />
//               </label>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* First Name */}
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-[#606060]">
//                   First Name
//                 </label>
//                 <input
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
//                   placeholder="Enter your First Name"
//                 />
//               </div>

//               {/* Last Name */}
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-[#606060]">
//                   Last Name
//                 </label>
//                 <input
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
//                   placeholder="Enter your Last Name"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-[#606060]">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
//                   placeholder="Enter your Email"
//                 />
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-[#606060]">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                   className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
//                   placeholder="Enter your Phone Number"
//                 />
//               </div>

//               {/* Position */}
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-[#606060]">
//                   Position
//                 </label>
//                 <input
//                   name="position"
//                   value={formData.position}
//                   onChange={handleInputChange}
//                   className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
//                   placeholder="e.g. Manager / Trainer"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <button className="px-12 py-2 bg-blue-600 text-white rounded-lg">
//                 Add Now
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TeamMemberForm;

import React, { useState } from "react"; // Explicit React import
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import adminApi from "../api/adminApi"; // ✨ Import Admin API

const TeamMemberForm = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Form State
  const [photo, setPhoto] = useState<string | null>(null); // Visual preview
  const [photoUrl, setPhotoUrl] = useState<string | null>(null); // ✨ Real Cloudinary URL
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    position: "",
    gender: "Male", // Default
  });

  // ✨ Handle Photo Upload to Cloudinary
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show local preview immediately
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);

      // Upload to Server
      setUploading(true);
      const data = new FormData();
      data.append("image", file);

      try {
        const res = await adminApi.post("/upload", data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        setPhotoUrl(res.data.url); // Save the Cloudinary URL
      } catch (err) {
        console.error("Upload failed", err);
        alert("Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✨ Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName) {
        return alert("Name and Email are required");
    }

    try {
        await adminApi.post("/team/add", {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phoneNumber,
            position: formData.position,
            gender: formData.gender,
            avatar_url: photoUrl // Send the uploaded URL (or null)
        });

        alert("Team member added successfully!");
        navigate("/team"); // Go back to list
    } catch (err: any) {
        console.error(err);
        alert(err.response?.data?.msg || "Failed to add member");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FB]">
      {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

      <main className="flex-1 p-6">
        <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <h1 className="text-2xl font-semibold mt-6">Add Team Member</h1>

        <div className="bg-white rounded-lg p-6 md:p-8 max-w-3xl mx-auto mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Photo Upload */}
            <div className="flex justify-center">
              <label className="cursor-pointer relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {photo ? (
                    <img src={photo} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                {/* Upload Indicator */}
                {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <p className="text-sm text-blue-600 text-center mt-2">
                  Upload Photo
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handlePhotoUpload}
                  disabled={uploading}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#606060]">First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Enter First Name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#606060]">Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Enter Last Name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#606060]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Enter Email"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#606060]">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Enter Phone Number"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#606060]">Position</label>
                <input
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
                  placeholder="e.g. Manager / Trainer"
                />
              </div>

              {/* Gender Select */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#606060]">Gender</label>
                <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                type="submit" 
                disabled={uploading}
                className="px-12 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
              >
                {uploading ? "Uploading..." : "Add Now"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TeamMemberForm;