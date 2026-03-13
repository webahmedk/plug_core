"use client";

import Link from "next/link";
import { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";

export default function StoreHeader() {
  const menu = useRef(null);

  const navItems = [
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
  ];

  const profileItems = [
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => (window.location.href = "/profile"),
    },
    {
      label: "Orders",
      icon: "pi pi-shopping-bag",
      command: () => (window.location.href = "/orders"),
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => (window.location.href = "/settings"),
    },
    { separator: true },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => console.log("logout"),
    },
  ];

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold text-gray-900 flex items-center gap-2"
          >
            <i className="pi pi-shopping-bag text-indigo-600"></i>
            Plug-Core
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-black transition flex items-center gap-1"
              >
                <i className="pi pi-angle-right text-xs"></i>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search */}
        <div className="hidden md:block w-80 relative mx-10">
          <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <InputText
            placeholder="Search products"
            className="w-full pl-9 py-2 text-sm"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-black"
          >
            <i className="pi pi-shopping-cart text-lg"></i>
            <Badge
              value="2"
              severity="danger"
              className="absolute -top-2 -right-2"
            />
          </Link>

          {/* Profile Avatar */}
          <Avatar
            image="/profile.jpg"
            shape="circle"
            size="normal"
            className="cursor-pointer"
            onClick={(e) => menu.current.toggle(e)}
          />

          <Menu model={profileItems} popup ref={menu} />
        </div>
      </div>
    </header>
  );
}
