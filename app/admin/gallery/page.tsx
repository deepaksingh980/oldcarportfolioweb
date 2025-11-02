"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import AdminFormModal from "../components/AdminFormModal";
import ViewImageModal from "../components/ViewImageModal";
import { LayoutGrid, List, Edit, Trash2, Eye } from "lucide-react";
import { MotionDiv, MotionImg } from "../../components/MotionElements";
// import { AnimatePresence, motion } from "framer-motion";

export default function GalleryPage() {
    const [gallery, setGallery] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);
    const [viewMode, setViewMode] = useState<"grid" | "card">("grid");
    const [loading, setLoading] = useState(false);
    const [viewImages, setViewImages] = useState<string[] | null>(null);

    const fetchGallery = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/gallery");
            setGallery(data || []);
        } catch {
            toast.error("Failed to load gallery");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleSave = async (formData: any): Promise<void> => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            toast.error("Unauthorized!");
            return;
        }

        try {
            if (formData._id) {
                await axios.put("/api/gallery", formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Gallery updated!");
            } else {
                await axios.post("/api/gallery", formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Gallery added!");
            }

            fetchGallery();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save!");
        } finally {
            setModalOpen(false);
        }
    };

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("adminToken");
        if (!token) return toast.error("Unauthorized!");
        if (!confirm("Delete this image?")) return;

        try {
            await axios.delete(`/api/gallery`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { _id: id },
            });
            toast.success("Deleted!");
            fetchGallery();
        } catch {
            toast.error("Failed to delete!");
        }
    };

    return (
        <AdminLayout>
            {/* Header */}
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
                            setEditItem(null);
                            setModalOpen(true);
                        }}
                        className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
                    >
                        + Add Banner
                    </button>
                </div>
            </div>

            {/* Loading or Empty */}
            {loading ? (
                <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
                    Loading...
                </p>
            ) : gallery.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
                    No images found.
                </p>
            ) : viewMode === "grid" ? (
                // ✅ GRID VIEW
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {gallery.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition overflow-hidden"
                        >
                            <img
                                src={item.image?.[0]}
                                alt={item.title || "Gallery"}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3 text-center">
                                <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                                    {item.title || "Untitled"}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
                                    {item.caption}
                                </p>
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => setViewImages(item.image || [])}
                                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
                                    >
                                        <Eye size={14} />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setEditItem(item);
                                            setModalOpen(true);
                                        }}
                                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // ✅ CARD VIEW
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {gallery.map((item) => (
                        <MotionDiv
                            key={item._id}
                            layout
                            className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-xl transition overflow-hidden"
                        >
                            <MotionImg
                                src={item.image?.[0]}
                                alt={item.title || "Gallery"}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-4 text-center">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    {item.title || "Untitled"}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                                    {item.caption}
                                </p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => setViewImages(item.image || [])}
                                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
                                    >
                                        <Eye size={14} />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setEditItem(item);
                                            setModalOpen(true);
                                        }}
                                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm transition"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </MotionDiv>
                    ))}
                </div>
            )}

            {/* 🖼️ View Modal with Carousel */}
            {viewImages && (
                <ViewImageModal
                    key="view-modal" // 👈 ensures clean re-mount each time
                    images={viewImages}
                    onClose={() => {
                        console.log("Closing modal..."); // for debug
                        setViewImages(null);
                    }}
                />
            )}



            {/* </AnimatePresence> */}

            {/* Modal for Add/Edit */}
            {modalOpen && (
                <AdminFormModal
                    title={editItem ? "Edit Gallery Item" : "Add Gallery Item"}
                    fields={[
                        { name: "title", label: "Title", type: "text" },
                        { name: "caption", label: "Caption", type: "text" },
                        { name: "image", label: "Images", type: "file" },
                    ]}
                    initialData={editItem || {}}
                    onSave={handleSave}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </AdminLayout>
    );
}
