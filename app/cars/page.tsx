"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { cars } from "../data/carsData";
import CarCard from "../components/CarCard";
import AnimatedSection from "../components/AnimatedSection";
import { AnimatePresence } from "framer-motion";
import { FilterIcon, X } from "lucide-react";
import { MotionDiv } from "../components/MotionElements";

export default function CarsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  // States
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);
  const [showFilters, setShowFilters] = useState(false);

  // Initial category from URL
  useEffect(() => {
    if (initialCategory) setSelectedCategories([initialCategory]);
  }, [initialCategory]);

  // Extract unique filter options
  const categories = Array.from(new Set(cars.map((c) => c.category))).sort();
  const brands = Array.from(new Set(cars.map((c) => c.brand))).sort();
  const years = Array.from(new Set(cars.map((c) => String(c.year)))).sort(
    (a, b) => +b - +a
  );
  const owners = Array.from(new Set(cars.map((c) => c.ownerType)));
  const statuses = Array.from(new Set(cars.map((c) => c.status)));

  // Helper to toggle checkbox selections
  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (v: string[]) => void
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  // Filter logic
  const filteredCars = cars.filter((car) => {
    const inCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(car.category);
    const inSearch =
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.brand.toLowerCase().includes(search.toLowerCase());
    const inBrand =
      selectedBrands.length === 0 || selectedBrands.includes(car.brand);
    const inYear =
      selectedYears.length === 0 || selectedYears.includes(String(car.year));
    const inOwner =
      selectedOwners.length === 0 || selectedOwners.includes(car.ownerType);
    const inStatus =
      selectedStatus.length === 0 || selectedStatus.includes(car.status);
    const inPrice =
      car.discountedPrice >= priceRange[0] &&
      car.discountedPrice <= priceRange[1];

    return (
      inCategory &&
      inSearch &&
      inBrand &&
      inYear &&
      inOwner &&
      inStatus &&
      inPrice
    );
  });

  // ✅ Sidebar filter panel
  const FilterPanel = () => (
    <>
      {/* 🔍 Search */}
      <div className="mb-6">
        <label className="block text-sm mb-1 font-medium">Search</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or brand"
          className="w-full px-3 py-2 border rounded-lg bg-neutral-50 dark:bg-neutral-800"
        />
      </div>

      {/* 🏷️ Category */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Category</h3>
        <div className="space-y-2 max-h-36 overflow-y-auto">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c)}
                onChange={() =>
                  toggleSelection(c, selectedCategories, setSelectedCategories)
                }
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      {/* 🚘 Brand */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Brand</h3>
        <div className="space-y-2 max-h-36 overflow-y-auto">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() =>
                  toggleSelection(b, selectedBrands, setSelectedBrands)
                }
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      {/* 📅 Year */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Year</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {years.map((y) => (
            <label key={y} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedYears.includes(y)}
                onChange={() => toggleSelection(y, selectedYears, setSelectedYears)}
              />
              {y}
            </label>
          ))}
        </div>
      </div>

      {/* 👤 Owner Type */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Owner Type</h3>
        <div className="space-y-2">
          {owners.map((o) => (
            <label key={o} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedOwners.includes(o)}
                onChange={() =>
                  toggleSelection(o, selectedOwners, setSelectedOwners)
                }
              />
              {o}
            </label>
          ))}
        </div>
      </div>

      {/* 🟢 Status */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Status</h3>
        <div className="space-y-2">
          {statuses.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedStatus.includes(s)}
                onChange={() => toggleSelection(s, selectedStatus, setSelectedStatus)}
              />
              <span
                className={`px-2 py-0.5 rounded-full ${
                  s === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 💰 Price Range */}
      <div>
        <h3 className="font-medium mb-2">Price Range (₹)</h3>
        <input
          type="range"
          min="0"
          max="20000000"
          step="100000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* 🧹 Clear Filters */}
      <button
        onClick={() => {
          setSearch("");
          setSelectedBrands([]);
          setSelectedYears([]);
          setSelectedOwners([]);
          setSelectedCategories([]);
          setSelectedStatus([]);
          setPriceRange([0, 20000000]);
          router.push("/cars");
        }}
        className="mt-6 w-full py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
      >
        Clear Filters
      </button>
    </>
  );

  return (
    <AnimatedSection>
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* 🧭 Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-1 bg-white dark:bg-neutral-900 p-5 rounded-xl shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <FilterPanel />
        </aside>

        {/* 📱 Mobile Header */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h1 className="text-2xl font-bold">
            {selectedCategories.length === 1
              ? `${selectedCategories[0]} Cars`
              : "Available Cars"}
          </h1>
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <FilterIcon className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* 🧭 Mobile Drawer */}
        <AnimatePresence>
          {showFilters && (
            <MotionDiv
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-50 flex justify-end"
            >
              <div className="bg-white dark:bg-neutral-900 w-80 h-full p-5 shadow-lg overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <X />
                  </button>
                </div>

                <FilterPanel />

                <button
                  onClick={() => setShowFilters(false)}
                  className="mt-6 w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* 🚗 Cars Grid */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="hidden lg:flex justify-between items-center mb-6 mt-4">
            <h1 className="text-2xl font-bold">
              {selectedCategories.length === 1
                ? `${selectedCategories[0]} Cars`
                : "Available Cars"}
            </h1>

            <div className="flex items-center gap-3">
              {selectedCategories.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    router.push("/cars");
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-neutral-800 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-neutral-700"
                >
                  View All Cars
                </button>
              )}
              <p className="text-sm text-gray-500">
                {filteredCars.length} result{filteredCars.length !== 1 && "s"}
              </p>
            </div>
          </div>

          {/* Car Grid or Empty State */}
          {filteredCars.length === 0 ? (
            <p className="text-center text-gray-500 py-20">
              No cars match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>
    </AnimatedSection>
  );
}
