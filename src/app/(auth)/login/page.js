'use client';

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    // Replace with real API call
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    alert(`Logging in with:\nEmail: ${email}\nPassword: ${password}\nRemember: ${remember}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem', backgroundColor: '#f5f5f5' }}>
      
      <Card title="Plug-Core Login" style={{ width: '400px', padding: '2rem' }}>
        
        <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Checkbox inputId="remember" checked={remember} onChange={(e) => setRemember(e.checked)} />
            <label htmlFor="remember" style={{ marginLeft: '0.5rem' }}>Remember me</label>
            <Link href="/forgot-password" style={{ textDecoration: 'underline', color: '#3b82f6' }}>Forgot password?</Link>
          </div>

          <Button label="Login" className="p-button-lg p-button-primary" onClick={handleLogin} />

          <Divider>OR</Divider>

          <div style={{ textAlign: 'center' }}>
            <span>Don't have an account? </span>
            <Link href="/register" style={{ textDecoration: 'underline', color: '#3b82f6' }}>Register</Link>
          </div>

        </div>
      </Card>
    </div>
  );
}
