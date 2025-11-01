"use client";

import { useState } from "react";

export default function CarImages({ car }: { car: any }) {
  const [selectedImage, setSelectedImage] = useState(car.images?.[0]);

  if (!car.images?.length) return null;

  return (
    <div>
      {/* MAIN IMAGE */}
      <div className="relative">
        <img
          src={selectedImage}
          alt={car.name}
          className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-lg transition-all duration-300"
        />
        <span className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 text-xs rounded-full">
          {car.category}
        </span>
      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 flex gap-3 overflow-x-auto">
        {car.images.map((img: string, i: number) => (
          <img
            key={i}
            src={img}
            alt={`${car.name} ${i + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`w-24 h-16 sm:w-28 sm:h-20 object-cover rounded-lg cursor-pointer transition 
              hover:opacity-80 border-2 ${
                selectedImage === img
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
