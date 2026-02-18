'use client';

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function CMSPage() {
  // Mock CMS data
  const [pages] = useState([
    { id: 1, title: 'Home Banner', type: 'Banner', status: 'Active', created: '2026-02-10' },
    { id: 2, title: 'About Us', type: 'Page', status: 'Active', created: '2026-02-12' },
    { id: 3, title: 'Summer Sale', type: 'Promotion', status: 'Inactive', created: '2026-02-14' },
    { id: 4, title: 'Contact Page', type: 'Page', status: 'Active', created: '2026-02-15' },
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
      <h1 className="text-3xl font-bold mb-6">Content Management</h1>

      <div className="mb-4 flex justify-end">
        <Button label="Add Content" icon="pi pi-plus" className="p-button-success" />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <DataTable value={pages} paginator rows={5} responsiveLayout="scroll">
          <Column field="title" header="Title" sortable />
          <Column field="type" header="Type" sortable />
          <Column field="status" header="Status" sortable />
          <Column field="created" header="Created Date" sortable />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
