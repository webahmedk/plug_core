'use client';

import AdminHeader from "../components/header/admin_header";
// import AdminSidebar from "../components/sidebar/admin_sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <div className="flex flex-1">
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>

    </div>
  );
}