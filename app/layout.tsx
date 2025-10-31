'use client';

import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin'); // ✅ detect admin pages

  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
          <div className="min-h-screen flex flex-col">
            {/* ✅ Hide Navbar and Footer on admin pages */}
            {!isAdmin && <Navbar />}

            <main className="flex-1">{children}</main>

            {!isAdmin && <Footer />}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
