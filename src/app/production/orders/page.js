'use client';

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function ProductionOrdersPage() {
  // Mock orders assigned to production
  const [orders] = useState([
    { id: 201, customer: 'Alice Johnson', products: 'T-Shirt, Cap', total: 40, status: 'Pending', assignedTo: 'Team A', date: '2026-02-18' },
    { id: 202, customer: 'Bob Smith', products: 'Sneakers', total: 75, status: 'In Progress', assignedTo: 'Team B', date: '2026-02-17' },
    { id: 203, customer: 'Charlie Brown', products: 'Jacket', total: 120, status: 'Completed', assignedTo: 'Team A', date: '2026-02-16' },
    { id: 204, customer: 'Dana White', products: 'T-Shirt', total: 25, status: 'Pending', assignedTo: 'Team C', date: '2026-02-15' },
  ]);

  // Action buttons template
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-eye" className="p-button-sm p-button-info" tooltip="View Order" />
        <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" tooltip="Update Status" />
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Production Orders</h1>

      <div className="bg-white p-4 rounded shadow">
        <DataTable value={orders} paginator rows={5} responsiveLayout="scroll">
          <Column field="id" header="Order ID" sortable />
          <Column field="customer" header="Customer" sortable />
          <Column field="products" header="Products" sortable />
          <Column field="total" header="Total ($)" sortable />
          <Column field="status" header="Status" sortable />
          <Column field="assignedTo" header="Assigned To" sortable />
          <Column field="date" header="Date" sortable />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
