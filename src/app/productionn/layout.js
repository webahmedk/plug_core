'use client';

import ProductionSidebar from '@/app/components/production/sidebar/sidebar';

export default function ProductionLayout({ children }) {
  return (
    <div className="flex">
      <ProductionSidebar />
      <main className="flex-1 bg-gray-50 min-h-screen p-6">
        {children}
      </main>
    </div>
    
  );
}
