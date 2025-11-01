"use client";

import AnimatedSection from "../components/AnimatedSection";
import Image from "next/image";
import { MotionDiv } from "../components/MotionElements";
import Link from "next/link";
export const metadata = {
    title: "About - Vintage Car Showroom",
    description:
        "Learn more about our passion for restoring and showcasing timeless vintage cars.",
};

export default function About() {
    return (
        <AnimatedSection>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-gray-900 to-black text-white py-24">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
                        alt="Classic Car"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                </div>

                <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Preserving Automotive Heritage
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl">
                        Our passion for vintage cars drives us to restore, cherish, and
                        showcase the timeless beauty of the past.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <Image
                        src="https://images.unsplash.com/photo-1610108702321-22663fd12bfa"
                        alt="Restoration Workshop"
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-lg"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Our Mission
                    </h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Every car has a story. Our mission is to breathe life back into
                        vintage machines that once ruled the roads. Through expert
                        craftsmanship, original detailing, and authentic restoration, we aim
                        to keep automotive heritage alive for future generations.
                    </p>
                </div>
            </section>

            {/* Collection Section */}
            <section className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Iconic Classics
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-12">
                        A tribute to automotive legends — from roaring muscle cars to timeless European masterpieces,
                        each model tells a story of power, passion, and perfection.
                    </p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "1969 Dodge Charger R/T",
                                desc: "American muscle at its finest — unmatched style and raw V8 power.",
                                img: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
                            },
                            {
                                name: "1961 Ferrari 250 GT",
                                desc: "A rare Italian beauty — elegance, prestige, and pure driving soul.",
                                img: "https://images.unsplash.com/photo-1511910849309-0e1e9e6a23e1",
                            },
                            {
                                name: "1973 Porsche 911 Carrera RS",
                                desc: "Lightweight, agile, and legendary — the origin of Porsche performance.",
                                img: "https://images.unsplash.com/photo-1618089323055-3d3b7103c6b0",
                            },
                        ].map((car, i) => (
                            <MotionDiv
                                key={i}
                                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
                            >
                                <Image
                                    src={car.img}
                                    alt={car.name}
                                    width={400}
                                    height={300}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {car.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{car.desc}</p>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </section>


            {/* Closing Section */}
            <section className="text-center py-20 px-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Driven by Passion. Defined by Heritage.
                </h2>
                <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-8">
                    We’re not just collectors — we’re storytellers of a golden era where
                    design met soul, and every drive was an experience.
                </p>

                <Link href="/cars">
                    <button className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition">
                        Explore Our Cars
                    </button>
                </Link>
            </section>
        </AnimatedSection>
    );
}
