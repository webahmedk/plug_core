'use client';

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function ProductsPage() {
  // Mock product data
  const [products] = useState([
    { id: 1, name: 'T-Shirt', category: 'Apparel', price: 25, stock: 100, status: 'Active' },
    { id: 2, name: 'Sneakers', category: 'Footwear', price: 75, stock: 50, status: 'Active' },
    { id: 3, name: 'Cap', category: 'Accessories', price: 15, stock: 0, status: 'Inactive' },
    { id: 4, name: 'Jacket', category: 'Apparel', price: 120, stock: 20, status: 'Active' },
  ]);

  // Action buttons template
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" tooltip="Edit" />
        <Button icon="pi pi-trash" className="p-button-sm p-button-danger" tooltip="Delete" />
        <Button
          icon={rowData.status === 'Active' ? 'pi pi-times' : 'pi pi-check'}
          className="p-button-sm p-button-info"
          tooltip={rowData.status === 'Active' ? 'Deactivate' : 'Activate'}
        />
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      <div className="mb-4 flex justify-end">
        <Button label="Add Product" icon="pi pi-plus" className="p-button-success" />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <DataTable value={products} paginator rows={5} responsiveLayout="scroll">
          <Column field="name" header="Product Name" sortable />
          <Column field="category" header="Category" sortable />
          <Column field="price" header="Price ($)" sortable />
          <Column field="stock" header="Stock" sortable />
          <Column field="status" header="Status" sortable />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
