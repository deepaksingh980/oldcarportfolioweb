"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import {
  Car,
  Image,
  Building2,
  MessageCircle,
  TrendingUp,
  PieChart as PieIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({});
  const [carStats, setCarStats] = useState<any[]>([]);
  const [categoryStats, setCategoryStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [cars, brands, enquiries, gallery] = await Promise.all([
          axios.get("/api/cardata"),
          axios.get("/api/brands"),
          axios.get("/api/enquiry"),
          axios.get("/api/gallery"),
        ]);

        const carData = cars.data || [];

        // Prepare mock graph data
        const monthlyData = [
          { month: "Jan", cars: 2 },
          { month: "Feb", cars: 5 },
          { month: "Mar", cars: 3 },
          { month: "Apr", cars: 6 },
          { month: "May", cars: 4 },
          { month: "Jun", cars: 7 },
        ];

        // Category distribution (for Pie chart)
        const categories = carData.reduce((acc: any, car: any) => {
          acc[car.category] = (acc[car.category] || 0) + 1;
          return acc;
        }, {});
        const categoryData = Object.entries(categories).map(([key, val]) => ({
          name: key,
          value: val,
        }));

        setStats({
          cars: carData.length,
          brands: brands.data.length,
          enquiries: enquiries.data.length,
          gallery: gallery.data.length,
        });
        setCarStats(monthlyData);
        setCategoryStats(categoryData);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const cards = [
    {
      name: "Cars",
      value: stats.cars ?? 0,
      icon: <Car size={36} />,
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Brands",
      value: stats.brands ?? 0,
      icon: <Building2 size={36} />,
      color: "from-green-500 to-green-700",
    },
    {
      name: "Enquiries",
      value: stats.enquiries ?? 0,
      icon: <MessageCircle size={36} />,
      color: "from-yellow-500 to-yellow-700",
    },
    {
      name: "Gallery",
      value: stats.gallery ?? 0,
      icon: <Image size={36} />,
      color: "from-purple-500 to-purple-700",
    },
  ];

  const COLORS = ["#1d4ed8", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-white">
        Dashboard Overview
      </h1>

      {loading ? (
        <div className="text-center py-20 text-neutral-600 dark:text-neutral-300">
          Loading dashboard data...
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
              <div
                key={card.name}
                className={`relative p-6 rounded-2xl shadow-md text-white bg-gradient-to-br ${card.color} flex flex-col items-center justify-center hover:scale-105 transition-transform`}
              >
                <div className="mb-3">{card.icon}</div>
                <h2 className="text-lg font-semibold">{card.name}</h2>
                <p className="text-4xl font-bold mt-2">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            {/* Line Chart */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-blue-600" />
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
                  Cars Added Over Time
                </h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={carStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="cars"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <PieIcon className="text-yellow-500" />
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
                  Category Distribution
                </h2>
              </div>
              {categoryStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryStats}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {categoryStats.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-neutral-500">No category data</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
              Quick Actions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Add Car", link: "/admin/cars" },
                { name: "Add Brand", link: "/admin/brands" },
                { name: "View Enquiries", link: "/admin/enquiry" },
                { name: "Manage Gallery", link: "/admin/gallery" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="block bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition text-center"
                >
                  <p className="font-medium text-neutral-800 dark:text-white">
                    {item.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
