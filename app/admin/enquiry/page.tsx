"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LayoutGrid, List, Trash2, Pencil } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

export default function Enquiries() {
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [editItem, setEditItem] = useState<any | null>(null);
    const [newStatus, setNewStatus] = useState<string>("Pending");
    const [viewMode, setViewMode] = useState<"grid" | "card">("grid");

    const fetchEnquiries = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const { data } = await axios.get("/api/enquiry", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEnquiries(data);
        } catch {
            toast.error("Failed to fetch enquiries");
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete("/api/enquiry", {
                headers: { Authorization: `Bearer ${token}` },
                data: { _id: id },
            });
            toast.success("Deleted successfully!");
            setDeleteConfirm(null);
            fetchEnquiries();
        } catch {
            toast.error("Failed to delete enquiry");
        }
    };

    const handleUpdateStatus = async () => {
        if (!editItem) return;
        try {
            const token = localStorage.getItem("adminToken");
            await axios.put(
                "/api/enquiry",
                { _id: editItem._id, status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Status updated!");
            setEditItem(null);
            fetchEnquiries();
        } catch {
            toast.error("Failed to update status");
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h1 className="text-2xl font-bold">Enquiries</h1>
                <button
                    onClick={() => setViewMode(viewMode === "grid" ? "card" : "grid")}
                    className="bg-neutral-700 text-white px-3 py-2 rounded-md flex items-center gap-2"
                >
                    {viewMode === "grid" ? <List size={18} /> : <LayoutGrid size={18} />}
                </button>
            </div>

            {/* GRID VIEW */}
            {viewMode === "grid" ? (
                <div className="overflow-x-auto">
                    <table className="w-full border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden">
                        <thead className="bg-neutral-200 dark:bg-neutral-800 text-left">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Car Name</th>
                                <th className="p-3">Message</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center p-4 text-gray-500">
                                        No enquiries found
                                    </td>
                                </tr>
                            ) : (
                                enquiries.map((e) => (
                                    <tr
                                        key={e._id}
                                        className="border-t border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                                    >
                                        <td className="p-3">{e.name}</td>
                                        <td className="p-3">{e.email}</td>
                                        <td className="p-3">{e.phone}</td>
                                        <td className="p-3">{e.carName}</td>
                                        <td className="p-3">{e.message}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded-md text-sm ${e.status === "Resolved"
                                                    ? "bg-green-200 text-green-800"
                                                    : e.status === "In Progress"
                                                        ? "bg-yellow-200 text-yellow-800"
                                                        : e.status === "Closed"
                                                            ? "bg-gray-300 text-gray-800"
                                                            : "bg-red-200 text-red-800"
                                                    }`}
                                            >
                                                {e.status}
                                            </span>
                                        </td>
                                        <td className="p-3 text-right flex justify-end gap-3">
                                            <button
                                                onClick={() => {
                                                    setEditItem(e);
                                                    setNewStatus(e.status);
                                                }}
                                                className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                                            >
                                                <Pencil size={18} /> Edit
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(e._id)}
                                                className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                            >
                                                <Trash2 size={18} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                // CARD VIEW
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enquiries.length === 0 ? (
                        <p className="text-gray-500 text-center col-span-full">
                            No enquiries found
                        </p>
                    ) : (
                        enquiries.map((e) => (
                            <div
                                key={e._id}
                                className="bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">{e.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        📧 {e.email}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        📞 {e.phone}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {e.carName}
                                    </p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">
                                        “{e.message}”
                                    </p>
                                    <p className="mt-3 text-sm">
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`px-2 py-1 rounded-md ${e.status === "Resolved"
                                                ? "bg-green-200 text-green-800"
                                                : e.status === "In Progress"
                                                    ? "bg-yellow-200 text-yellow-800"
                                                    : e.status === "Closed"
                                                        ? "bg-gray-300 text-gray-800"
                                                        : "bg-red-200 text-red-800"
                                                }`}
                                        >
                                            {e.status}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex justify-end mt-3 gap-3">
                                    <button
                                        onClick={() => {
                                            setEditItem(e);
                                            setNewStatus(e.status);
                                        }}
                                        className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                                    >
                                        <Pencil size={18} /> Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(e._id)}
                                        className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                    >
                                        <Trash2 size={18} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* 🟥 Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete this enquiry?
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

            {/* 🟦 Edit Status Modal */}
            {editItem && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Edit Status</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {editItem.name} — {editItem.email}
                        </p>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="w-full border border-gray-300 dark:border-neutral-700 bg-transparent p-2 rounded-md mb-6"
                        >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Closed</option>
                        </select>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditItem(null)}
                                className="px-4 py-2 bg-gray-300 dark:bg-neutral-700 rounded-md text-black dark:text-white hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateStatus}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
