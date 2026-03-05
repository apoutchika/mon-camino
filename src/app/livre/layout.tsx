import type { Metadata } from 'next';
import { LivreSidebar } from '@/components/livre/LivreSidebar';
import '../day-layout.css';

export const metadata: Metadata = {
  title: 'Livre interactif',
};

export default function LivreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-grid">
      <LivreSidebar />
      <div>{children}</div>
    </div>
  );
}
