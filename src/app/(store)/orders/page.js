'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Panel } from 'primereact/panel';

// Sample orders data
const sampleOrders = [
  {
    id: 'ORD001',
    date: '2026-02-18',
    status: 'Pending',
    items: [
      { name: 'Cozy Poncho', quantity: 1 },
      { name: 'Signature T-Shirt', quantity: 2 },
    ],
    total: 110,
  },
  {
    id: 'ORD002',
    date: '2026-02-15',
    status: 'Shipped',
    items: [
      { name: 'Baggy Street Pants', quantity: 1 },
      { name: 'Urban Hoodie', quantity: 1 },
    ],
    total: 95,
  },
  {
    id: 'ORD003',
    date: '2026-02-10',
    status: 'Delivered',
    items: [
      { name: 'Graphic Tee', quantity: 2 },
    ],
    total: 56,
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(sampleOrders); // Load orders (replace with API/fetch in real app)
  }, []);

  const statusBodyTemplate = (rowData) => {
    let severity = 'info';
    if (rowData.status === 'Delivered') severity = 'success';
    else if (rowData.status === 'Shipped') severity = 'warning';
    else if (rowData.status === 'Pending') severity = 'danger';

    return <Tag value={rowData.status} severity={severity} />;
  };

  const itemsBodyTemplate = (rowData) => (
    <ul style={{ paddingLeft: '1rem', margin: 0 }}>
      {rowData.items.map((item, i) => (
        <li key={i}>{item.name} x {item.quantity}</li>
      ))}
    </ul>
  );

  const viewDetails = (rowData) => {
    alert(`Viewing details for Order ${rowData.id}`);
    // Replace with modal or redirect to order details page
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>

      <Panel header="Your Orders" style={{ marginBottom: '2rem' }}>
        {orders.length === 0 ? (
          <p style={{ textAlign: 'center' }}>You have no orders yet.</p>
        ) : (
          <DataTable value={orders} responsiveLayout="scroll" className="p-datatable-gridlines">
            <Column field="id" header="Order ID" style={{ minWidth: '120px' }} />
            <Column field="date" header="Date" style={{ minWidth: '120px' }} />
            <Column header="Status" body={statusBodyTemplate} style={{ minWidth: '120px' }} />
            <Column header="Items" body={itemsBodyTemplate} style={{ minWidth: '250px' }} />
            <Column field="total" header="Total ($)" body={(rowData) => `$${rowData.total}`} style={{ minWidth: '100px' }} />
            <Column 
              header="Actions" 
              body={(rowData) => (
                <Button label="View Details" className="p-button-sm p-button-info" onClick={() => viewDetails(rowData)} />
              )} 
              style={{ minWidth: '150px' }}
            />
          </DataTable>
        )}
      </Panel>

    </div>
  );
}
