"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LayoutGrid, List, Edit3, Trash2, XCircle } from "lucide-react";
import AdminFormModal from "../components/AdminFormModal";
import AdminLayout from "../components/AdminLayout";

export default function Brands() {
  const [brands, setBrands] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBrand, setEditBrand] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "card">("grid");

  // ✅ Fetch all brands
  const fetchBrands = async () => {
    try {
      const { data } = await axios.get("/api/brands");
      setBrands(data);
    } catch {
      toast.error("Failed to fetch brands");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // ✅ Save brand
  const handleSave = async (data: any) => {
    const token = localStorage.getItem("adminToken");
    try {
      if (data._id) {
        await axios.put("/api/brands", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/brands", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      toast.success("Brand saved!");
      fetchBrands();
      setModalOpen(false);
    } catch {
      toast.error("Save failed");
    }
  };

  // ✅ Delete brand
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete("/api/brands", {
        headers: { Authorization: `Bearer ${token}` },
        data: { _id: id },
      });
      toast.success("Deleted successfully!");
      setDeleteConfirm(null);
      fetchBrands();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold">Brands</h1>
        <div className="flex items-center gap-3">
          {/* ✅ View Toggle */}
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "card" : "grid")}
            className="bg-neutral-700 text-white px-3 py-2 rounded-md flex items-center gap-2"
          >
            {viewMode === "grid" ? (
              <>
                <List size={18} /> 
              </>
            ) : (
              <>
                <LayoutGrid size={18} /> 
              </>
            )}
          </button>


          {/* ✅ Add Brand */}
          <button
            onClick={() => {
              setEditBrand(null);
              setModalOpen(true);
            }}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
          >
            + Add Brand
          </button>
        </div>
      </div>

      {/* ✅ Grid View */}
      {viewMode === "grid" ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden">
            <thead className="bg-neutral-200 dark:bg-neutral-800 text-left">
              <tr>
                <th className="p-3">Brand Name</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center p-4 text-gray-500">
                    No brands found
                  </td>
                </tr>
              ) : (
                brands.map((b) => (
                  <tr
                    key={b._id}
                    className="border-t border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    <td className="p-3">{b.name}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditBrand(b);
                          setModalOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(b._id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
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
        // ✅ Card View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No brands found
            </p>
          ) : (
            brands.map((b) => (
              <div
                key={b._id}
                className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between"
              >
                <h3 className="text-lg font-semibold mb-3">{b.name}</h3>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setEditBrand(b);
                      setModalOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(b._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}


      {/* ✅ Add/Edit Modal */}
      {modalOpen && (
        <AdminFormModal
          title={editBrand ? "Edit Brand" : "Add Brand"}
          fields={[{ name: "name", label: "Brand Name", type: "text" }]}
          initialData={editBrand || {}}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* ✅ Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this brand? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-neutral-700 rounded-md text-black dark:text-white hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
