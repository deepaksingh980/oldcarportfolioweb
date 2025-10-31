"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LayoutGrid, List, Edit3, Trash2, Eye } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import AdminFormModal from "../components/AdminFormModal";
import ImageCarousel from "../components/ImageCarousel";
export default function Banners() {
  const [banners, setBanners] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "card">("grid");
  const [previewModal, setPreviewModal] = useState<any>(null);

  // ✅ Fetch Banners
  const fetchBanners = async () => {
    try {
      const { data } = await axios.get("/api/banners");
      setBanners(data);
    } catch {
      toast.error("Failed to fetch banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ✅ Save Banner
  const handleSave = async (formData: any): Promise<void> => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("Unauthorized!");
      return;
    }

    try {
      const body: any = {
        title: formData.title,
        subtitle: formData.subtitle,
        active: formData.active === "false" ? false : true,
      };

      // 🖼 Include image only if new one uploaded, else keep old
      if (formData.image && formData.image.length > 0) {
        body.image = Array.isArray(formData.image)
          ? formData.image
          : [formData.image].filter(Boolean);
      } else if (formData._id && formData.oldImage) {
        body.image = [formData.oldImage];
      }

      console.log("📝 Banner save request:", body);

      if (formData._id) {
        // ✅ Fixed: send to /api/banners and include _id in body
        await axios.put(`/api/banners`, { ...body, _id: formData._id }, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        toast.success("Banner updated successfully!");
      } else {
        await axios.post(`/api/banners`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        toast.success("Banner created successfully!");
      }

      fetchBanners();
      setModalOpen(false);
      setEditModalOpen(false);
    } catch (err: any) {
      console.error("❌ Banner save failed:", err.response?.data || err.message);
      toast.error("Failed to save banner!");
    }
  };





  // ✅ Delete Banner
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete("/api/banners", {
        headers: { Authorization: `Bearer ${token}` },
        data: { _id: id },
      });
      toast.success("Deleted successfully!");
      setDeleteConfirm(null);
      fetchBanners();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold">Banners</h1>

        <div className="flex items-center gap-3">
          {/* ✅ View Toggle */}
          <button
            onClick={() =>
              setViewMode(viewMode === "grid" ? "card" : "grid")
            }
            className="bg-neutral-700 text-white px-3 py-2 rounded-md flex items-center gap-2"
          >
            {viewMode === "grid" ? <List size={18} /> : <LayoutGrid size={18} />}
          </button>

          {/* ✅ Add Banner */}
          <button
            onClick={() => {
              setEditBanner(null);
              setModalOpen(true);
            }}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
          >
            + Add Banner
          </button>
        </div>
      </div>

      {/* ✅ Grid View */}
      {viewMode === "grid" ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden">
            <thead className="bg-neutral-200 dark:bg-neutral-800 text-left">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Subtitle</th>
                <th className="p-3">Image</th>
                <th className="p-3">Active</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No banners found
                  </td>
                </tr>
              ) : (
                banners.map((b) => {

                  return (
                    <tr
                      key={b._id}
                      className="bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"
                    >
                      <td className="p-3">
                        {b.image?.[0] ? (
                          <img
                            src={b.image[0]}
                            alt="Banner"
                            className="w-24 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-24 h-16 bg-gray-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="p-3">{b.title}</td>
                      <td className="p-3">{b.subtitle}</td>
                      <td className="p-3">
                        <span
                          className={`font-medium ${b.active ? "text-green-600" : "text-red-500"
                            }`}
                        >
                          {b.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3 flex gap-3 justify-end">
                        <button
                          onClick={() => setPreviewModal(b)}
                          className="text-green-500 hover:text-green-600"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setEditBanner(b);
                            setEditModalOpen(true);
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
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      ) : (
        // ✅ Card View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No banners found
            </p>
          ) : (

            banners.map((b) => {
              console.log("Banner object:", b); // ✅ Debugging line

              return (
                <div
                  key={b._id}
                  className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between"
                >
                  <div>
                    {b.image?.[0] ? (
                      <img
                        src={b.image[0]}
                        alt="Banner"
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 dark:bg-neutral-700 rounded-lg mb-3 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                    <h3 className="text-lg font-semibold">{b.title}</h3>
                    <p className="text-gray-500 text-sm">{b.subtitle}</p>
                    <p className="mt-2 text-xs">
                      Status:{" "}
                      <span
                        className={`font-medium ${b.active ? "text-green-600" : "text-red-500"
                          }`}
                      >
                        {b.active ? "Active" : "Inactive"}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end gap-3 mt-3">
                    <button
                      onClick={() => setPreviewModal(b)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setEditBanner(b);
                        setEditModalOpen(true);
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
              );
            })


          )}
        </div>
      )}

      {/* ✅ Add/Edit Modal */}
      {/* ✅ Add/Edit Modals */}
      {modalOpen && (
        <AdminFormModal
          title="Add Banner"
          fields={[
            { name: "title", label: "Title", type: "text" },
            { name: "subtitle", label: "Subtitle", type: "text" },
            { name: "image", label: "Upload Image", type: "file" },
          ]}
          initialData={{}} // Add modal me empty hi rakho
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}

      {editModalOpen && (
        <AdminFormModal
          title="Edit Banner"
          fields={[
            { name: "title", label: "Title", type: "text" },
            { name: "subtitle", label: "Subtitle", type: "text" },
            { name: "image", label: "Upload Image", type: "file" },
            {
              name: "active",
              label: "Status",
              type: "select",
              options: [
                { label: "Active", value: "true" },
                { label: "Inactive", value: "false" },
              ],
            },
          ]}
          // ✅ Pass old image for conditional retention
          initialData={{ ...editBanner, oldImage: editBanner?.image }}
          onSave={handleSave}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      {/* ✅ Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl w-[90%] max-w-md relative">
            <button
              onClick={() => setPreviewModal(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-3">{previewModal.title}</h2>

            {/* ✅ Image Carousel */}
            {previewModal.image && previewModal.image.length > 0 ? (
              <ImageCarousel images={previewModal.image} />
            ) : (
              <div className="w-full h-48 bg-gray-200 dark:bg-neutral-700 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {previewModal.subtitle || "No subtitle"}
            </p>

            <p className="text-sm">
              Status:{" "}
              <span
                className={`font-medium ${previewModal.active ? "text-green-600" : "text-red-500"
                  }`}
              >
                {previewModal.active ? "Active" : "Inactive"}
              </span>
            </p>
          </div>
        </div>
      )}


      {/* ✅ Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this banner? This action cannot be undone.
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
