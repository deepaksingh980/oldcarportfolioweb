"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MotionDiv } from "../components/MotionElements";
const categories = [
  {
    name: "Sedan",
    image: "/categories/sedan.jpg",
    description: "Smooth and comfortable for city drives.",
    total: 8,
  },
  {
    name: "SUV",
    image: "/categories/suv.jpg",
    description: "Spacious and powerful for long journeys.",
    total: 6,
  },
  {
    name: "Hatchback",
    image: "/categories/hatchback.jpg",
    description: "Compact and efficient daily companions.",
    total: 7,
  },
  {
    name: "Convertible",
    image: "/categories/convertible.jpg",
    description: "Experience freedom under the open sky.",
    total: 3,
  },
];

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <MotionDiv
            key={cat.name}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all group"
          >
            <Link href={`/cars?category=${encodeURIComponent(cat.name)}`}>
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-5">
                <h3 className="text-white text-lg font-semibold">
                  {cat.name}
                </h3>
                <p className="text-gray-200 text-sm">{cat.description}</p>
                <span className="text-xs text-gray-300 mt-1">
                  {cat.total} cars
                </span>
              </div>
            </Link>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
