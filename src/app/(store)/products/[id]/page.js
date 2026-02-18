'use client';

import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Sample products data (in real app, fetch from API)
const allProducts = [
  { id: '1', name: 'Cozy Poncho', category: 'Ponchos', price: 60, image: '/images/poncho.jpg', description: 'Stay warm and stylish with this cozy poncho made from premium fabric.' },
  { id: '2', name: 'Signature T-Shirt', category: 'T-Shirts', price: 25, image: '/images/tshirt.jpg', description: 'Classic signature t-shirt with soft cotton and perfect fit.' },
  { id: '3', name: 'Baggy Street Pants', category: 'Baggy Pants', price: 50, image: '/images/baggy-pants.jpg', description: 'Trendy baggy pants designed for comfort and street style.' },
  { id: '4', name: 'Urban Hoodie', category: 'Hoodies', price: 45, image: '/images/hoodie.jpg', description: 'Urban hoodie with soft fleece lining and modern cut.' },
];

export default function ProductPage() {
  const params = useParams(); // Next.js 13 app router
  const productId = params.id; 
  const [product, setProduct] = useState(null);

  // Load product on client (SSR-safe)
  useEffect(() => {
    const prod = allProducts.find((p) => p.id === productId);
    setProduct(prod);
  }, [productId]);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>

      {/* Product Details Panel */}
      <Panel header={product.name} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          
          {/* Product Image */}
          <Card style={{ width: '300px', textAlign: 'center' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: '1rem' }} />
          </Card>

          {/* Product Info */}
          <div style={{ maxWidth: '400px' }}>
            <h3>Category: {product.category}</h3>
            <h2 style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>${product.price}</h2>
            <p style={{ marginTop: '1rem' }}>{product.description}</p>
            <Button label="Add to Cart" className="p-button-primary p-button-lg" style={{ marginTop: '1rem' }} />
            <Button label="Add to Wishlist" className="p-button-outlined p-button-secondary p-button-lg" style={{ marginTop: '1rem', marginLeft: '1rem' }} />
          </div>

        </div>
      </Panel>

      {/* Related Products */}
      <Panel header="You may also like">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {allProducts
            .filter((p) => p.id !== product.id)
            .map((p) => (
              <Card key={p.id} style={{ width: '200px', textAlign: 'center' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '0.5rem' }} />
                <h4>{p.name}</h4>
                <p style={{ fontWeight: 'bold' }}>${p.price}</p>
                <Button label="View" className="p-button-sm p-button-outlined" onClick={() => (window.location.href = `/products/${p.id}`)} />
              </Card>
            ))}
        </div>
      </Panel>
    </div>
  );
}
