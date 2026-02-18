'use client';

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

export default function ProductionProductsPage() {
  // Mock products in production
  const [products] = useState([
    { id: 401, name: 'T-Shirt', category: 'Apparel', quantity: 100, status: 'In Progress' },
    { id: 402, name: 'Sneakers', category: 'Footwear', quantity: 50, status: 'Pending' },
    { id: 403, name: 'Cap', category: 'Accessories', quantity: 200, status: 'Completed' },
    { id: 404, name: 'Jacket', category: 'Apparel', quantity: 30, status: 'In Progress' },
  ]);

  // Status tag template
  const statusBodyTemplate = (rowData) => {
    let severity = 'info';
    if (rowData.status === 'Completed') severity = 'success';
    else if (rowData.status === 'Pending') severity = 'warning';
    else if (rowData.status === 'In Progress') severity = 'info';
    return <Tag value={rowData.status} severity={severity} />;
  };

  // Action buttons template
  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" tooltip="Edit Product" />
      <Button icon="pi pi-check" className="p-button-sm p-button-success" tooltip="Mark Completed" />
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Products in Production</h1>

      <div className="mb-4 flex justify-end">
        <Button label="Add Product" icon="pi pi-plus" className="p-button-success" />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <DataTable value={products} paginator rows={5} responsiveLayout="scroll">
          <Column field="id" header="Product ID" sortable />
          <Column field="name" header="Product Name" sortable />
          <Column field="category" header="Category" sortable />
          <Column field="quantity" header="Quantity" sortable />
          <Column header="Status" body={statusBodyTemplate} sortable />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
