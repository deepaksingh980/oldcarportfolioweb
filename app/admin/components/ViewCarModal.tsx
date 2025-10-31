"use client";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {  AnimatePresence } from "framer-motion";
import {  MotionImg } from "../../components/MotionElements";
export default function ViewCarModal({ car, onClose }: { car: any; onClose: () => void }) {
    const [index, setIndex] = useState(0);
    if (!car) return null;

    const next = () =>
        setIndex((prev) => (prev + 1) % (car.images?.length || 1));
    const prev = () =>
        setIndex((prev) =>
            prev === 0 ? (car.images?.length || 1) - 1 : prev - 1
        );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-100 dark:bg-neutral-800 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
                >
                    <X size={20} className="text-gray-700 dark:text-gray-300" />
                </button>

                {/* Header */}
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {car?.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">{car?.brand?.name}</p>
                </div>

                {/* Image Carousel */}
                <div className="relative bg-neutral-100 dark:bg-neutral-800 h-72 sm:h-96 flex items-center justify-center overflow-hidden">
                    {car?.images?.length ? (
                        <>
                            <AnimatePresence mode="wait">
                                <MotionImg
                                    key={index}
                                    src={car.images[index]}
                                    alt="Car"
                                    className="absolute w-full h-full object-cover"
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </AnimatePresence>
                            {car?.images?.length > 1 && (
                                <>
                                    <button
                                        onClick={prev}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={next}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                                        {car?.images?.map((_: string, i: number) => (
                                            <div
                                                key={i}
                                                className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? "bg-white" : "bg-white/50"
                                                    }`}
                                            />
                                        ))}

                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-500">No Images</p>
                    )}
                </div>

                {/* Info Section */}
                <div className="p-6 grid sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Brand:</strong> {car?.brand?.name ?? "N/A"}</p>
                    <p><strong>Category:</strong> {car?.category ?? "N/A"}</p>
                    <p><strong>Color:</strong> {car?.color}</p>
                    <p><strong>Year:</strong> {car?.year}</p>
                    <p><strong>Owner:</strong> {car?.ownerType}</p>
                    <p><strong>Status:</strong> {car?.status}</p>
                    <p><strong>Actual Price:</strong> ₹{car?.actualPrice?.toLocaleString()}</p>
                    <p><strong>Discounted Price:</strong> ₹{car?.discountedPrice?.toLocaleString()}</p>
                </div>

                {/* Description */}
                {car?.description && (
                    <div className="px-6 pb-6">
                        <h3 className="font-semibold text-lg mb-2">Description</h3>
                        <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                            {car?.description}
                        </p>
                    </div>
                )}

                {/* Specs */}
                {car?.specs && (
                    <div className="px-6 pb-8">
                        <h3 className="font-semibold text-lg mb-2">Specifications</h3>
                        <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <p><strong>Engine:</strong> {car?.specs?.engine}</p>
                            <p><strong>Fuel Type:</strong> {car?.specs?.fuelType}</p>
                            <p><strong>Transmission:</strong> {car?.specs?.transmission}</p>
                            <p><strong>Mileage:</strong> {car?.specs?.mileage}</p>
                            <p><strong>Horsepower:</strong> {car?.specs?.horsepower}</p>
                            <p><strong>Torque:</strong> {car?.specs?.torque}</p>
                            <p><strong>Top Speed:</strong> {car?.specs?.topSpeed}</p>
                            <p><strong>Drive Type:</strong> {car?.specs?.driveType}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
