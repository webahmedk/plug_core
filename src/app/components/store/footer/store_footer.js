'use client';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import Link from 'next/link';

export default function StoreFooter() {
  return (
    <footer className="bg-gray-800 text-gray-200 dark:bg-gray-900 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-500 mb-4">Plug-Core</h2>
          <p className="text-gray-400">
            Streetwear essentials: Ponchos, T-Shirts, Baggy Pants & Hoodies.  
            Stay stylish, comfortable, and unique.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
            <li><Link href="/store" className="hover:text-indigo-400 transition-colors">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-indigo-400 transition-colors">Categories</Link></li>
            <li><Link href="/orders" className="hover:text-indigo-400 transition-colors">Orders</Link></li>
            <li><Link href="/profile" className="hover:text-indigo-400 transition-colors">Profile</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-indigo-400 transition-colors"><i className="pi pi-facebook"></i></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><i className="pi pi-instagram"></i></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><i className="pi pi-twitter"></i></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><i className="pi pi-youtube"></i></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-3">Get the latest drops and exclusive offers.</p>
          <div className="flex gap-2">
            <InputText placeholder="Your email" className="flex-1 p-2 rounded-md text-gray-800" />
            <Button label="Subscribe" className="p-button-primary" />
          </div>
        </div>

      </div>

      {/* Bottom Note */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Plug-Core. All rights reserved.
      </div>
    </footer>
  );
}
