"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/admin/login");
  }, [router]);

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Brands", href: "/admin/brands" },
    { name: "Cars", href: "/admin/cars" },
    { name: "Banners", href: "/admin/banners" },
    { name: "Gallery", href: "/admin/gallery" },
    { name: "Enquiries", href: "/admin/enquiries" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-neutral-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col bg-neutral-800 text-white px-4 py-5">
        <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
        <nav className="flex flex-col space-y-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-2 rounded-md font-medium transition ${
                pathname === item.href
                  ? "bg-yellow-500 text-black"
                  : "hover:bg-neutral-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 p-2 rounded-md font-semibold mt-3"
        >
          Logout
        </button>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-neutral-900 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="bg-neutral-800 text-white w-60 h-full flex flex-col p-5 space-y-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`p-2 rounded-md ${
                  pathname === item.href
                    ? "bg-yellow-500 text-black"
                    : "hover:bg-neutral-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded-md font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-white dark:bg-neutral-900 overflow-auto">
        <div className="p-4 md:p-5">{children}</div>
      </main>
    </div>
  );
}
