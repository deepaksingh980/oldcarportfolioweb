'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import HiddenAdminTrigger from "./HiddenAdminTrigger";
import { usePathname } from 'next/navigation';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Navbar />}
      <HiddenAdminTrigger />
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
    </div>
  );
}
