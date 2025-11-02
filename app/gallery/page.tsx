"use client";

import { useState, useEffect, useCallback } from "react";
import AnimatedSection from "../components/AnimatedSection";
import { MotionDiv, MotionImg } from "../components/MotionElements";
import {  AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryItems = [
  {
    src: "gallery1.jpg",
    title: "Vintage Mustang",
    date: "October 2025",
    desc: "A symbol of American muscle — perfectly restored to its golden glory.",
  },
  {
    src: "gallery2.jpg",
    title: "Classic Rolls Royce",
    date: "September 2025",
    desc: "Luxury that transcends generations with timeless craftsmanship.",
  },
  {
    src: "gallery3.jpg",
    title: "Retro Mercedes",
    date: "August 2025",
    desc: "Elegance and engineering precision in a masterpiece of design.",
  },
  {
    src: "gallery4.jpg",
    title: "Heritage Jeep",
    date: "July 2025",
    desc: "A rugged icon reborn — celebrating freedom and adventure.",
  },
  {
    src: "gallery5.jpg",
    title: "Chevrolet Beauty",
    date: "June 2025",
    desc: "A beloved classic with a new shine and a nostalgic heartbeat.",
  },
  {
    src: "gallery6.jpg",
    title: "Fiat Vintage",
    date: "May 2025",
    desc: "Small yet iconic — this retro Fiat turns heads wherever it goes.",
  },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<null | (typeof galleryItems)[0]>(null);

  // Close on ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelected(null);
  }, []);

  useEffect(() => {
    if (selected) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, handleKeyDown]);

  return (
    <AnimatedSection>
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-semibold mb-3">Our Classic Gallery</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collection of timeless masterpieces — restored with precision and passion.
          </p>
        </div>

        {/* Gallery Grid */}
        <MotionDiv
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {galleryItems.map((item, i) => (
            <MotionDiv
              key={i}
              onClick={() => setSelected(item)}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-neutral-900 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Image */}
              <div className="relative">
                <MotionImg
                  src={`/images/${item.src}`}
                  alt={item.title}
                  className="w-full h-72 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[85%] bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md rounded-xl p-4 shadow-md text-center transition-all duration-500 group-hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="text-xs text-vintageGold">{item.date}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Modal Preview */}
        <AnimatePresence>
          {selected && (
            <MotionDiv
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <MotionDiv
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-3xl w-full bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <img
                  src={`/images/${selected.src}`}
                  alt={selected.title}
                  className="w-full h-[70vh] object-cover"
                />
                <div className="p-5 text-center">
                  <h2 className="text-2xl font-semibold mb-1">{selected.title}</h2>
                  <p className="text-sm text-vintageGold">{selected.date}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{selected.desc}</p>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center mt-20">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Every frame captures legacy — experience automotive art in motion.
          </p>
        </div>
      </section>
    </AnimatedSection>
  );
}
