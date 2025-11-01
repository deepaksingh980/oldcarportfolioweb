"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MotionDiv } from "../components/MotionElements";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  name: string;
  image: string;
  description: string;
  total?: number;
};

const categoriesData: Category[] = [
  { name: "SUV", image: "https://firebasestorage.googleapis.com/v0/b/kiacentral-dcdd7.firebasestorage.app/o/OldeCarWeb%2Fcategory%2Fsuv.jpg?alt=media&token=c38071d3-c097-4af2-90a8-c259f3a9153e", description: "Spacious and powerful for long journeys." },
  { name: "Sedan", image: "https://firebasestorage.googleapis.com/v0/b/kiacentral-dcdd7.firebasestorage.app/o/OldeCarWeb%2Fcategory%2Fsedan.avif?alt=media&token=aefd60fa-4aec-4ee3-b232-68cf28c08aa7", description: "Smooth and comfortable for city drives." },
  { name: "Hatchback", image: "https://firebasestorage.googleapis.com/v0/b/kiacentral-dcdd7.firebasestorage.app/o/OldeCarWeb%2Fcategory%2FHatchback.jpeg?alt=media&token=9dab7420-d8ce-4056-bd6f-747213b0a8c6", description: "Compact and efficient daily companions." },
  { name: "Coupe", image: "https://firebasestorage.googleapis.com/v0/b/kiacentral-dcdd7.firebasestorage.app/o/OldeCarWeb%2Fcategory%2FCoupe.jpg?alt=media&token=d1813012-ae76-4998-9b2b-67d67336a93d", description: "Sporty and stylish two-door performance machines." },
  { name: "Convertible", image: "https://firebasestorage.googleapis.com/v0/b/kiacentral-dcdd7.firebasestorage.app/o/OldeCarWeb%2Fcategory%2FConvertible.jpeg?alt=media&token=5dab798c-6d3b-4db9-9587-6ea5bffb369e", description: "Experience freedom under the open sky." },
  { name: "Pickup Truck", image: "https://firebasestorage.googleapis.com/v0/b/kiacentral-dcdd7.firebasestorage.app/o/OldeCarWeb%2Fcategory%2FPickup.jpeg?alt=media&token=d926fb46-0d8e-4222-bf70-e5f4b42c2d6e", description: "Strong and reliable for both work and adventure." },
  { name: "Crossover", image: "https://firebasestorage.googleapis.com/v0/b/kiacentral-dcdd7.firebasestorage.app/o/OldeCarWeb%2Fcategory%2FCrossover.jpeg?alt=media&token=2f3e622b-e349-4238-9817-79436e6213c5", description: "Blends SUV capability with car-like comfort." },
  { name: "Wagon", image: "https://firebasestorage.googleapis.com/v0/b/kiacentral-dcdd7.firebasestorage.app/o/OldeCarWeb%2Fcategory%2FLuxury.jpg?alt=media&token=845951b0-24db-437c-8962-f1e4621eb145", description: "Practical and spacious family-friendly vehicles." },
  { name: "Van / MPV", image: "https://firebasestorage.googleapis.com/v0/b/kiacentral-dcdd7.firebasestorage.app/o/OldeCarWeb%2Fcategory%2FVan%20%3A%20MPV.jpeg?alt=media&token=616ae59b-72b9-455b-a214-abe15c6d9569", description: "Ideal for large families and group travel." },
  { name: "Electric", image: "https://firebasestorage.googleapis.com/v0/b/kiacentral-dcdd7.firebasestorage.app/o/OldeCarWeb%2Fcategory%2FElectric.webp?alt=media&token=77dc2a6e-67c4-4a25-8888-d55a8c5df2ff", description: "Eco-friendly and futuristic electric mobility." },
];

export default function CategoryCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState<Category[]>(categoriesData);

  // ✅ Initialize Embla with smoother behavior
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
      dragFree: false,
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const res = await fetch("/api/user/category-count");
        const data = await res.json();

        if (!data || !Array.isArray(data.counts)) return;

        const updated = categoriesData.map((cat) => {
          const found = data.counts.find(
            (item: any) => item.category.toLowerCase() === cat.name.toLowerCase()
          );
          return {
            ...cat,
            total: found ? found.total : 0,
          };
        });

        setCategories(updated);
      } catch (err) {
        console.error("Error fetching category counts:", err);
      }
    };

    fetchCategoryCounts();
  }, []);


  return (
    <AnimatedSection>
      <section className="max-w-6xl mx-auto px-6 py-16 relative">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-2">Explore by Category</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through our diverse range of car types and find your perfect match.
          </p>
        </div>

        {/* ✅ Desktop Carousel */}
        {!isMobile && (
          <div className="relative">
            <div className="embla overflow-hidden" ref={emblaRef}>
              <MotionDiv
                className="embla__container flex gap-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="embla__slide flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%]"
                  >
                    <Link href={`/cars?category=${cat.name}`}>
                      <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          width={400}
                          height={250}
                          className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500"></div>

                        <div className="absolute bottom-0 p-4 text-white">
                          <h3 className="text-lg font-semibold mb-1">
                            {cat.name}
                          </h3>
                          <p className="text-sm opacity-80">{cat.description}</p>
                          <p className="mt-2 text-xs opacity-70">
                            {cat.total !== undefined
                              ? `${cat.total} Cars Available`
                              : "Loading..."}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </MotionDiv>
            </div>

            {/* Gradient edge for aesthetics */}
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
          </div>
        )}

        {/* ✅ Mobile Grid */}
        {isMobile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/cars?category=${cat.name}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={400}
                    height={250}
                    className="object-cover w-full h-48"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute bottom-0 p-3 text-white">
                    <h3 className="font-semibold text-lg">{cat.name}</h3>
                    <p className="text-xs opacity-80">
                      {cat.total !== undefined ? `${cat.total} Cars` : "Loading..."}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Explore All link */}
        <div className="flex justify-center mt-10">
          <Link
            href="/cars"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all duration-300"
          >
            Explore All Cars <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </AnimatedSection>
  );
}
