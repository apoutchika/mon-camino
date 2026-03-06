'use client';

import { useState } from 'react';
import { LivreSidebar } from '@/components/livre/LivreSidebar';
import { MobileWarning } from '@/components/livre/MobileWarning';
import '../day-layout.css';

export default function LivreLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <MobileWarning />
      <div className={`page-grid ${!sidebarOpen ? 'page-grid--sidebar-closed' : ''}`}>
        <LivreSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div>{children}</div>
      </div>
    </>
  );
}
