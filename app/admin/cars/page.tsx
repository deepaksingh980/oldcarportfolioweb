"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LayoutGrid, List, Edit3, Trash2, Eye } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import AdminFormModal from "../components/AdminFormModal";
import ImageCarousel from "../components/ImageCarousel";
import ViewCarModal from "../components/ViewCarModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function Cars() {
  const [cars, setCars] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCar, setEditCar] = useState<any>(null);
  const [viewCar, setViewCar] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "card">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20; // items per page


  // ✅ Fetch Cars
  const fetchCars = async (page = 1) => {
    try {
      const { data } = await axios.get(`/api/cars?page=${page}&limit=${limit}`);
      setCars(data.cars || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch {
      toast.error("Failed to fetch cars!");
    }
  };



  // ✅ Fetch Brands
  const fetchBrands = async () => {
    try {
      const { data } = await axios.get("/api/brands");
      setBrands(data);
    } catch {
      toast.error("Failed to fetch brands!");
    }
  };

  useEffect(() => {
    fetchCars(currentPage);
    fetchBrands();
  }, [currentPage]);


  // ✅ Save Car (Add / Update)
  const handleSave = async (formData: any) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("Unauthorized!");
      return;
    }

    try {
      const body = {
        name: formData.name,
        brand: formData.brand,
        year: formData.year,
        color: formData.color,
        category: formData.category,
        ownerType: formData.ownerType,
        actualPrice: formData.actualPrice,
        discountedPrice: formData.discountedPrice,
        status: formData.status,
        description: formData.description,
        specs: {
          engine: formData?.engine,
          fuelType: formData?.fuelType,
          transmission: formData?.transmission,
          mileage: formData?.mileage,
          horsepower: formData?.horsepower,
          torque: formData?.torque,
          topSpeed: formData?.topSpeed,
          driveType: formData?.driveType,
        },
        images: formData.images || [],
      };

      console.log("🚗 Final body before save:", body);

      if (formData._id) {
        await axios.put("/api/cars", { ...body, _id: formData._id }, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        toast.success("Car updated successfully!");
      } else {
        await axios.post("/api/cars", body, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        toast.success("Car added successfully!");
      }

      fetchCars();
      setModalOpen(false);
    } catch (err: any) {
      console.error("❌ Car save failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Failed to save car!");
    }
  };



  // ✅ Delete Car
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete("/api/cars", {
        headers: { Authorization: `Bearer ${token}` },
        data: { _id: id },
      });
      toast.success("Car deleted successfully!");
      setDeleteConfirm(null);
      fetchCars();
    } catch {
      toast.error("Failed to delete car!");
    }
  };

  // ✅ Car Form Fields
  const currentYear = new Date().getFullYear();

  const carFields = [
    { name: "name", label: "Car Name", type: "text", halfWidth: true },

    {
      name: "brand",
      label: "Brand",
      type: "select",
      halfWidth: true,
      options: brands.map((b) => ({ label: b.name, value: b._id })),
    },

    {
      name: "year",
      label: "Year",
      type: "select",
      halfWidth: true,
      options: Array.from({ length: 15 }, (_, i) => {
        const year = currentYear - i;
        return { label: year.toString(), value: year.toString() };
      }),
    },

    {
      name: "color",
      label: "Car Color",
      type: "text",
      halfWidth: true,
    },

    {
      name: "category",
      label: "Category",
      type: "select",
      halfWidth: true,
      options: [
        { label: "SUV", value: "SUV" },
        { label: "Sedan", value: "Sedan" },
        { label: "Hatchback", value: "Hatchback" },
        { label: "Coupe", value: "Coupe" },
        { label: "Convertible", value: "Convertible" },
        { label: "Pickup Truck", value: "Pickup Truck" },
        { label: "Crossover", value: "Crossover" },
        { label: "Wagon", value: "Wagon" },
        { label: "Van / MPV", value: "Van" },
        { label: "Electric", value: "Electric" },
      ],
    },

    {
      name: "ownerType",
      label: "Owner Type",
      type: "select",
      halfWidth: true,
      options: [
        { label: "1st Owner", value: "1" },
        { label: "2nd Owner", value: "2" },
        { label: "3rd Owner", value: "3" },
        { label: "4th Owner", value: "4" },
      ],
    },

    { name: "actualPrice", label: "Actual Price", type: "number", halfWidth: true },
    { name: "discountedPrice", label: "Discounted Price", type: "number", halfWidth: true },

    {
      name: "status",
      label: "Status",
      type: "select",
      halfWidth: true,
      options: [
        { label: "Available", value: "Available" },
        { label: "Sold", value: "Sold" },
        { label: "Upcoming", value: "Upcoming" },
      ],
    },

    { name: "description", label: "Description", type: "textarea" },

    { name: "images", label: "Upload Images", type: "file" },

    // === SPECS SECTION ===

    {
      name: "engine",
      label: "Engine",
      type: "text",
      halfWidth: true,
    },
    {
      name: "fuelType",
      label: "Fuel Type",
      type: "select",
      halfWidth: true,
      options: [
        { label: "Petrol", value: "Petrol" },
        { label: "Diesel", value: "Diesel" },
        { label: "CNG", value: "CNG" },
        { label: "Electric", value: "Electric" },
        { label: "Hybrid", value: "Hybrid" },
      ],
    },
    {
      name: "transmission",
      label: "Transmission",
      type: "select",
      halfWidth: true,
      options: [
        { label: "Manual", value: "Manual" },
        { label: "Automatic", value: "Automatic" },
        { label: "AMT", value: "AMT" },
        { label: "CVT", value: "CVT" },
        { label: "DCT", value: "DCT" },
      ],
    },
    { name: "mileage", label: "Mileage (km/l)", type: "text", halfWidth: true },
    { name: "horsepower", label: "Horsepower (hp)", type: "text", halfWidth: true },
    { name: "torque", label: "Torque (Nm)", type: "text", halfWidth: true },
    { name: "topSpeed", label: "Top Speed (km/h)", type: "text", halfWidth: true },

    {
      name: "driveType",
      label: "Drive Type",
      type: "select",
      halfWidth: true,
      options: [
        { label: "FWD (Front-Wheel Drive)", value: "FWD" },
        { label: "RWD (Rear-Wheel Drive)", value: "RWD" },
        { label: "AWD (All-Wheel Drive)", value: "AWD" },
        { label: "4WD (Four-Wheel Drive)", value: "4WD" },
      ],
    },
  ];



  return (
    <AdminLayout>
      {/* ✅ Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold">Cars</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "card" : "grid")}
            className="bg-neutral-700 text-white px-3 py-2 rounded-md flex items-center gap-2"
          >
            {viewMode === "grid" ? <List size={18} /> : <LayoutGrid size={18} />}
          </button>
          <button
            onClick={() => {
              setEditCar(null);
              setModalOpen(true);
            }}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
          >
            + Add Car
          </button>
        </div>
      </div>

      {/* ✅ Car Grid or Card View */}
      {viewMode === "grid" ? (
        // 🟩 GRID VIEW — Single Image
        <div className="overflow-x-auto rounded-lg border border-neutral-300 dark:border-neutral-700">
          <table className="w-full text-left">
            <thead className="bg-neutral-200 dark:bg-neutral-800">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Image</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500 dark:text-gray-400">
                    No cars found
                  </td>
                </tr>
              ) : (
                cars.map((c) => (
                  <tr
                    key={c._id}
                    className="border-t border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    <td className="p-3">{c?.name}</td>
                    <td className="p-3">{c?.brand?.name}</td>
                    <td className="p-3">₹{c?.discountedPrice?.toLocaleString()}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${c.status === "Sold"
                          ? "bg-red-200 text-red-700"
                          : "bg-green-200 text-green-700"
                          }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {c.images?.length ? (
                        <img
                          src={c?.images[0]}
                          alt="Car"
                          className="w-14 h-10 rounded-md object-cover border"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-3">
                      <button onClick={() => setViewCar(c)} className="text-green-500 hover:text-green-600">
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setEditCar(c);
                          setModalOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(c._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // 🟦 CARD VIEW — Auto Carousel
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cars?.map((c) => (
            <div
              key={c._id}
              className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-44 overflow-hidden">
                {c?.images && c.images.length > 0 ? (
                  <ImageCarousel images={c?.images} />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold">{c?.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{c?.brand?.name}</p>
                <p className="font-bold text-yellow-600 mb-2">
                  ₹{c?.discountedPrice?.toLocaleString()}
                </p>
                <p
                  className={`text-sm font-semibold ${c.status === "Sold" ? "text-red-600" : "text-green-600"
                    }`}
                >
                  {c?.status}
                </p>
                <div className="flex justify-end gap-3 mt-auto pt-3">
                  <button onClick={() => setViewCar(c)} className="text-green-500 hover:text-green-600">
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setEditCar(c);
                      setModalOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(c._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* ✅ Pagination Controls */}
      {cars.length > 0 && (
        <div className="flex justify-center items-center mt-6 gap-3">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md border ${currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
          >
            Prev
          </button>

          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md border ${currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
          >
            Next
          </button>
        </div>
      )}



      {/* ✅ Add/Edit Modal */}
      {modalOpen && (
        <AdminFormModal
          title={editCar ? "Edit Car" : "Add Car"}
          fields={carFields}
          initialData={{ ...editCar, oldImages: editCar?.images }}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
      {/* ✅ View Car Modal */}
      {viewCar && <ViewCarModal car={viewCar} onClose={() => setViewCar(null)} />}

      {/* ✅ Delete Confirm Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </AdminLayout>
  );
}
