"use client";

import { Menubar } from "primereact/menubar";
import { useRouter, usePathname } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (path) => ({
    command: () => router.push(path),
    className: pathname.startsWith(path)
      ? "bg-blue-50 text-blue-700 font-medium"
      : ""
  });

  const items = [
    {
      label: "Master Data",
      icon: "pi pi-database",
      items: [
        {
          label: "UOM",
          icon: "pi pi-hashtag",
          ...navigate("/admin/uom")
        },
        {
          label: "Users",
          icon: "pi pi-user",
          ...navigate("/admin/users")
        },
        {
          label: "Geography",
          icon: "pi pi-map",
          items: [
            { label: "States", ...navigate("/admin/states") },
            { label: "Cities", ...navigate("/admin/cities") },
            { label: "Areas", ...navigate("/admin/areas") }
          ]
        }
      ]
    },
    {
      label: "Customers",
      icon: "pi pi-users",
      ...navigate("/admin/customers")
    },
    {
      label: "Production",
      icon: "pi pi-cog",
      ...navigate("/admin/production")
    },
    {
      label: "Orders",
      icon: "pi pi-shopping-cart",
      ...navigate("/admin/orders")
    }
  ];

  const start = (
    <div className="flex align-items-center gap-2">
      <span className="text-xl font-bold">Admin Panel</span>
    </div>
  );

  return (
    <header className="border-bottom-1 surface-border">
      <div className="max-w-7xl mx-auto px-4">
        <Menubar model={items} start={start} />
      </div>
    </header>
  );
}