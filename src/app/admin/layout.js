'use client';

import AdminSidebar from '@/app/components/admin/card/sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar role="admin" />
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
