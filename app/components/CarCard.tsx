"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Define the expected structure of a car object
interface Car {
  id: string | number;
  name: string;
  year: number;
  manufacturer: string;
  price: string;
  images: string[];
}

// Properly typed motion component to avoid TypeScript issues
const MotionArticle = motion.article as React.FC<
  React.HTMLAttributes<HTMLElement> & { whileHover?: any }
>;

export default function CarCard({ car }: { car: Car }) {
  return (
    <MotionArticle
      whileHover={{ scale: 1.03 }}
      className="card p-4 bg-white rounded-xl shadow transition-transform duration-200"
    >
      <img
        src={car.images?.[0]}
        alt={car.name}
        className="w-full h-44 object-cover rounded-lg"
      />

      <div className="mt-3">
        <h3 className="font-semibold text-lg">{car.name}</h3>
        <p className="text-sm text-gray-500">
          {car.year} • {car.manufacturer}
        </p>

        <div className="mt-3 flex justify-between items-center">
          <Link
            href={`/cars/${car.id}`}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            View Details
          </Link>
          <div className="text-sm font-semibold text-gray-800">
            {car.price}
          </div>
        </div>
      </div>
    </MotionArticle>
  );
}
