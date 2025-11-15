import React from "react";

export default function PrivacyPolicy() {
    const sections = [
        {
            title: "Introduction",
            text: "At Deepak Pre-Owned Cars, your privacy is our top priority. This Privacy Policy explains how we collect, use, store, and protect your personal data when you interact with our used car marketplace.",
        },
        {
            title: "Information We Collect",
            text: "We may collect personal details such as your name, phone number, email address, location, and enquiry details when you contact us regarding a used car. We may also collect browsing data to improve website performance.",
        },
        {
            title: "How We Use Your Information",
            text: "Your information is used to respond to car enquiries, schedule test drives, assist with documentation, improve user experience, provide updates, and offer personalized used car recommendations.",
        },
        {
            title: "Data Protection & Security",
            text: "Your data is securely stored using modern encryption and security protocols. We take strict measures to prevent unauthorized access, misuse, or disclosure of your personal information.",
        },
        {
            title: "Third-Party Sharing",
            text: "We do not sell or trade your personal information. Your data may only be shared with trusted partners for services like loan assistance, RC transfer, insurance, or technical maintenance.",
        },
        {
            title: "Cookies & Tracking",
            text: "Our website may use cookies to analyze traffic, enhance browsing experience, and display relevant used car offers. You can manage or disable cookies anytime.",
        },
        {
            title: "Your Privacy Rights",
            text: "You may request access, correction, or deletion of your personal information at any time. You can also opt out of marketing messages or data collection.",
        },
        {
            title: "Policy Updates",
            text: "This Privacy Policy may be updated periodically to reflect changes in services, laws, or security standards. Continued use of the website indicates acceptance of updated terms.",
        },
        {
            title: "Contact Us",
            text: "For privacy-related queries or requests, contact us at: erdeepak0718@gmail.com",
        },
    ];

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 py-32 px-4 transition-all">

            <div className="max-w-4xl mx-auto 
                bg-white/90 dark:bg-white/10
                backdrop-blur-xl shadow-2xl 
                border border-gray-300 dark:border-gray-700 
                rounded-3xl p-12 md:p-16 transition-all">

                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">
                    Privacy Policy
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mt-3 mb-12 text-sm">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>

                <div className="space-y-12 text-gray-700 dark:text-gray-300 leading-8">

                    {sections.map((item, index) => (
                        <section
                            key={index}
                            className="relative pl-5 
                                border-l-4 border-blue-600 
                                bg-white/50 dark:bg-white/5
                                rounded-xl p-5 shadow-sm
                                dark:shadow-none transition-all"
                        >
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                                <span className="text-blue-700 dark:text-blue-400 font-bold text-xl">
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}.
                                </span>
                                {item.title}
                            </h2>

                            <p className="mt-3 text-gray-600 dark:text-gray-300">
                                {item.text}
                            </p>
                        </section>
                    ))}
                </div>

                <div className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
                    © {new Date().getFullYear()} Deepak Pre-Owned Cars. All Rights Reserved.
                </div>
            </div>
        </div>
    );
}
