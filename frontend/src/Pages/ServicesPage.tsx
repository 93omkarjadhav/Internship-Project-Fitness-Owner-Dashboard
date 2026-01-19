// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// const services = [
//    {
//     title: "Strength Training",
//     price: "₹120.00",
//     reviews: 131,
//     image: "/Image (4).png",
//     photos: [
//       "/st2.jpg",
//      "/s1.jpg",
     
//     ]
//   },
//   {
//     title: "Cardio",
//     price: "₹120.00",

//     reviews: 131,
//     image: "/Image (5).png",
//   },
//   {
//     title: "Yoga & Meditation",
//     price: "₹120.00",

//     reviews: 131,
//     image: "/Image (6).png",
//   },
//   {
//     title: "Calisthenics",
//     price: "₹120.00",

//     reviews: 131,
//     image: "/Image (9).png",
//   },
//   {
//     title: "Zumba",
//     price: "₹120.00",

//     reviews: 131,
//     image: "/Image (8).png",
//   },
//   {
//     title: "Kick Boxing",
//     price: "₹120.00",

//     reviews: 131,
//     image: "/Image (7).png",
//   },
// ];

// const ServicesPage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/");
//   };
//   const [isEditOpen, setIsEditOpen] = React.useState(false);
//   const [selectedService, setSelectedService] = React.useState<any>(null);
//   const [serviceName, setServiceName] = React.useState("");
//   const [servicePrice, setServicePrice] = React.useState("");

//   // FIX: Missing states added
//   const [serviceDescription, setServiceDescription] = React.useState("");
//   const [showExploreOptions, setShowExploreOptions] = React.useState(false);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB]">
//       {/* SHARED SIDEBAR */}
//       {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

//       {/* MAIN CONTENT START */}
//       <main className="flex-1 p-6">
//         <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

//         <h1 className="text-2xl font-semibold mt-6">Services</h1>

//         {/* SERVICES GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-sm p-4 flex flex-col"
//             >
//               <img
//                 src={service.image}
//                 className="w-full h-75 object-cover rounded-xl"
//               />
//               <div className="mt-4 flex justify-between items-start">
//                 <div>
//                   <h3 className="font-semibold text-lg">{service.title}</h3>
//                   <p className="text-blue-600 font-medium">{service.price}</p>
//                 </div>
                
//               </div>

//               <button
//                 onClick={() => {
//                   setSelectedService(service);
//                   setServiceName(service.title);
//                   setServicePrice(service.price.startsWith("₹") ? service.price : "₹" + service.price);

//                   setIsEditOpen(true);
//                 }}
//                 className="mt-auto bg-blue-100 text-blue-600 w-fit px-4 py-2 rounded-lg text-sm font-medium"
//               >
//                 Edit Service
//               </button>
//             </div>
//           ))}
//         </div>
//         {/* ---------------- EDIT MODAL SECTION ---------------- */}
//         {isEditOpen && (
//           <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//             <div className="bg-white w-[380px] p-6 rounded-xl shadow-lg">
//               <h2 className="text-xl font-semibold mb-4">Edit {serviceName}</h2>

//               {/* DESCRIPTION BOX - NEW */}
//               <label className="text-sm text-gray-600">Description</label>
//               <textarea
//                 value={serviceDescription}
//                 onChange={(e) => setServiceDescription(e.target.value)}
//                 className="w-full mt-1 p-2 border rounded-lg bg-gray-50"
//                 placeholder="Enter service description..."
//                 rows={3}
//               ></textarea>

//               {/* PRICE INPUT */}
//               <label className="text-sm text-gray-600 mt-4 block">
//                 Service Price
//               </label>
//               <input
//   value={servicePrice}
//   onChange={(e) => {
//     let val = e.target.value.replace("₹", ""); // remove existing ₹
//     setServicePrice("₹" + val); // add ₹ at the start
//   }}
//   className="w-full mt-1 p-2 border rounded-lg bg-gray-50"
// />

//               {/* EXPLORE MORE BUTTON - NEW */}
//               <button
//                 className="mt-4 w-full bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-medium"
//                 onClick={() => setShowExploreOptions(!showExploreOptions)}
//               >
//                 Explore More
//               </button>

//               {/* EXPLORE OPTIONS (VIDEO / PHOTOS) */}
//               {showExploreOptions && (
//                 <div className="mt-3 p-3 border rounded-lg bg-gray-50">
//                   <h3 className="font-medium mb-2">Choose Option</h3>

//                   <button
//                     className="w-full mb-2 bg-blue-600 text-white py-2 rounded-lg text-sm"
//                     onClick={() => document.getElementById("photoPicker")?.click()}
//                   >
//                     Show Videos
//                   </button>
// <input
//   type="file"
//   accept="image/*"
//   id="photoPicker"
//   className="hidden"
//   onChange={(e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       alert("Photo selected: " + file.name);
//       // You can upload the photo here
//     }
//   }}
// />

