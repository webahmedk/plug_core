'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';

// Sample cart data
const sampleCart = [
  { id: '1', name: 'Cozy Poncho', category: 'Ponchos', price: 60, quantity: 1, image: '/images/poncho.jpg' },
  { id: '2', name: 'Signature T-Shirt', category: 'T-Shirts', price: 25, quantity: 2, image: '/images/tshirt.jpg' },
  { id: '4', name: 'Urban Hoodie', category: 'Hoodies', price: 45, quantity: 1, image: '/images/hoodie.jpg' },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(sampleCart); // Load sample cart (replace with API/fetch in real app)
  }, []);

  // Update quantity
  const onQuantityChange = (value, rowIndex) => {
    const updatedCart = [...cartItems];
    updatedCart[rowIndex].quantity = value;
    setCartItems(updatedCart);
  };

  // Remove product
  const onRemoveItem = (rowIndex) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(rowIndex, 1);
    setCartItems(updatedCart);
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Column templates
  const imageBodyTemplate = (rowData) => (
    <img src={rowData.image} alt={rowData.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
  );

  const quantityBodyTemplate = (rowData, { rowIndex }) => (
    <InputNumber 
      value={rowData.quantity} 
      onValueChange={(e) => onQuantityChange(e.value, rowIndex)} 
      min={1} 
      showButtons 
      buttonLayout="horizontal"
      incrementButtonClassName="p-button-success" 
      decrementButtonClassName="p-button-danger"
    />
  );

  const removeBodyTemplate = (rowData, { rowIndex }) => (
    <Button 
      icon="pi pi-trash" 
      className="p-button-danger p-button-rounded p-button-sm" 
      onClick={() => onRemoveItem(rowIndex)} 
    />
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>

      <Panel header="Your Shopping Cart" style={{ marginBottom: '2rem' }}>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          <DataTable value={cartItems} responsiveLayout="scroll" className="p-datatable-gridlines">
            <Column header="Product" body={imageBodyTemplate} style={{ width: '100px' }} />
            <Column field="name" header="Name" style={{ minWidth: '150px' }} />
            <Column field="category" header="Category" style={{ minWidth: '120px' }} />
            <Column field="price" header="Price ($)" body={(rowData) => `$${rowData.price}`} style={{ width: '120px' }} />
            <Column header="Quantity" body={quantityBodyTemplate} style={{ width: '150px' }} />
            <Column header="Subtotal" body={(rowData) => `$${rowData.price * rowData.quantity}`} style={{ width: '120px' }} />
            <Column header="Remove" body={removeBodyTemplate} style={{ width: '100px' }} />
          </DataTable>
        )}
      </Panel>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <Card style={{ textAlign: 'right', padding: '1rem' }}>
          <h3>Total: ${subtotal}</h3>
          <Button label="Proceed to Checkout" className="p-button-lg p-button-success" />
        </Card>
      )}
    </div>
  );
}
