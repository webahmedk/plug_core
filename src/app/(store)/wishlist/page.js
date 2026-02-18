'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

// Sample wishlist data
const sampleWishlist = [
  { id: '1', name: 'Cozy Poncho', category: 'Ponchos', price: 60, image: '/images/poncho.jpg' },
  { id: '2', name: 'Signature T-Shirt', category: 'T-Shirts', price: 25, image: '/images/tshirt.jpg' },
  { id: '4', name: 'Urban Hoodie', category: 'Hoodies', price: 45, image: '/images/hoodie.jpg' },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setWishlistItems(sampleWishlist); // Load sample wishlist (replace with API/fetch in real app)
  }, []);

  const removeItem = (id) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updated);
  };

  const moveToCart = (id) => {
    // In real app, call API to move to cart
    removeItem(id);
    alert('Product moved to cart!');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>

      <Panel header="Your Wishlist" style={{ marginBottom: '2rem' }}>
        {wishlistItems.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your wishlist is empty.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            {wishlistItems.map((item) => (
              <Card key={item.id} style={{ width: '220px', textAlign: 'center' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '0.5rem' }} 
                />
                <h4>{item.name}</h4>
                <p>{item.category}</p>
                <p style={{ fontWeight: 'bold' }}>${item.price}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <Button label="Move to Cart" className="p-button-success p-button-sm" onClick={() => moveToCart(item.id)} />
                  <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => removeItem(item.id)} />
                </div>
              </Card>
            ))}
          </div>
        )}
      </Panel>

    </div>
  );
}
