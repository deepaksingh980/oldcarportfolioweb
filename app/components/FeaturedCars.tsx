"use client";

import AnimatedSection from "./AnimatedSection";
import CarCard from "./CarCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MotionDiv } from "../components/MotionElements";
import { ArrowRight } from "lucide-react";

type Car = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  brand?: string | { name: string };
  actualPrice?: number;
  discountedPrice?: number;
};

export default function FeaturedCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/user/all-cars");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCars(data.slice(0, 5));
        }
      } catch (error) {
        console.error("❌ Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  // ✅ Handle responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Embla Carousel Setup
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
      dragFree: false,
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <AnimatedSection>
      <section className="max-w-6xl mx-auto px-6 py-16 relative">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-2">Recently Added Cars</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the latest additions to our collection of timeless classics.
          </p>
        </div>

        {/* Loading state */}
        {cars.length === 0 ? (
          <p className="text-center text-gray-500">Loading cars...</p>
        ) : !isMobile ? (
          <>
            {/* ✅ Smooth Carousel */}
            <div className="relative">
              <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                  {cars.map((car) => (
                    <div
                      key={car._id}
                      className="embla__slide flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] px-2"
                    >
                      <MotionDiv
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CarCard car={car} />
                      </MotionDiv>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fade edge */}
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
            </div>

            {/* Explore all */}
            <div className="flex justify-center mt-10">
              <Link
                href="/cars"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-300"
              >
                Explore All <ArrowRight size={18} />
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Mobile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link
                href="/cars"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-300"
              >
                Explore All <ArrowRight size={18} />
              </Link>
            </div>
          </>
        )}
      </section>
    </AnimatedSection>
  );
}
