import React, { useState } from 'react';
import { tokens } from '../styles/tokens';
import { Card, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Products', value: '156' },
    { label: 'Total Orders', value: '1,234' },
    { label: 'Total Users', value: '5,678' },
    { label: 'Revenue', value: '$89,123' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', total: 129.99, status: 'pending' },
    { id: 'ORD-002', customer: 'Jane Smith', total: 89.50, status: 'shipped' },
    { id: 'ORD-003', customer: 'Bob Wilson', total: 45.00, status: 'delivered' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, boxShadow: tokens.shadows.sm }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop Admin</div>
          <nav style={{ display: 'flex', gap: tokens.spacing.lg }}>
            <a href="/admin" style={{ color: tokens.colors.primary, fontWeight: 600 }}>Dashboard</a>
            <a href="/admin-productos" style={{ color: tokens.colors.text_primary }}>Products</a>
            <a href="/admin-pedidos" style={{ color: tokens.colors.text_primary }}>Orders</a>
            <a href="/admin-usuarios" style={{ color: tokens.colors.text_primary }}>Users</a>
            <a href="/admin-cupones" style={{ color: tokens.colors.text_primary }}>Coupons</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: tokens.spacing.lg }}>
        <h1 style={{ fontSize: tokens.typography.headings.h1.size, marginBottom: tokens.spacing.lg }}>Admin Dashboard</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: tokens.spacing.lg, marginBottom: tokens.spacing.xl }}>
          {stats.map((stat, idx) => (
            <Card key={idx}>
              <CardContent>
                <p style={{ color: tokens.colors.text_secondary, margin: 0 }}>{stat.label}</p>
                <p style={{ fontSize: 32, fontWeight: 700, margin: `${tokens.spacing.sm} 0 0` }}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent>
            <h2 style={{ marginTop: 0 }}>Recent Orders</h2>
            <Table
              columns={[
                { key: 'id', label: 'Order ID' },
                { key: 'customer', label: 'Customer' },
                { key: 'total', label: 'Total' },
                { key: 'status', label: 'Status' },
              ]}
              data={recentOrders.map(o => ({ ...o, status: <Badge type="status" value={o.status} /> }))}
              rowKey="id"
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}