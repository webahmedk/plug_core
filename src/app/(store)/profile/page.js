'use client';

import { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

// Sample user data
const sampleUser = {
  name: 'Khalid Ahmed Khan',
  email: 'khalid@example.com',
  role: 'Customer',
  ordersCount: 3,
  wishlistCount: 3,
  cartCount: 3,
};

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setUser(sampleUser); // Load user data (replace with API/fetch in real app)
    setName(sampleUser.name);
    setEmail(sampleUser.email);
  }, []);

  const saveProfile = () => {
    // Replace with API call to save profile
    alert(`Profile updated!\nName: ${name}\nEmail: ${email}`);
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>

      {/* User Info Panel */}
      <Panel header="Profile Information" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <label htmlFor="name">Name</label>
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="role">Role</label>
          <InputText id="role" value={user.role} disabled />

          <Button label="Save Changes" className="p-button-success" onClick={saveProfile} style={{ marginTop: '1rem' }} />
        </div>
      </Panel>

      <Divider />

      {/* Summary Panels */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
        <Card title="Orders" subTitle={`${user.ordersCount} orders`} style={{ width: '200px', textAlign: 'center' }}>
          <Button label="View Orders" className="p-button-sm p-button-info" />
        </Card>

        <Card title="Wishlist" subTitle={`${user.wishlistCount} items`} style={{ width: '200px', textAlign: 'center' }}>
          <Button label="View Wishlist" className="p-button-sm p-button-warning" />
        </Card>

        <Card title="Cart" subTitle={`${user.cartCount} items`} style={{ width: '200px', textAlign: 'center' }}>
          <Button label="View Cart" className="p-button-sm p-button-success" />
        </Card>
      </div>

    </div>
  );
}
