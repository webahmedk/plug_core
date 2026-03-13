// components/AdminSidebar.jsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { PanelMenu } from "primereact/panelmenu";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Overview",
      icon: "pi pi-home",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-home",
          command: () => router.push("/admin"),
          className: pathname === "/admin" ? "bg-blue-50 text-blue-700" : "",
        },
        {
          label: "Analytics",
          icon: "pi pi-chart-line",
          command: () => router.push("/admin/analytics"),
          className: pathname.startsWith("/admin/analytics") ? "bg-blue-50 text-blue-700" : "",
        },
      ],
    },
    {
      label: "Master Data",
      icon: "pi pi-database",
      items: [
        {
          label: "UOM",
          icon: "pi pi-hashtag",
          command: () => router.push("/admin/uom"),
          className: pathname.startsWith("/admin/uom") ? "bg-blue-50 text-blue-700" : "",
        },
        {
          label: "Users",
          icon: "pi pi-user",
          command: () => router.push("/admin/users"),
          className: pathname.startsWith("/admin/users") ? "bg-blue-50 text-blue-700" : "",
        },
        {
          label: "States",
          icon: "pi pi-map",
          command: () => router.push("/admin/states"),
          className: pathname.startsWith("/admin/states") ? "bg-blue-50 text-blue-700" : "",
        },
        {
          label: "Cities",
          icon: "pi pi-map-marker",
          command: () => router.push("/admin/cities"),
          className: pathname.startsWith("/admin/cities") ? "bg-blue-50 text-blue-700" : "",
        },
        {
          label: "Areas",
          icon: "pi pi-map-marker",
          command: () => router.push("/admin/areas"),
          className: pathname.startsWith("/admin/areas") ? "bg-blue-50 text-blue-700" : "",
        },
      ],
    },
    {
      label: "Customers",
      icon: "pi pi-users",
      command: () => router.push("/admin/customers"),
      className: pathname.startsWith("/admin/customers") ? "bg-blue-50 text-blue-700" : "",
    },
    {
      label: "Production",
      icon: "pi pi-cog",
      command: () => router.push("/admin/production"),
      className: pathname.startsWith("/admin/production") ? "bg-blue-50 text-blue-700" : "",
    },
    {
      label: "Orders",
      icon: "pi pi-shopping-cart",
      command: () => router.push("/admin/orders"),
      className: pathname.startsWith("/admin/orders") ? "bg-blue-50 text-blue-700" : "",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
        <PanelMenu model={menuItems} className="border-none" multiple={false} />
      </div>
    </aside>
  );
}