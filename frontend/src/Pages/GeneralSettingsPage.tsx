// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   number: z.string().min(10, "Phone number must be at least 10 digits"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   branchName: z.string().min(2, "Branch name must be at least 2 characters"),
// });

// type FormData = z.infer<typeof formSchema>;

// export const GeneralSettingsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [logo, setLogo] = useState<string | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "Moni Roy",
//       email: "moniroy@fiftare.in",
//       number: "+91 XXXXXXXXXX",
//       description: "Bright web is a hybrid dashboard",
//       branchName: "Delhi",
//     },
//   });

//   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setLogo(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const onSubmit = (data: FormData) => {
//     console.log("Form data:", data);
//     alert("Settings saved successfully!");
//   };

//   const handleLogout = () => navigate("/");

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB]">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//      {/* MAIN CONTENT START */}
//       <main className="flex-1 p-6">
//         <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

// <h1 className="text-2xl font-semibold mt-6">General Settings</h1>
//         {/* FORM CARD */}
//         <div className="mx-auto max-w-4xl bg-white p-8 rounded-xl shadow">
//           <form onSubmit={handleSubmit(onSubmit)}>

//             {/* LOGO */}
//             <div className="flex flex-col items-center mb-8">
//               <label htmlFor="logo-upload" className="cursor-pointer">
//                 <div className="h-24 w-24 flex items-center justify-center bg-gray-200 rounded-full mb-2">
//                   {logo ? (
//                     <img src={logo} className="h-full w-full rounded-full object-cover" />
//                   ) : (
//                     <span className="text-2xl">📷</span>
//                   )}
//                 </div>
//               </label>
//               <input type="file" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
//               <span className="text-blue-600 text-sm">Upload Logo</span>
//             </div>

           
// <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//   {/* LEFT COLUMN */}
//   <div className="space-y-5">
//     {/* NAME */}
//     <div>
//       <label className="font-medium text-[#606060]">Name</label>
//       <input {...register("name")} className="w-full border border-[#D5D5D5] p-2 rounded" />
//     </div>

//     {/* PHONE */}
//     <div>
//       <label className="font-medium text-[#606060]">Phone Number</label>
//       <input {...register("number")} className="w-full border border-[#D5D5D5] p-2 rounded" />
//     </div>

//     {/* BRANCH */}
//     <div>
//       <label className="font-medium text-[#606060]">Branch Name</label>
//       <input {...register("branchName")} className="w-full border border-[#D5D5D5] p-2 rounded" />
//     </div>
//   </div>

//   {/* RIGHT COLUMN */}
//   <div className="space-y-5">
//     {/* EMAIL */}
//     <div>
//       <label className="font-medium text-[#606060]">Email</label>
//       <input {...register("email")} className="w-full border border-[#D5D5D5] p-2 rounded" />
//     </div>

//     {/* DESCRIPTION */}
//     <div>
//       <label className="font-medium text-[#606060]">Description</label>
//       <textarea {...register("description")} rows={5} className="w-full border border-[#D5D5D5] p-2 rounded" />
//     </div>

//               </div>
//             </div>

//             {/* SAVE BUTTON CENTER */}
//             <div className="flex justify-center mt-10">
//               <button type="submit" className="bg-[#4880FF] text-white px-12 py-3 rounded-lg hover:bg-blue-700">
//                 Save
//               </button>
//             </div>

//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

//22222
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import adminApi from "../api/adminApi"; // ✨ Import

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   number: z.string().min(10, "Phone number must be at least 10 digits"),
//   description: z.string().optional(),
//   branchName: z.string().optional(),
// });

// type FormData = z.infer<typeof formSchema>;

// export const GeneralSettingsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [logo, setLogo] = useState<string | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//   });

//   // ✨ Fetch Admin Data on Load
//   useEffect(() => {
//     adminApi.get("/auth/me")
//       .then(res => {
//         const admin = res.data;
//         setValue("name", admin.full_name);
//         setValue("email", admin.email);
//         setValue("number", admin.phone || "");
//         setValue("description", admin.position || ""); // Mapping 'position' to description
//         // setValue("branchName", ...); // Map if you have a field
//         setLogo(admin.avatar_url);
//       })
//       .catch(err => console.error("Failed to load profile", err));
//   }, [setValue]);

