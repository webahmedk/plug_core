'use client';

import { useState } from 'react';
import DashboardCard from '@/app/components/admin/card/dashboarcard';

export default function DashboardPage() {
  // Mock data for UI display
  const [stats] = useState({
    totalUsers: 128,
    totalOrders: 76,
    totalRevenue: 15420,
    pendingOrders: 12,
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Users" value={stats.totalUsers} />
        <DashboardCard title="Total Orders" value={stats.totalOrders} />
        <DashboardCard title="Total Revenue" value={`$${stats.totalRevenue}`} />
        <DashboardCard title="Pending Orders" value={stats.pendingOrders} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Sales Over Time</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded">
            Chart Placeholder
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
