"use client";

import AnimatedSection from "./AnimatedSection";
import { cars } from "../data/carsData";
import CarCard from "./CarCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MotionDiv } from "../components/MotionElements";
import { ArrowRight } from "lucide-react";

export default function FeaturedCars() {
  const recentCars = [...cars].slice(-5).reverse();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Embla Carousel for desktop
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 4000 })]
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

        {/* ✅ Desktop Carousel */}
        {!isMobile && (
          <>
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <MotionDiv
                  className="flex gap-6"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {recentCars.map((car) => (
                    <div
                      key={car.id}
                      className="min-w-[80%] sm:min-w-[45%] lg:min-w-[30%]"
                    >
                      <CarCard car={car} />
                    </div>
                  ))}
                </MotionDiv>
              </div>

              {/* Subtle right fade */}
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
            </div>

            {/* Explore All link */}
            <div className="flex justify-center mt-10">
              <Link
                href="/cars"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-300"
              >
                Explore All <ArrowRight size={18} />
              </Link>
            </div>
          </>
        )}

        {/* ✅ Mobile Grid */}
        {isMobile && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentCars.map((car) => (
                <CarCard key={car.id} car={car} />
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
