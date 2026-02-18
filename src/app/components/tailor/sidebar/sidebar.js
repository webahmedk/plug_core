'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PanelMenu } from 'primereact/panelmenu';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function ProductionSidebar() {
  const router = useRouter();

  const [menuModel] = useState([
    { label: 'Dashboard', icon: 'pi pi-home', path: '/production', },
    { label: 'Orders', icon: 'pi pi-shopping-cart', path: '/production/orders', },
    { label: 'Tasks', icon: 'pi pi-list', path: '/production/tasks', },
    { label: 'Products', icon: 'pi pi-box', path: '/production/products', },
    { label: 'Reports', icon: 'pi pi-chart-bar', path: '/production/reports', },
  ]);

  // Add router push for each menu item
  const filteredMenu = menuModel.map(item => ({
    ...item,
    command: () => router.push(item.path),
  }));

  return (
    <div className="w-64 h-screen bg-white shadow-md p-2">
      <h2 className="text-xl font-bold p-2 border-b mb-4">Production</h2>
      <PanelMenu model={filteredMenu} />
    </div>
  );
}
