'use client';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel';

export default function Store() {
  // Sample products for carousel
  const products = [
    { name: 'Classic White Tee', image: '/images/white-tee.jpg', price: '$25' },
    { name: 'Denim Jacket', image: '/images/denim-jacket.jpg', price: '$80' },
    { name: 'Casual Hoodie', image: '/images/hoodie.jpg', price: '$45' },
  ];

  const productTemplate = (product) => {
    return (
      <Card title={product.name} className="m-2 shadow-lg">
        <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded-md mb-3" />
        <p className="font-semibold text-lg">{product.price}</p>
        <Button label="Shop Now" className="p-button-primary w-full mt-2" />
      </Card>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-gray-900 font-sans">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-24 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to LuxeThreads</h1>
        <p className="text-xl mb-6">Premium clothing for every occasion</p>
        <Button label="Shop Collection" className="p-button-lg p-button-outlined p-button-light" />
      </div>

      {/* Featured Products Carousel */}
      <div className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Featured Products</h2>
        <Carousel value={products} numVisible={3} numScroll={1} itemTemplate={productTemplate} className="custom-carousel" responsiveOptions={[
          { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
          { breakpoint: '600px', numVisible: 1, numScroll: 1 },
        ]}/>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center py-12 bg-gray-100 dark:bg-gray-800">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Join our Newsletter</h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Stay updated with the latest trends and exclusive offers.</p>
        <Button label="Subscribe Now" className="p-button-success p-button-lg" />
      </div>
    </div>
  );
}
