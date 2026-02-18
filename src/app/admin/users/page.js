'use client';

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function UsersPage() {
  // Mock user data
  const [users] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'operations', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'designer', status: 'Active' },
    { id: 4, name: 'Dana White', email: 'dana@example.com', role: 'marketing', status: 'Active' },
  ]);

  // Action buttons in table
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
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="mb-4 flex justify-end">
        <Button label="Add User" icon="pi pi-plus" className="p-button-success" />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <DataTable value={users} paginator rows={5} responsiveLayout="scroll">
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="role" header="Role" sortable />
          <Column field="status" header="Status" sortable />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
