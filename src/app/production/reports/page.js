'use client';

import { useState } from 'react';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';

export default function ProductionReportsPage() {
  // Mock summary stats
  const [summary] = useState({
    totalOrders: 45,
    pendingTasks: 12,
    completedTasks: 28,
    productsInProgress: 15,
  });

  // Mock report data
  const [tasksReport] = useState([
    { id: 301, task: 'Assemble T-Shirts', status: 'Completed', assignedTo: 'Team A', dueDate: '2026-02-19' },
    { id: 302, task: 'Quality Check Sneakers', status: 'In Progress', assignedTo: 'Team B', dueDate: '2026-02-20' },
    { id: 303, task: 'Pack Jackets', status: 'Completed', assignedTo: 'Team A', dueDate: '2026-02-18' },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Production Reports & Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Orders" className="text-center">{summary.totalOrders}</Card>
        <Card title="Pending Tasks" className="text-center">{summary.pendingTasks}</Card>
        <Card title="Completed Tasks" className="text-center">{summary.completedTasks}</Card>
        <Card title="Products In Progress" className="text-center">{summary.productsInProgress}</Card>
      </div>

      {/* Tasks Progress Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow h-64 flex flex-col items-center justify-center text-gray-400 border border-dashed">
          <h2 className="mb-4 text-lg font-semibold">Tasks Completion</h2>
          <ProgressBar value={(summary.completedTasks / (summary.completedTasks + summary.pendingTasks)) * 100} showValue />
        </div>

        <div className="bg-white p-6 rounded shadow h-64 flex items-center justify-center text-gray-400 border border-dashed">
          Orders Chart Placeholder
        </div>
      </div>

      {/* Tasks Report Table */}
      <div className="bg-white p-4 rounded shadow mt-8">
        <h2 className="text-xl font-semibold mb-4">Detailed Tasks Report</h2>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Task ID</th>
              <th className="border p-2">Task Name</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Assigned To</th>
              <th className="border p-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasksReport.map(task => (
              <tr key={task.id}>
                <td className="border p-2">{task.id}</td>
                <td className="border p-2">{task.task}</td>
                <td className="border p-2">{task.status}</td>
                <td className="border p-2">{task.assignedTo}</td>
                <td className="border p-2">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
