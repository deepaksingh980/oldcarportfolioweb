"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MotionArticle } from "./MotionElements";

export interface Car {
  _id?: string;
  id?: string | number;
  name: string;
  slug?: string;
  brand?: string | { name: string };
  year?: number;
  category?: string;
  ownerType?: string;
  actualPrice?: number;
  discountedPrice?: number;
  status?: "Available" | "Sold" | string;
  images: string[];
}

export default function CarCard({ car }: { car: Car }) {
  const brandName =
    typeof car.brand === "object" ? car.brand?.name : car.brand || "Unknown";

  const formattedPrice = car.discountedPrice
    ? new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(car.discountedPrice)
    : "N/A";

  const originalPrice = car.actualPrice
    ? new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(car.actualPrice)
    : "";

  const getStatusClasses = (status?: string) => {
    if (!status) return "hidden";
    const s = status.toLowerCase();
    if (s === "available")
      return "bg-green-100 text-green-700 border border-green-200";
    if (s === "sold")
      return "bg-red-100 text-red-700 border border-red-200";
    return "bg-gray-100 text-gray-700 border border-gray-200";
  };

  return (
    <MotionArticle
      whileHover={{ scale: 1.03 }}
      className="p-4 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl shadow-sm hover:shadow-md transition-transform duration-200 relative backdrop-blur-sm"
    >
      {car.status && (
        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getStatusClasses(
            car.status
          )}`}
        >
          {car.status}
        </span>
      )}

      <img
        src={car.images?.[0] || "/placeholder.jpg"}
        alt={car.name}
        className="w-full h-44 object-cover rounded-lg shadow-sm"
      />

      <div className="mt-3">
        <h3 className="font-semibold text-lg">{car.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {car.year ? `${car.year} • ` : ""}
          {brandName} {car.category ? `• ${car.category}` : ""}
        </p>
        {car.ownerType && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {car.ownerType}
          </p>
        )}

        <div className="mt-3 flex justify-between items-center">
          <Link
            href={`/cars/${car._id}`}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            View Details
          </Link>


          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-right">
            {originalPrice && (
              <span className="line-through text-gray-400 text-xs mr-1">
                {originalPrice}
              </span>
            )}
            <span className="text-green-600">{formattedPrice}</span>
          </div>
        </div>
      </div>
    </MotionArticle>
  );
}
