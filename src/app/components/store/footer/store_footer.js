'use client';

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Link from "next/link";

export default function StoreFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Plug-Core
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            Streetwear essentials including ponchos, t-shirts, hoodies and baggy
            pants designed for comfort and everyday style.
          </p>
        </div>

        {/* Store Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Store
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>

            <li>
              <Link href="/categories" className="hover:text-white transition">
                Categories
              </Link>
            </li>

            <li>
              <Link href="/orders" className="hover:text-white transition">
                Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Account
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/profile" className="hover:text-white transition">
                Profile
              </Link>
            </li>

            <li>
              <Link href="/settings" className="hover:text-white transition">
                Settings
              </Link>
            </li>

            <li>
              <Link href="/wishlist" className="hover:text-white transition">
                Wishlist
              </Link>
            </li>

            <li>
              <Link href="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Newsletter
          </h3>

          <p className="text-sm text-gray-400">
            Get updates about new product drops and exclusive offers.
          </p>

          <div className="flex gap-2">
            <InputText
              placeholder="Email address"
              className="flex-1 text-sm"
            />

            <Button
              label="Subscribe"
              className="p-button-primary"
            />
          </div>

          {/* Social */}
          <div className="flex gap-4 text-lg pt-2">
            <a href="#" className="hover:text-white">
              <i className="pi pi-instagram"></i>
            </a>

            <a href="#" className="hover:text-white">
              <i className="pi pi-twitter"></i>
            </a>

            <a href="#" className="hover:text-white">
              <i className="pi pi-youtube"></i>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} Plug-Core. All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-gray-300">
              Terms
            </Link>

            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}