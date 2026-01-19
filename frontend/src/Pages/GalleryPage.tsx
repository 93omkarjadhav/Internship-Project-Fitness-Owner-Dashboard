import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface GalleryState {
  photos: string[];
  title: string;
}

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();

const serviceDescriptions: string[] = [
  "Weight Training focuses on muscle strength, endurance, and power.",
  "High-intensity Crossfit workouts designed for full-body conditioning.",
  "Boost stamina and burn calories effectively with advanced cardio.",
  "Calisthenics training for flexibility and body-weight strength.",
  "Fun, energetic dance movements for full-body fitness.",
  "Kick Boxing improves self-defense, agility, and cardiovascular health."
];

  const location = useLocation();
  const state = (location.state as GalleryState) || {
    photos: [],
    title: "Gallery",
  };

  const { photos, title } = state;

  return (
    <div className="p-6">
   <button
  className="mb-4 p-2 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
  onClick={() => navigate(-1)}
>
  <ArrowLeft size={20} />
</button>


      <h1 className="text-2xl font-semibold mb-4">{title} Photos</h1>

      {photos.length === 0 ? (
        <p>No photos available.</p>
      ) : (
       <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
  {photos.map((photo, index) => (
    <div
      key={index}
      className="relative rounded-xl overflow-hidden shadow-md"
    >
      {/* Bigger Image */}
      <img
        src={photo}
        alt={title}
        className="w-full h-64 object-cover" // increased height
      />

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-white text-sm font-semibold">
          {title}
        </p>

        {/* NEW: Separate Description for Each Service */}
        <p className="text-gray-200 text-xs">
          {serviceDescriptions[index] || "Premium fitness training for all levels."}
        </p>
      </div>
    </div>
  ))}
</div>


      )}
    </div>
  );
};

export default GalleryPage;
