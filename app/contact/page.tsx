import AnimatedSection from "../components/AnimatedSection";
import ContactForm from "../components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact - Old Car Portfolio",
  description:
    "Contact us for enquiries about vintage cars, restoration services, and dealership opportunities.",
};

export default function Contact() {
  return (
    <AnimatedSection>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-16 text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Get in Touch
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Whether you’re looking to buy, sell, or restore a vintage car — we’d
          love to hear from you. Our team is passionate about preserving
          automotive heritage and helping enthusiasts find their dream classic.
        </p>
      </section>

      {/* Contact Info + Form Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Left Side - Contact Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Contact Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Reach out directly using the details below, or send us a message
            through the form — we typically respond within 24 hours.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-gray-700 dark:text-gray-300">
                info@oldcarportfolio.com
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-gray-700 dark:text-gray-300">+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-gray-700 dark:text-gray-300">
                Vintage Car Showroom, MG Road, New Delhi, India
              </p>
            </div>
          </div>

          <div className="mt-8">
            <img
              src="https://images.unsplash.com/photo-1523983301482-31c8b91c0b66"
              alt="Vintage Car Showroom"
              className="rounded-2xl shadow-lg w-full object-cover h-64"
            />
          </div>
        </div>

        {/* Right Side - Enquiry Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Send Us a Message
          </h2>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-neutral-800">
            <ContactForm />
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
