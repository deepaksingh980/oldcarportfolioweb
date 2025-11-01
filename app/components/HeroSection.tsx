"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  MotionSection,
  MotionH1,
  MotionP,
  MotionDiv,
  MotionImg,
} from "./MotionElements";

interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  image: string[]; // array of image URLs
}

export default function HeroSection() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch active banner(s)
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("/api/user/active-banner");


        // Ensure always array (even if API returns single object)
        setBanners(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
    fetchBanners();
  }, []);

  const banner = banners[currentBannerIndex] || null;

  // Auto-slide images every 5 seconds
  useEffect(() => {
    if (!banner?.image?.length) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % banner.image.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banner]);

  // Debug current image
  // useEffect(() => {
  //   if (banner?.image?.length)
  //     console.log("Current image:", banner.image[currentImageIndex]);
  // }, [banner, currentImageIndex]);

  return (
    <MotionSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <MotionImg
          key={banner?.image?.[currentImageIndex] || "/hero.jpg"}
          src={banner?.image?.[currentImageIndex] || "/hero.jpg"}
          alt={banner?.title || "vintage car"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-10" />

      {/* Text Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
        <MotionH1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white"
        >
          {banner?.title || "Timeless Classics. Modern Passion."}
        </MotionH1>

        <MotionP
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-4 text-lg max-w-2xl mx-auto text-neutral-200"
        >
          {banner?.subtitle ||
            "Step into our world of iconic vintage automobiles — where every curve tells a story."}
        </MotionP>

        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Link
            href="/cars"
            className="px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-white/10 transition"
          >
            View Cars
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-full bg-vintageGold text-black font-medium"
          >
            About Us
          </Link>
        </MotionDiv>
      </div>

      {/* Dots for multiple images */}
      {banner?.image?.length && banner.image.length > 1 && (
        <div className="absolute bottom-6 z-30 flex justify-center w-full gap-2">
          {banner.image.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                i === currentImageIndex
                  ? "bg-vintageGold scale-125"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </MotionSection>
  );
}
