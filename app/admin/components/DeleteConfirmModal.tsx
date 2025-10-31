"use client";
import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-sm shadow-lg text-center">
        <AlertTriangle className="text-red-500 w-12 h-12 mx-auto mb-3" />
        <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-5">
          This action cannot be undone.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-400 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
