"use client";

import AnimatedSection from "./AnimatedSection";
import { cars } from "../data/carsData";
import CarCard from "./CarCard";

export default function FeaturedCars() {
  const featured = cars.slice(0, 4);
  return (
    <AnimatedSection>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-2 text-center">Featured Cars</h2>
        <p className="text-sm max-w-2xl mx-auto text-center mb-8">
          Handpicked classics with restoration stories and enquiry options.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
