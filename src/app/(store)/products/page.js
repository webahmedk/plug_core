'use client';

import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';

// Sample product data
const allProducts = [
  { name: 'Cozy Poncho', category: 'Ponchos', price: 60, image: '/images/poncho.jpg' },
  { name: 'Signature T-Shirt', category: 'T-Shirts', price: 25, image: '/images/tshirt.jpg' },
  { name: 'Baggy Street Pants', category: 'Baggy Pants', price: 50, image: '/images/baggy-pants.jpg' },
  { name: 'Urban Hoodie', category: 'Hoodies', price: 45, image: '/images/hoodie.jpg' },
  { name: 'Oversized Hoodie', category: 'Hoodies', price: 55, image: '/images/hoodie2.jpg' },
  { name: 'Striped Baggy Pants', category: 'Baggy Pants', price: 52, image: '/images/baggy-pants2.jpg' },
  { name: 'Colorful Poncho', category: 'Ponchos', price: 65, image: '/images/poncho2.jpg' },
  { name: 'Graphic Tee', category: 'T-Shirts', price: 28, image: '/images/tshirt2.jpg' },
];

const categories = ['All', 'Ponchos', 'T-Shirts', 'Baggy Pants', 'Hoodies'];
const sortOptions = [
  { label: 'Price: Low to High', value: 'low-high' },
  { label: 'Price: High to Low', value: 'high-low' },
];

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState(null);

  // Filter products by category
  useEffect(() => {
    let products = allProducts;
    if (selectedCategory !== 'All') {
      products = products.filter((p) => p.category === selectedCategory);
    }
    // Apply sorting
    if (selectedSort === 'low-high') {
      products = products.slice().sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'high-low') {
      products = products.slice().sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(products);
  }, [selectedCategory, selectedSort]);

  const productCard = (product) => (
    <Card key={product.name} style={{ width: '16rem', margin: '1rem', textAlign: 'center' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '0.5rem' }} />
      <h4>{product.name}</h4>
      <p style={{ fontWeight: 'bold' }}>${product.price}</p>
      <Button label="Shop Now" className="p-button-primary" />
    </Card>
  );

  return (
    <div>
      {/* Page Header */}
      <Panel header="All Products" style={{ margin: '2rem', textAlign: 'center' }}>
        <p>Browse our exclusive Plug-Core collection of Ponchos, T-Shirts, Baggy Pants, and Hoodies.</p>
      </Panel>

      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Dropdown
          value={selectedCategory}
          options={categories.map((c) => ({ label: c, value: c }))}
          onChange={(e) => setSelectedCategory(e.value)}
          placeholder="Filter by Category"
        />
        <Dropdown
          value={selectedSort}
          options={sortOptions}
          onChange={(e) => setSelectedSort(e.value)}
          placeholder="Sort Products"
        />
      </div>

      {/* Product Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredProducts.map((product) => productCard(product))}
      </div>

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>No products found for selected filters.</p>
        </div>
      )}
    </div>
  );
}
