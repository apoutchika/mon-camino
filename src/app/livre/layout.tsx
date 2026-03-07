'use client';

import { useState, useEffect } from 'react';
import { LivreSidebar } from '@/components/livre/LivreSidebar';
import { MobileWarning } from '@/components/livre/MobileWarning';
import '../day-layout.css';

export default function LivreLayout({ children }: { children: React.ReactNode }) {
  // Sidebar fermée par défaut < 1500px, ouverte ≥ 1500px
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Définir l'état initial selon la largeur d'écran
    const handleResize = () => {
      if (window.innerWidth >= 1500) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize(); // Appeler au montage
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
