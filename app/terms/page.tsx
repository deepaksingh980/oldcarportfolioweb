import React from "react";

export default function TermsAndConditions() {
    const sections = [
        {
            title: "Introduction",
            text: "Welcome to Deepak Pre-Owned Cars. By browsing or using our platform, you agree to follow these Terms & Conditions. These terms ensure a safe, transparent, and trustworthy experience for buyers and sellers of used cars.",
        },
        {
            title: "Use of Our Platform",
            text: "Our website is designed for browsing, comparing, and enquiring about pre-owned vehicles. You agree not to misuse the services, attempt unauthorized access, or engage in activities that might disrupt website performance.",
        },
        {
            title: "Vehicle Listings & Accuracy",
            text: "All used car details such as model, year, mileage, condition, and price are provided based on information shared by sellers. While we strive for accuracy, Deepak Pre-Owned Cars does not guarantee completeness or error-free listings.",
        },
        {
            title: "Pricing & Negotiations",
            text: "Prices displayed on the website are indicative and may vary depending on vehicle condition, availability, and market demand. Deepak reserves the right to update or modify pricing without prior notice.",
        },
        {
            title: "Test Drives & Inspections",
            text: "Customers are encouraged to physically inspect the vehicle and take a test drive before making any purchase decision. Deepak is not liable for damages or issues identified after the vehicle handover.",
        },
        {
            title: "Ownership Transfer & Documentation",
            text: "We assist with RC transfer, insurance support, and paperwork. You must provide accurate documents to avoid delays. Deepak is not responsible for issues caused by incomplete or incorrect documentation.",
        },
        {
            title: "Payments & Refunds",
            text: "All payments must be made through secure and authorized channels. Once a vehicle is booked or purchased, payments are non-refundable unless stated otherwise in a specific agreement.",
        },
        {
            title: "Limitation of Liability",
            text: "Deepak Pre-Owned Cars is not responsible for any mechanical failures, hidden defects, or damages that occur after the sale. Buyers are advised to verify all aspects of the vehicle before completing the purchase.",
        },
        {
            title: "Third-Party Services",
            text: "Our website may include links to finance, insurance, and service partners. We do not control these services and are not responsible for their terms, policies, or performance.",
        },
        {
            title: "Modifications to Terms",
            text: "We reserve the right to update or modify these Terms & Conditions at any time. Continued use of the website signifies your acceptance of the updated terms.",
        },
        {
            title: "Contact Information",
            text: "For enquiries, support, or concerns, contact us at: erdeepak0718@gmail.com",
        },
    ];

    return (
        <div className="min-h-screen w-full 
            bg-gradient-to-br from-gray-100 to-gray-300 
            dark:from-gray-900 dark:to-gray-800 
            py-32 px-4">

            <div className="max-w-4xl mx-auto 
                bg-white/90 dark:bg-gray-900/90 
                backdrop-blur-lg shadow-2xl 
                border border-gray-300 dark:border-gray-700 
                rounded-3xl p-12 md:p-16">

                {/* Header */}
                <h1 className="text-5xl font-extrabold 
                    text-gray-900 dark:text-white">
                    Terms & Conditions
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mt-3 mb-12 text-sm">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>

                {/* Content */}
                <div className="space-y-12 text-gray-700 dark:text-gray-300 leading-8">
                    {sections.map((item, index) => (
                        <section
                            key={index}
                            className="relative pl-5 
                                border-l-4 border-blue-600 
                                bg-white/40 dark:bg-gray-800/40 
                                rounded-xl p-5 shadow-sm"
                        >
                            <h2 className="text-2xl font-semibold 
                                text-gray-900 dark:text-white flex items-center gap-3">
                                <span className="text-blue-700 dark:text-blue-400 font-bold text-xl">
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}.
                                </span>
                                {item.title}
                            </h2>

                            <p className="mt-3 text-gray-600 dark:text-gray-400">
                                {item.text}
                            </p>
                        </section>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
                    © {new Date().getFullYear()} Deepak Pre-Owned Cars. All Rights Reserved.
                </div>

            </div>
        </div>
    );
}