// <button
//   className="w-full bg-green-600 text-white py-2 rounded-lg text-sm"
//   onClick={() => navigate("/gallery", { state: { photos: selectedService.photos, title: selectedService.title } })}
// >
//   upload Photos
// </button>


//                 </div>
//               )}

//               {/* REMOVE SERVICE */}
//               <button
//                 className="mt-4 text-red-500 underline text-sm"
//                 onClick={() => {
//                   alert("Service removed");
//                   setIsEditOpen(false);
//                 }}
//               >
//                 Remove Service
//               </button>

//               {/* ACTION BUTTONS */}
//               <div className="flex justify-end mt-6 gap-3">
//                 <button
//                   className="px-4 py-2 text-gray-600"
//                   onClick={() => setIsEditOpen(false)}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//                   onClick={() => {
//                     alert("Service saved");
//                     setIsEditOpen(false);
//                   }}
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ServicesPage;

//22222222connected to backend admin service routes
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import adminApi from "../api/adminApi"; // ✨ Import Admin API

// interface Service {
//   id: number; // Added ID for DB updates
//   title: string; // Maps to 'name' from DB
//   description: string;
//   price: string;
//   images: string[];
// }

// const ServicesPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   // ✨ STATE: Dynamic Data
//   const [services, setServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);

//   // Edit Modal State
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);

//   // Form State
//   const [serviceName, setServiceName] = useState("");
//   const [serviceDescription, setServiceDescription] = useState("");
//   const [servicePrice, setServicePrice] = useState("");

//   const [imageIndexes, setImageIndexes] = useState<number[]>([]);

//   // ✨ FETCH SERVICES ON LOAD
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const res = await adminApi.get("/services");
//       // Map DB response (name -> title)
//       const mappedServices = res.data.map((s: any) => ({
//         id: s.id,
//         title: s.name,
//         description: s.description,
//         price: `₹${s.price}`,
//         images: s.images.length > 0 ? s.images : ["/Image (4).png"] // Fallback image
//       }));
//       setServices(mappedServices);
//       setImageIndexes(new Array(mappedServices.length).fill(0));
//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to load services", error);
//       setLoading(false);
//     }
//   };

//   // ✨ HANDLE SAVE CHANGES (Update Details)
//   const handleSaveChanges = async () => {
//     if (!selectedService) return;

//     try {
//       // 1. Update in DB
//       await adminApi.put(`/services/${selectedService.id}/details`, {
//         name: serviceName,
//         description: serviceDescription,
//         price: servicePrice.replace("₹", "") // Send number only
//       });

//       // 2. Update Local State
//       const updatedServices = services.map(s => 
//         s.id === selectedService.id 
//           ? { ...s, title: serviceName, description: serviceDescription, price: servicePrice }
//           : s
//       );
//       setServices(updatedServices);
//       setIsEditOpen(false);
//       alert("Service updated successfully!");

//     } catch (error) {
//       console.error("Update failed", error);
//       alert("Failed to update service details");
//     }
//   };

//   // ✨ HANDLE IMAGE UPLOAD
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || !selectedService) return;

//     const formData = new FormData();
//     Array.from(files).forEach(file => {
//       formData.append("images", file);
//     });

//     setUploading(true);

//     try {
//       // 1. Upload to Backend -> Cloudinary
//       const res = await adminApi.post(`/services/${selectedService.id}/images`, formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       const newUrls = res.data.urls;

//       // 2. Update Local State (Immediate UI Refresh)
//       const updatedServices = services.map(s => {
//         if (s.id === selectedService.id) {
//           // If previously showing fallback image, replace it entirely
//           const currentImages = s.images[0].includes("/Image") && s.images.length === 1 
//             ? [] 
//             : s.images;
          
//           return { ...s, images: [...currentImages, ...newUrls] };
//         }
//         return s;
//       });

//       setServices(updatedServices);
      
//       // Also update the modal's selected service so we can upload more if needed
//       setSelectedService(updatedServices.find(s => s.id === selectedService.id) || null);
      
//       alert("Photos uploaded successfully!");

//     } catch (error) {
//       console.error("Upload failed", error);
//       alert("Failed to upload images");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
//       {isSidebarOpen && (
//         <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
//       )}

//       <main className="flex-1 p-6">
//         <Header toggleSidebar={() => setIsSidebarOpen((p) => !p)} />

//         <h1 className="text-3xl font-bold mt-6 text-gray-800">Services Management</h1>

//         {loading ? (
//             <p className="text-center mt-12 text-gray-500">Loading services...</p>
//         ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
//           {services.map((service, index) => (
//             <div
//               key={service.id}
//               className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
//             >
//               {/* IMAGE SLIDER */}
//               <div className="w-full h-56 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
//                 <img
//                   src={service.images[imageIndexes[index]] || "/Image (4).png"}
//                   alt={service.title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => { e.currentTarget.src = "/Image (4).png" }}
//                 />
//               </div>

