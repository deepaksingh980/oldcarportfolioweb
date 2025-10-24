"use client";

import { useState } from "react";
import { cars } from "../data/carsData";
import CarCard from "../components/CarCard";
import AnimatedSection from "../components/AnimatedSection";

export default function CarsPage() {
  const [q, setQ] = useState("");
  const [year, setYear] = useState("");

  const years = Array.from(new Set(cars.map((c) => String(c.year)))).sort(
    (a, b) => +b - +a
  );

  const filtered = cars.filter((car) => {
    return (
      car.name.toLowerCase().includes(q.toLowerCase()) &&
      (year ? String(car.year) === year : true)
    );
  });

  return (
    <AnimatedSection>
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">All Cars</h1>
            <p className="text-sm text-muted-foreground">
              Search and filter collectors' cars.
            </p>
          </div>

          <div className="flex gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name"
              className="px-4 py-2 rounded-lg border"
            />
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-4 py-2 rounded-lg border"
            >
              <option value="">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
