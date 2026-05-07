import React, { useState } from 'react';
import { tokens } from '../styles/tokens';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Tabs } from '../components/ui/Tabs';

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default function PerfilPage() {
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://placekitten.com/200/200',
  });

  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', fullName: 'John Doe', addressLine1: '123 Main St', city: 'New York', state: 'NY', postalCode: '10001', country: 'USA' },
  ]);

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, boxShadow: tokens.shadows.sm }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop</div>
          <nav style={{ display: 'flex', gap: tokens.spacing.lg }}>
            <a href="/" style={{ color: tokens.colors.text_primary, textDecoration: 'none' }}>Home</a>
            <a href="/catalogo" style={{ color: tokens.colors.text_primary, textDecoration: 'none' }}>Catalog</a>
            <a href="/carrito" style={{ color: tokens.colors.text_primary, textDecoration: 'none' }}>Cart</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: tokens.spacing.lg }}>
        <h1 style={{ fontSize: tokens.typography.headings.h1.size, marginBottom: tokens.spacing.lg }}>My Profile</h1>

        <div style={{ display: 'flex', gap: tokens.spacing.lg }}>
          <Card style={{ width: 250, padding: tokens.spacing.lg }}>
            <div style={{ textAlign: 'center' }}>
              <Avatar src={user.avatarUrl} alt={user.name} size={100} />
              <h2 style={{ fontSize: tokens.typography.headings.h3.size, marginTop: tokens.spacing.md }}>{user.name}</h2>
              <p style={{ color: tokens.colors.text_secondary }}>{user.email}</p>
            </div>
            <hr style={{ border: 'none', borderTop: `1px solid ${tokens.colors.border}`, margin: `${tokens.spacing.md} 0` }} />
            <nav>
              <a href="#profile" onClick={() => setActiveTab('profile')} style={{ display: 'block', padding: `${tokens.spacing.sm} 0`, color: activeTab === 'profile' ? tokens.colors.primary : tokens.colors.text_primary, textDecoration: 'none' }}>Profile</a>
              <a href="#addresses" onClick={() => setActiveTab('addresses')} style={{ display: 'block', padding: `${tokens.spacing.sm} 0`, color: activeTab === 'addresses' ? tokens.colors.primary : tokens.colors.text_primary, textDecoration: 'none' }}>Addresses</a>
              <a href="/historial-pedidos" style={{ display: 'block', padding: `${tokens.spacing.sm} 0`, color: tokens.colors.text_primary, textDecoration: 'none' }}>Order History</a>
            </nav>
          </Card>

          <div style={{ flex: 1 }}>
            {activeTab === 'profile' && (
              <Card>
                <CardContent>
                  <h2 style={{ marginTop: 0 }}>Profile Information</h2>
                  <form>
                    <Input type="text" value={user.name} onChange={() => {}} label="Full Name" />
                    <div style={{ marginTop: tokens.spacing.md }}>
                      <Input type="email" value={user.email} onChange={() => {}} label="Email" />
                    </div>
                    <Button variant="primary" style={{ marginTop: tokens.spacing.lg }}>Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === 'addresses' && (
              <Card>
                <CardContent>
                  <h2 style={{ marginTop: 0 }}>Saved Addresses</h2>
                  {addresses.map(addr => (
                    <div key={addr.id} style={{ padding: tokens.spacing.md, border: `1px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md, marginBottom: tokens.spacing.sm }}>
                      <p style={{ margin: 0, fontWeight: 500 }}>{addr.fullName}</p>
                      <p style={{ margin: `${tokens.spacing.xs} 0`, color: tokens.colors.text_secondary }}>
                        {addr.addressLine1}, {addr.city}, {addr.state} {addr.postalCode}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" style={{ marginTop: tokens.spacing.md }}>+ Add New Address</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}