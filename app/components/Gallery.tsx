"use client";

import AnimatedSection from "./AnimatedSection";
import { MotionDiv, MotionImg } from "./MotionElements";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type GalleryItem = {
  _id: string;
  image: string[];
  title: string;
  caption?: string;
  status: boolean;
  createdAt?: string;
};

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<null | { src: string; title: string; date: string }>(null);

  // 🔹 Fetch gallery items
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/user/gallery");
        const data = await res.json();
        const active = data.filter((item: GalleryItem) => item.status === true);
        setGallery(active);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      }
    };
    fetchGallery();
  }, []);

  // 🔹 Handle responsive layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 ESC key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelected(null);
  }, []);

  useEffect(() => {
    if (selected) window.addEventListener("keydown", handleKeyDown);
    else window.removeEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, handleKeyDown]);

  // 🔹 Main carousel (desktop)
  const [mainEmblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
      dragFree: false,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
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

        {gallery.length > 0 ? (
          <>
            {/* Desktop Carousel */}
            {!isMobile && (
              <>
                <div className="embla overflow-hidden" ref={mainEmblaRef}>
                  <div className="embla__container flex gap-6">
                    {gallery.map((item, i) => (
                      <div
                        key={i}
                        className="embla__slide flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] relative group cursor-pointer"
                      >
                        {/* 🔹 Nested carousel for each gallery's image array */}
                        <NestedCarousel
                          images={item.image}
                          title={item.title}
                          onClick={(src) =>
                            setSelected({
                              src,
                              title: item.title,
                              date: new Date(item.createdAt || "").toLocaleDateString(),
                            })
                          }
                        />

                        {/* Info card */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md border border-white/30 dark:border-neutral-700/40 px-4 py-2 rounded-xl shadow-md text-center w-[80%] transition-all duration-300 group-hover:translate-y-[-4px]">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                            {item.title}
                          </h3>
                          <p className="text-xs text-vintageGold font-medium mt-0.5">
                            {new Date(item.createdAt || "").toLocaleString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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
                  {gallery.slice(0, 4).map((item, i) => (
                    <div key={i} className="relative group cursor-pointer">
                      <NestedCarousel
                        images={item.image}
                        title={item.title}
                        small
                        onClick={(src) =>
                          setSelected({
                            src,
                            title: item.title,
                            date: new Date(item.createdAt || "").toLocaleDateString(),
                          })
                        }
                      />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md border border-white/30 dark:border-neutral-700/30 px-3 py-1 rounded-md text-center w-[90%]">
                        <h3 className="text-xs font-semibold">{item.title}</h3>
                        <p className="text-[10px] text-vintageGold">
                          {new Date(item.createdAt || "").toLocaleString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
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
          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No gallery images available.</p>
        )}

        {/* Modal */}
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

                <img src={selected.src} alt={selected.title} className="w-full h-[70vh] object-cover" />

                <div className="p-5 text-center">
                  <h2 className="text-2xl font-semibold mb-1">{selected.title}</h2>
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

/* 🔹 Reusable Nested Carousel */
function NestedCarousel({
  images,
  title,
  onClick,
  small = false,
}: {
  images: string[];
  title: string;
  onClick: (src: string) => void;
  small?: boolean;
}) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
      dragFree: false,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <div className="embla overflow-hidden rounded-xl shadow-lg" ref={emblaRef}>
      <div className="embla__container flex">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="embla__slide flex-[0_0_100%] relative cursor-pointer"
            onClick={() => onClick(src)}
          >
            <MotionImg
              src={src || "/images/placeholder.jpg"}
              alt={`${title} - ${idx}`}
              className={`w-full ${small ? "h-48" : "h-64"} object-cover transition-transform duration-500 ease-out hover:scale-[1.03]`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