//               {/* DOTS */}
//               {service.images.length > 1 && (
//                 <div className="flex justify-center gap-2 mt-4">
//                   {service.images.map((_, dotIndex) => (
//                     <button
//                       key={dotIndex}
//                       onClick={() => {
//                         const updated = [...imageIndexes];
//                         updated[index] = dotIndex;
//                         setImageIndexes(updated);
//                       }}
//                       className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
//                         imageIndexes[index] === dotIndex
//                           ? "bg-blue-600 scale-125"
//                           : "bg-gray-300 hover:bg-gray-400"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               )}

//               <div className="mt-6 flex-grow">
//                 <h3 className="font-bold text-xl text-gray-800 mb-2">{service.title}</h3>
//                 <p className="text-sm text-gray-600 leading-relaxed mb-3">
//                   {service.description}
//                 </p>
//                 <p className="text-blue-600 font-bold text-lg">
//                   {service.price}
//                 </p>
//               </div>

//               <button
//                 onClick={() => {
//                   setSelectedService(service);
//                   setServiceName(service.title);
//                   setServiceDescription(service.description);
//                   setServicePrice(service.price);
//                   setIsEditOpen(true);
//                 }}
//                 className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
//               >
//                 Edit Service
//               </button>
//             </div>
//           ))}
//         </div>
//         )}

//         {isEditOpen && selectedService && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//             <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-100">
//               <h2 className="text-2xl font-bold mb-6 text-gray-800">
//                 Edit {serviceName}
//               </h2>

//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700 block mb-2">Service Name</label>
//                   <input
//                     value={serviceName}
//                     onChange={(e) => setServiceName(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                     placeholder="Enter service name"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700 block mb-2">Description</label>
//                   <textarea
//                     value={serviceDescription}
//                     onChange={(e) => setServiceDescription(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
//                     rows={3}
//                     placeholder="Enter service description"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700 block mb-2">Service Price</label>
//                   <input
//                     value={servicePrice}
//                     onChange={(e) => {
//                       const val = e.target.value.replace("₹", "");
//                       setServicePrice("₹" + val);
//                     }}
//                     className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                     placeholder="Enter price"
//                   />
//                 </div>

//                 {/* Upload Section */}
//                 <div className="p-4 border border-gray-300 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     id="photoInput"
//                     className="hidden"
//                     onChange={handleImageUpload}
//                     disabled={uploading}
//                   />

//                   <button
//                     className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
//                     onClick={() => document.getElementById("photoInput")?.click()}
//                     disabled={uploading}
//                   >
//                      {uploading ? "Uploading..." : "Upload Photos"}
//                   </button>
//                   <p className="text-xs text-center text-gray-500 mt-2">Multiple images supported</p>
//                 </div>
//               </div>

//               <div className="flex justify-end mt-8 gap-3">
//                 <button
//                   className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 font-medium"
//                   onClick={() => setIsEditOpen(false)}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
//                   onClick={handleSaveChanges}
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ServicesPage;

//33333333enhanced upload section
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import adminApi from "../api/adminApi"; // ✨ Import API

interface Service {
  id?: number; // ✨ Added optional ID for backend linking
  title: string;
  description: string;
  price: string;
  images: string[];
  staticImages?: string[]; // To keep track of original local images
}

