'use client';

import { useState } from 'react';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';

export default function ProductionDashboard() {
  // Mock data
  const [stats] = useState({
    totalOrders: 45,
    pendingTasks: 12,
    completedTasks: 28,
    productsInProgress: 15,
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Production Dashboard</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Orders" className="text-center">{stats.totalOrders}</Card>
        <Card title="Pending Tasks" className="text-center">{stats.pendingTasks}</Card>
        <Card title="Completed Tasks" className="text-center">{stats.completedTasks}</Card>
        <Card title="Products In Progress" className="text-center">{stats.productsInProgress}</Card>
      </div>

      {/* Charts placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow h-64 flex flex-col items-center justify-center text-gray-400 border border-dashed">
          <h2 className="mb-4 text-lg font-semibold">Tasks Progress</h2>
          <ProgressBar value={(stats.completedTasks / (stats.completedTasks + stats.pendingTasks)) * 100} showValue />
        </div>

        <div className="bg-white p-6 rounded shadow h-64 flex items-center justify-center text-gray-400 border border-dashed">
          Orders Chart Placeholder
        </div>
      </div>
    </div>
  );
}
