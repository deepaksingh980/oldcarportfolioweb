"use client";

import AnimatedSection from "./AnimatedSection";
import { MotionDiv, MotionImg } from "./MotionElements";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [selected, setSelected] = useState<null | {
    src: string;
    title: string;
    date: string;
  }>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const images = [
    { src: "gallery1.jpg", title: "Vintage Mustang", date: "Oct 2025" },
    { src: "gallery2.jpg", title: "Classic Rolls Royce", date: "Sept 2025" },
    { src: "gallery3.jpg", title: "Retro Mercedes", date: "Aug 2025" },
    { src: "gallery4.jpg", title: "Heritage Jeep", date: "July 2025" },
    { src: "gallery5.jpg", title: "Chevrolet Beauty", date: "June 2025" },
  ];

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 3500 })]
  );

  return (
    <AnimatedSection>
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-2">Gallery Highlights</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            A glimpse into our hand-restored collection of vintage legends.
          </p>
        </div>

        {/* Desktop Carousel */}
        {!isMobile && (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <MotionDiv
                className="flex gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelected(img)}
                    className="relative min-w-[80%] sm:min-w-[45%] lg:min-w-[30%] group cursor-pointer"
                  >
                    <MotionImg
                      src={`/images/${img.src}`}
                      alt={img.title}
                      className="rounded-xl shadow-lg w-full h-64 object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    {/* Floating Info Card */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md border border-white/30 dark:border-neutral-700/40 px-4 py-2 rounded-xl shadow-md text-center w-[80%] transition-all duration-300 group-hover:translate-y-[-4px]">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {img.title}
                      </h3>
                      <p className="text-xs text-vintageGold font-medium mt-0.5">
                        {img.date}
                      </p>
                    </div>
                  </div>
                ))}
              </MotionDiv>
            </div>

            {/* Explore Link */}
            <div className="flex justify-center mt-10">
              <Link
                href="/gallery"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-300"
              >
                Explore Full Gallery <ArrowRight size={18} />
              </Link>
            </div>
          </>
        )}

        {/* Mobile Grid */}
        {isMobile && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelected(img)}
                  className="relative group cursor-pointer"
                >
                  <MotionImg
                    src={`/images/${img.src}`}
                    alt={img.title}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-lg shadow-md w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md border border-white/30 dark:border-neutral-700/30 px-3 py-1 rounded-md text-center w-[90%]">
                    <h3 className="text-xs font-semibold">{img.title}</h3>
                    <p className="text-[10px] text-vintageGold">{img.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link
                href="/gallery"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-300"
              >
                Explore Full Gallery <ArrowRight size={18} />
              </Link>
            </div>
          </>
        )}

        {/* 🔥 Image Modal */}
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
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
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
                  <h2 className="text-2xl font-semibold mb-1">
                    {selected.title}
                  </h2>
                  <p className="text-sm text-vintageGold">{selected.date}</p>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>
      </section>
    </AnimatedSection>
  );
}