// Your original static data
const initialServices: Service[] = [
  {
    title: "Strength Training",
    description: "Build muscle strength and endurance.",
    price: "₹120.00",
    images: ["/Image (4).png", "/st2.jpg", "/s1.jpg"],
  },
  {
    title: "Cardio",
    description: "Improve heart health and stamina.",
    price: "₹120.00",
    images: ["/Image (5).png"],
  },
  {
    title: "Yoga & Meditation",
    description: "Relax your mind and body.",
    price: "₹120.00",
    images: ["/Image (6).png"],
  },
  {
    title: "Calisthenics",
    description: "Enhance body control and flexibility.",
    price: "₹120.00",
    images: ["/Image (9).png"],
  },
  {
    title: "Zumba",
    description: "High-energy dance fitness workout.",
    price: "₹120.00",
    images: ["/Image (8).png"],
  },
  {
    title: "Kick Boxing",
    description: "Powerful cardio and self-defense training.",
    price: "₹120.00",
    images: ["/Image (7).png"],
  },
];

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  // Initialize with your static data, preserving original images separately
  const [services, setServices] = useState<Service[]>(
    initialServices.map(s => ({ ...s, staticImages: [...s.images] }))
  );
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Form State
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  // Tracks active slide for each card
  const [imageIndexes, setImageIndexes] = useState<number[]>(
    initialServices.map(() => 0)
  );

  // ✨ FETCH & MERGE DATA ON LOAD
  useEffect(() => {
    const fetchAndMergeServices = async () => {
      try {
        const res = await adminApi.get("/services");
        const backendServices = res.data;

        setServices((prevServices) => 
          prevServices.map((localService) => {
            // Find matching service from backend (by Name/Title)
            const backendMatch = backendServices.find(
              (bs: any) => bs.name.toLowerCase() === localService.title.toLowerCase()
            );

            if (backendMatch) {
              // ✨ MERGE LOGIC:
              // 1. Keep static images first
              // 2. Append backend (Cloudinary) images after
              const combinedImages = [
                ...(localService.staticImages || []), 
                ...backendMatch.images
              ];

              return {
                ...localService,
                id: backendMatch.id, // Attach ID for updates
                description: backendMatch.description || localService.description, // Prefer backend text
                price: `₹${backendMatch.price}`, // Prefer backend price
                images: combinedImages
              };
            }
            return localService;
          })
        );
      } catch (error) {
        console.error("Failed to sync with backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMergeServices();
  }, []);

  // ✨ HANDLE SAVE CHANGES (API Call)
  const handleSaveChanges = async () => {
    if (selectedIndex === null) return;
    const currentService = services[selectedIndex];

    // Optimistic Update (Update UI immediately)
    const updated = [...services];
    updated[selectedIndex] = {
      ...currentService,
      title: serviceName,
      description: serviceDescription,
      price: servicePrice,
    };
    setServices(updated);
    setIsEditOpen(false);

    // API Call (if connected to DB)
    if (currentService.id) {
      try {
        await adminApi.put(`/services/${currentService.id}/details`, {
          name: serviceName,
          description: serviceDescription,
          price: servicePrice.replace("₹", ""),
        });
        alert("Changes saved to database! ✅");
      } catch (error) {
        console.error("Failed to save to DB", error);
        alert("Updated locally, but failed to save to database.");
      }
    } else {
      console.warn("Service not found in DB, skipping API update.");
    }
  };

  // ✨ HANDLE IMAGE UPLOAD (API Call)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || selectedIndex === null) return;
    const currentService = services[selectedIndex];

    // If service doesn't exist in DB yet, show warning
    if (!currentService.id) {
      alert("This service is not linked to the database yet. Cannot upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      // 1. Upload to Backend
      const res = await adminApi.post(`/services/${currentService.id}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newCloudinaryUrls = res.data.urls;

      // 2. Update Local State
      const updated = [...services];
      updated[selectedIndex].images = [
        ...updated[selectedIndex].images, 
        ...newCloudinaryUrls
      ];
      setServices(updated);
      
      alert("Photos uploaded successfully! 📸");

    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload images.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}

      <main className="flex-1 p-6">
        <Header toggleSidebar={() => setIsSidebarOpen((p) => !p)} />

        <h1 className="text-3xl font-bold mt-6 text-gray-800">Services Management</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              {/* IMAGE SLIDER */}
              <div className="w-full h-56 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative group">
                <img
                  src={service.images[imageIndexes[index]]}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.currentTarget.src = "/Image (4).png" }}
                />
              </div>

              {/* DOTS */}
              {service.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4 flex-wrap">
                  {service.images.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => {
                        const updated = [...imageIndexes];
                        updated[index] = dotIndex;
                        setImageIndexes(updated);
                      }}
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                        imageIndexes[index] === dotIndex
                          ? "bg-blue-600 scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="mt-6 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl text-gray-800 mb-2">{service.title}</h3>
                    {/* Visual indicator if connected to DB */}
                    {/*service.id && <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">LIVE</span>*/}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {service.description}
                </p>
                <p className="text-blue-600 font-bold text-lg">
                  {service.price}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedIndex(index);
                  setServiceName(service.title);
                  setServiceDescription(service.description);
                  setServicePrice(service.price);
                  setIsEditOpen(true);
                }}
                className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Edit Service
              </button>
            </div>
          ))}
        </div>

        {isEditOpen && selectedIndex !== null && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Edit {serviceName}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Service Name</label>
                  <input
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter service name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Description</label>
                  <textarea
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    rows={3}
                    placeholder="Enter service description"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Service Price</label>
                  <input
                    value={servicePrice}
                    onChange={(e) => {
                      const val = e.target.value.replace("₹", "");
                      setServicePrice("₹" + val);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter price"
                  />
                </div>

                <div className="p-4 border border-gray-300 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    id="photoInput"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />

                  <button
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => document.getElementById("photoInput")?.click()}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading to Cloud..." : "Upload Photos"}
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-2">
                     Images will be added after your current photos
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-8 gap-3">
                <button
                  className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 font-medium"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ServicesPage;