"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImageToFirebase } from "../../lib/firebase";

type Field = {
  name: string;
  label: string;
  type: string;
  half?: boolean;
  options?: { label: string; value: string }[];
};

export default function AdminFormModal({
  title,
  fields,
  initialData = {},
  onSave,
  onClose,
}: {
  title: string;
  fields: Field[];
  initialData?: any;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, files } = e.target as any;

    if (type === "file" && files?.length) {
      try {
        setLoading(true);
        const urls = [];
        for (const file of files) {
          const url = await uploadImageToFirebase(file);
          urls.push(url);
        }
        setFormData({ ...formData, [name]: urls });
        toast.success("Images uploaded");
      } catch {
        toast.error("Image upload failed");
      } finally {
        setLoading(false);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSave(formData);
      toast.success("Saved successfully!");
      onClose();
    } catch {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 rounded-lg shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="max-h-[75vh] overflow-y-auto p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.half ? "col-span-1" : "col-span-2"}
              >
                <label className="block mb-1 font-medium text-sm">
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                  />
                ) : field.type === "file" ? (
                  <input
                    type="file"
                    name={field.name}
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                    className="w-full text-sm"
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                  >
                    <option value="">Select...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                  />
                )}
              </div>
            ))}

            <div className="col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