//   // ✨ Handle Logo Upload
//   const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const res = await adminApi.post("/upload", formData, {
//             headers: { "Content-Type": "multipart/form-data" }
//         });
//         setLogo(res.data.url); // Set Cloudinary URL
//       } catch (err) {
//         console.error("Upload failed", err);
//         alert("Failed to upload image");
//       }
//     }
//   };

//   const onSubmit = async (data: FormData) => {
//     try {
//       // Map form data back to API schema
//       await adminApi.put("/auth/me", {
//         full_name: data.name,
//         email: data.email,
//         phone: data.number,
//         position: data.description,
//         avatar_url: logo // Send the logo URL
//       });
//       alert("Settings saved successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update settings.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB]">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
//       <main className="flex-1 p-6">
//         <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
//         <h1 className="text-2xl font-semibold mt-6">General Settings</h1>
        
//         {/* FORM CARD */}
//         <div className="mx-auto max-w-4xl bg-white p-8 rounded-xl shadow">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* LOGO */}
//             <div className="flex flex-col items-center mb-8">
//               <label htmlFor="logo-upload" className="cursor-pointer">
//                 <div className="h-24 w-24 flex items-center justify-center bg-gray-200 rounded-full mb-2 overflow-hidden">
//                   {logo ? (
//                     <img src={logo} className="h-full w-full object-cover" />
//                   ) : (
//                     <span className="text-2xl">📷</span>
//                   )}
//                 </div>
//               </label>
//               <input type="file" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
//               <span className="text-blue-600 text-sm">Upload Logo</span>
//             </div>

//             {/* Form Fields - Unchanged Structure */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="space-y-5">
//                 <div>
//                   <label className="font-medium text-[#606060]">Name</label>
//                   <input {...register("name")} className="w-full border border-[#D5D5D5] p-2 rounded" />
//                 </div>
//                 <div>
//                   <label className="font-medium text-[#606060]">Phone Number</label>
//                   <input {...register("number")} className="w-full border border-[#D5D5D5] p-2 rounded" />
//                 </div>
//                 <div>
//                   <label className="font-medium text-[#606060]">Branch Name</label>
//                   <input {...register("branchName")} className="w-full border border-[#D5D5D5] p-2 rounded" />
//                 </div>
//               </div>
//               <div className="space-y-5">
//                 <div>
//                   <label className="font-medium text-[#606060]">Email</label>
//                   <input {...register("email")} className="w-full border border-[#D5D5D5] p-2 rounded" />
//                 </div>
//                 <div>
//                   <label className="font-medium text-[#606060]">Description</label>
//                   <textarea {...register("description")} rows={5} className="w-full border border-[#D5D5D5] p-2 rounded" />
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center mt-10">
//               <button type="submit" className="bg-[#4880FF] text-white px-12 py-3 rounded-lg hover:bg-blue-700">
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

//33333
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, User, Mail, Phone, MapPin, FileText, Save } from "lucide-react";
import * as z from "zod";
import adminApi from "../api/adminApi"; // ✨ Import API

