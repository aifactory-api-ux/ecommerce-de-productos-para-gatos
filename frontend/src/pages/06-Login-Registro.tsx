import React, { useState } from 'react';
import { tokens } from '../styles/tokens';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';

export default function LoginRegistroPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', name: '' });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Login with: ${loginData.email}`);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Register with: ${registerData.email}, ${registerData.name}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ width: '100%', maxWidth: 450 }}>
        <CardContent>
          <div style={{ textAlign: 'center', marginBottom: tokens.spacing.lg }}>
            <div style={{ fontSize: 48 }}>🐱</div>
            <h1 style={{ fontSize: tokens.typography.headings.h2.size, marginTop: tokens.spacing.sm }}>CatShop</h1>
          </div>

          <Tabs
            tabs={[
              { label: 'Login', key: 'login' },
              { label: 'Register', key: 'register' },
            ]}
            activeKey={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'login' && (
            <form onSubmit={handleLogin} style={{ marginTop: tokens.spacing.lg }}>
              <Input type="email" name="email" value={loginData.email} onChange={handleLoginChange} label="Email" placeholder="your@email.com" required />
              <div style={{ marginTop: tokens.spacing.md }}>
                <Input type="password" name="password" value={loginData.password} onChange={handleLoginChange} label="Password" placeholder="••••••••" required />
              </div>
              <Button type="submit" variant="primary" size="lg" style={{ width: '100%', marginTop: tokens.spacing.lg }}>
                Login
              </Button>
              <p style={{ textAlign: 'center', marginTop: tokens.spacing.md }}>
                <a href="#" style={{ color: tokens.colors.primary }}>Forgot password?</a>
              </p>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={handleRegister} style={{ marginTop: tokens.spacing.lg }}>
              <Input type="text" name="name" value={registerData.name} onChange={handleRegisterChange} label="Full Name" placeholder="John Doe" required />
              <div style={{ marginTop: tokens.spacing.md }}>
                <Input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} label="Email" placeholder="your@email.com" required />
              </div>
              <div style={{ marginTop: tokens.spacing.md }}>
                <Input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} label="Password" placeholder="••••••••" required />
              </div>
              <Button type="submit" variant="primary" size="lg" style={{ width: '100%', marginTop: tokens.spacing.lg }}>
                Create Account
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}