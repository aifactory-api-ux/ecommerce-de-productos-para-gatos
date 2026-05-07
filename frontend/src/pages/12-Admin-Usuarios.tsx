import React, { useState } from 'react';
import { tokens } from '../styles/tokens';
import { Card, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  orders: number;
  joined: string;
}

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer', orders: 5, joined: '2024-01-01' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', orders: 0, joined: '2024-01-01' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'customer', orders: 12, joined: '2023-12-15' },
  ]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, boxShadow: tokens.shadows.sm }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop Admin</div>
          <nav style={{ display: 'flex', gap: tokens.spacing.lg }}>
            <a href="/admin" style={{ color: tokens.colors.text_primary }}>Dashboard</a>
            <a href="/admin-productos" style={{ color: tokens.colors.text_primary }}>Products</a>
            <a href="/admin-pedidos" style={{ color: tokens.colors.text_primary }}>Orders</a>
            <a href="/admin-usuarios" style={{ color: tokens.colors.primary, fontWeight: 600 }}>Users</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: tokens.spacing.lg }}>
        <h1 style={{ fontSize: tokens.typography.headings.h1.size, marginBottom: tokens.spacing.lg }}>Users</h1>

        <Card>
          <CardContent>
            <Table
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'role', label: 'Role' },
                { key: 'orders', label: 'Orders' },
                { key: 'joined', label: 'Joined' },
              ]}
              data={users.map(u => ({
                ...u,
                role: <Badge type="status" value={u.role} color={u.role === 'admin' ? tokens.colors.primary : tokens.colors.secondary} />,
              }))}
              rowKey="id"
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}