// ✨ Validation Schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  number: z.string().min(10, "Phone number must be at least 10 digits"),
  description: z.string().optional(), // Made optional to prevent validation blocks
  branchName: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const GeneralSettingsPage: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false); // ✨ Loading state for saves

  const {
    register,
    handleSubmit,
    reset, // ✨ Used to populate form with DB data
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      number: "",
      description: "",
      branchName: "",
    },
  });

  // ✨ FETCH REAL ADMIN DATA ON LOAD
  useEffect(() => {
    adminApi.get("/auth/me")
      .then((res) => {
        const admin = res.data;
        // Populate form with backend data
        reset({
          name: admin.full_name,
          email: admin.email,
          number: admin.phone || "",
          description: "Bright web is a hybrid dashboard", // Static for now (or add to DB later)
          branchName: "Delhi", // Static for now
        });
        // Set Logo if exists
        if (admin.avatar_url) {
          setLogo(admin.avatar_url);
        }
      })
      .catch((err) => console.error("Failed to fetch profile", err));
  }, [reset]);

  // ✨ HANDLE LOGO UPLOAD (Direct to Cloudinary)
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Show Local Preview immediately
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);

    // 2. Upload to Backend
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await adminApi.post("/auth/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Update logo with the secure Cloudinary URL returned
      setLogo(res.data.avatar_url);
      alert("Logo uploaded successfully! 📸");
    } catch (error) {
      console.error("Logo upload failed", error);
      alert("Failed to upload logo.");
    }
  };

  // ✨ HANDLE FORM SUBMIT (Update Profile)
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Send mapped fields to backend
      await adminApi.put("/auth/update-profile", {
        full_name: data.name,
        email: data.email,
        phone: data.number,
      });
      alert("Settings saved successfully! ✅");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 p-8">
        <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              General Settings
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your account information and preferences
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

              {/* LOGO UPLOAD SECTION */}
              <div className="text-center pb-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Company Logo
                </h2>

                <div className="flex flex-col items-center">
                  <label htmlFor="logo-upload" className="cursor-pointer group">
                    <div className="relative h-36 w-36 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full mb-6 shadow-xl border-4 border-white ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300 group-hover:scale-105 overflow-hidden">
                      {logo ? (
                        <img
                          src={logo}
                          alt="Company Logo"
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <Camera className="w-12 h-12 text-blue-600 group-hover:text-blue-700 transition-colors" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-full transition-all duration-300"></div>
                    </div>
                  </label>

                  <input
                    type="file"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                    accept="image/*"
                  />

                  <div className="text-center">
                    <p className="text-blue-600 text-lg font-semibold hover:text-blue-700 transition-colors cursor-pointer">
                      {logo ? "Change Logo" : "Upload Logo"}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* FORM FIELDS */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Account Information
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                  {/* LEFT COLUMN */}
                  <div className="space-y-8">
                    {/* NAME */}
                    <div>
                      <label className="flex items-center font-semibold text-lg text-gray-700 mb-3">
                        <User className="w-5 h-5 mr-2 text-blue-600" />
                        Full Name
                      </label>
                      <input
                        {...register("name")}
                        className="w-full border-2 border-gray-200 p-4 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2">
                          ⚠ {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* PHONE */}
                    <div>
                      <label className="flex items-center font-semibold text-lg text-gray-700 mb-3">
                        <Phone className="w-5 h-5 mr-2 text-blue-600" />
                        Phone Number
                      </label>
                      <input
                        {...register("number")}
                        className="w-full border-2 border-gray-200 p-4 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                        placeholder="Enter phone number"
                      />
                      {errors.number && (
                        <p className="text-red-500 text-sm mt-2">
                          ⚠ {errors.number.message}
                        </p>
                      )}
                    </div>

                    {/* BRANCH */}
                    <div>
                      <label className="flex items-center font-semibold text-lg text-gray-700 mb-3">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                        Branch Name
                      </label>
                      <input
                        {...register("branchName")}
                        className="w-full border-2 border-gray-200 p-4 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                        placeholder="Enter branch name"
                      />
                      {errors.branchName && (
                        <p className="text-red-500 text-sm mt-2">
                          ⚠ {errors.branchName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-8">
                    {/* EMAIL */}
                    <div>
                      <label className="flex items-center font-semibold text-lg text-gray-700 mb-3">
                        <Mail className="w-5 h-5 mr-2 text-blue-600" />
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full border-2 border-gray-200 p-4 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                        placeholder="Enter email address"
                        readOnly // Email usually cannot be changed easily
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2">
                          ⚠ {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                      <label className="flex items-center font-semibold text-lg text-gray-700 mb-3">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        Description
                      </label>
                      <textarea
                        {...register("description")}
                        rows={6}
                        className="w-full border-2 border-gray-200 p-4 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg resize-none placeholder-gray-400"
                        placeholder="Enter description about your business"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-2">
                          ⚠ {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="flex justify-center pt-8 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white px-16 py-5 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-2xl font-bold text-xl flex items-center gap-3 hover:scale-105 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <Save className="w-6 h-6" />
                  <span>{loading ? "Saving..." : "Save Settings"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};