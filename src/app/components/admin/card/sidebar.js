'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PanelMenu } from 'primereact/panelmenu';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

export default function AdminSidebar({ role = 'admin' }) {
  const router = useRouter();

  const [menuModel] = useState([
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      path: '/admin/dashboard',
      roles: ['admin', 'operations', 'marketing'],
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      path: '/admin/users',
      roles: ['admin', 'operations'],
    },
    {
      label: 'Products',
      icon: 'pi pi-box',
      path: '/admin/products',
      roles: ['admin', 'operations', 'designer'],
    },
    {
      label: 'Orders',
      icon: 'pi pi-shopping-cart',
      path: '/admin/orders',
      roles: ['admin', 'operations'],
    },
    {
      label: 'CMS',
      icon: 'pi pi-file',
      path: '/admin/cms',
      roles: ['admin', 'marketing'],
    },
    {
      label: 'Reports',
      icon: 'pi pi-chart-bar',
      path: '/admin/reports',
      roles: ['admin', 'operations', 'marketing'],
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      path: '/admin/settings',
      roles: ['admin'],
    },
  ]);

  // Filter menu items based on role
  const filteredMenu = menuModel
    .filter(item => item.roles.includes(role))
    .map(item => ({
      ...item,
      command: () => router.push(item.path), // navigate when clicked
    }));

  return (
    <div className="w-64 h-screen bg-white shadow-md p-2">
      <h2 className="text-xl font-bold p-2 border-b mb-4">Admin</h2>
      <PanelMenu model={filteredMenu} />
    </div>
  );
}
