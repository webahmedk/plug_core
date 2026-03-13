'use client';

import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

export default function ProductionTasksPage() {
  // Mock tasks data
  const [tasks] = useState([
    { id: 301, task: 'Assemble T-Shirts', assignedTo: 'Team A', priority: 'High', status: 'Pending', dueDate: '2026-02-19' },
    { id: 302, task: 'Quality Check Sneakers', assignedTo: 'Team B', priority: 'Medium', status: 'In Progress', dueDate: '2026-02-20' },
    { id: 303, task: 'Pack Jackets', assignedTo: 'Team A', priority: 'High', status: 'Completed', dueDate: '2026-02-18' },
    { id: 304, task: 'Label Caps', assignedTo: 'Team C', priority: 'Low', status: 'Pending', dueDate: '2026-02-21' },
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
      <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" tooltip="Edit Task" />
      <Button icon="pi pi-check" className="p-button-sm p-button-success" tooltip="Mark Completed" />
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Production Tasks</h1>

      <div className="mb-4 flex justify-end">
        <Button label="Add Task" icon="pi pi-plus" className="p-button-success" />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <DataTable value={tasks} paginator rows={5} responsiveLayout="scroll">
          <Column field="id" header="Task ID" sortable />
          <Column field="task" header="Task Name" sortable />
          <Column field="assignedTo" header="Assigned To" sortable />
          <Column field="priority" header="Priority" sortable />
          <Column header="Status" body={statusBodyTemplate} sortable />
          <Column field="dueDate" header="Due Date" sortable />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
