// components/HiddenAdminTrigger.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HiddenAdminTrigger() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        router.push('/admin/login');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router]);

  return null; // invisible
}
