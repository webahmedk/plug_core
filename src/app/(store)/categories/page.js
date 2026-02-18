'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

// Sample categories data
const sampleCategories = [
  { id: 'ponchos', name: 'Ponchos', image: '/images/poncho-category.jpg', productCount: 5 },
  { id: 'tshirts', name: 'T-Shirts', image: '/images/tshirt-category.jpg', productCount: 8 },
  { id: 'baggy-pants', name: 'Baggy Pants', image: '/images/baggy-pants-category.jpg', productCount: 6 },
  { id: 'hoodies', name: 'Hoodies', image: '/images/hoodie-category.jpg', productCount: 7 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(sampleCategories); // Load categories (replace with API/fetch in real app)
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>

      <Panel header="Browse Categories" style={{ marginBottom: '2rem' }}>
        {categories.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No categories available.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            {categories.map((cat) => (
              <Card key={cat.id} style={{ width: '220px', textAlign: 'center' }}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }} 
                />
                <h4>{cat.name}</h4>
                <p>{cat.productCount} Products</p>
                <Button 
                  label="View Products" 
                  className="p-button-sm p-button-info" 
                  onClick={() => window.location.href = `/products?category=${cat.id}`} 
                />
              </Card>
            ))}
          </div>
        )}
      </Panel>

    </div>
  );
}
