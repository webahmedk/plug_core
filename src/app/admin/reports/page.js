'use client';

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

export default function ReportsPage() {
  // Mock summary stats
  const [summary] = useState({
    totalSales: 15420,
    totalOrders: 76,
    totalUsers: 128,
    pendingOrders: 12,
  });

  // Mock detailed report data
  const [ordersReport] = useState([
    { id: 101, customer: 'Alice Johnson', total: 40, status: 'Pending', date: '2026-02-18' },
    { id: 102, customer: 'Bob Smith', total: 75, status: 'Processing', date: '2026-02-17' },
    { id: 103, customer: 'Charlie Brown', total: 120, status: 'Shipped', date: '2026-02-16' },
    { id: 104, customer: 'Dana White', total: 25, status: 'Delivered', date: '2026-02-15' },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Sales" className="text-center">{`$${summary.totalSales}`}</Card>
        <Card title="Total Orders" className="text-center">{summary.totalOrders}</Card>
        <Card title="Total Users" className="text-center">{summary.totalUsers}</Card>
        <Card title="Pending Orders" className="text-center">{summary.pendingOrders}</Card>
      </div>

      {/* Orders Report Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Orders Report</h2>
        <DataTable value={ordersReport} paginator rows={5} responsiveLayout="scroll">
          <Column field="id" header="Order ID" sortable />
          <Column field="customer" header="Customer" sortable />
          <Column field="total" header="Total ($)" sortable />
          <Column field="status" header="Status" sortable />
          <Column field="date" header="Date" sortable />
        </DataTable>
      </div>

      {/* Charts placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded shadow h-64 flex items-center justify-center text-gray-400 border border-dashed">
          Sales Chart Placeholder
        </div>
        <div className="bg-white p-6 rounded shadow h-64 flex items-center justify-center text-gray-400 border border-dashed">
          Users Chart Placeholder
        </div>
      </div>
    </div>
  );
}
