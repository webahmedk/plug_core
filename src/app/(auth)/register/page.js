'use client';

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');




  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword ) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Replace with real API call
    alert(`Registered:\nName: ${name}\nEmail: ${email}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: '#f5f5f5' }}>
      
      <Card title="Plug-Core Registration" style={{ width: '450px', padding: '2rem' }}>
        
        <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <label htmlFor="name">Full Name</label>
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />

          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <Password id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} toggleMask feedback={false} />



          <Button label="Register" className="p-button-lg p-button-primary" onClick={handleRegister} />

          <Divider>OR</Divider>

          <div style={{ textAlign: 'center' }}>
            <span>Already have an account? </span>
            <Link href="/login" style={{ textDecoration: 'underline', color: '#3b82f6' }}>Login</Link>
          </div>

        </div>
      </Card>
    </div>
  );
}
