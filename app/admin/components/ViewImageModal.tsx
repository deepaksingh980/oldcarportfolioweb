"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ViewImageModal({
  images = [],
  onClose,
}: {
  images: string[];
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const prevImage = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ❌ Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-white hover:text-red-400 transition"
          style={{
            cursor: "pointer", // ✅ ensures pointer appears
            background: "none",
            border: "none",
            padding: "6px",
            lineHeight: 0,
          }}
        >
          <X
            size={30}
            strokeWidth={2.5}
            style={{ pointerEvents: "auto", cursor: "pointer" }} // ✅ also force pointer on icon
          />
        </button>

        {/* 🖼️ Image Display */}
        <div className="relative flex items-center justify-center">
          <img
            src={images[index]}
            alt="Gallery Image"
            className="max-h-[80vh] w-auto rounded-lg shadow-lg object-contain"
          />

          {images.length > 1 && (
            <>
              {/* ⬅️ Prev */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 bg-black/40 p-2 rounded-full hover:bg-black/60 text-white"
                style={{ cursor: "pointer" }}
              >
                <ChevronLeft size={28} />
              </button>

              {/* ➡️ Next */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 bg-black/40 p-2 rounded-full hover:bg-black/60 text-white"
                style={{ cursor: "pointer" }}
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
        </div>

        {/* Counter */}
        {images.length > 1 && (
          <div className="text-center text-gray-300 mt-4">
            {index + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
