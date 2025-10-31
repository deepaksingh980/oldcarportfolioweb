"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    async function fetchStats() {
      try {
        const [cars, brands, enquiries, gallery] = await Promise.all([
          axios.get("/api/cars"),
          axios.get("/api/brands"),
          axios.get("/api/enquiries"),
          axios.get("/api/gallery"),
        ]);
        setStats({
          cars: cars.data.length,
          brands: brands.data.length,
          enquiries: enquiries.data.length,
          gallery: gallery.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, val]) => (
          <div
            key={key}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 text-center"
          >
            <h2 className="text-lg font-semibold capitalize">{key}</h2>
            {/* <p className="text-3xl font-bold mt-2 text-yellow-500">{val}</p> */}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
