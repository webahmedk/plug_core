'use client';

import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

export default function StoreHeader() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menu = useRef(null);

  // mark that we are on client
  useEffect(() => {
    setIsClient(true);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    { label: 'Home', icon: 'pi pi-home', command: () => window.location.href = '/' },
    { label: 'All Products', icon: 'pi pi-list', command: () => window.location.href = '/products' },
    { label: 'Categories', icon: 'pi pi-tags', command: () => window.location.href = '/categories' },
    { label: 'Cart', icon: 'pi pi-shopping-cart', command: () => window.location.href = '/cart' },
    { label: 'Wishlist', icon: 'pi pi-heart', command: () => window.location.href = '/wishlist' },
    { label: 'Orders', icon: 'pi pi-check-square', command: () => window.location.href = '/orders' },
    { label: 'Profile', icon: 'pi pi-user', command: () => window.location.href = '/profile' },
  ];

  const end = (
    <div className="flex items-center gap-4">
      <Link href="/login">
        <Button 
          label="Login" 
          className="p-button-text p-button-sm text-gray-800 dark:text-white hover:text-indigo-500 transition-all" 
        />
      </Link>
      <Link href="/register">
        <Button 
          label="Register" 
          className="p-button-primary p-button-sm shadow-md hover:shadow-lg transition-all" 
        />
      </Link>
    </div>
  );

  const renderItems = items.map((item, index) => (
    <Link key={index} href="#" onClick={item.command} className="flex items-center gap-1 text-gray-800 dark:text-gray-100 hover:text-indigo-500 transition-all px-3 py-1">
      <i className={`${item.icon} text-lg`}></i>
      <span>{item.label}</span>
    </Link>
  ));

  // only render mobile vs desktop after hydration
  if (!isClient) return null;

  return (
    <header className="bg-zinc-50 dark:bg-gray-900 shadow-lg sticky top-0 z-50 px-6 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">

      {/* Brand */}
      <Link href="/">
        <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wide hover:opacity-90 transition-all">
          Plug-Core
        </span>
      </Link>

      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className="flex items-center gap-5">
          {renderItems}
        </nav>
      )}

      {/* Mobile Menu */}
      {isMobile ? (
        <div className="flex items-center gap-2">
          <Button icon="pi pi-bars" className="p-button-rounded p-button-text" onClick={(e) => menu.current.toggle(e)} />
          <Menu model={items} popup ref={menu} />
        </div>
      ) : (
        end
      )}
    </header>
  );
}

