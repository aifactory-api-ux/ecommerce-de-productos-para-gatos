import React, { useState } from 'react';
import { tokens } from '../styles/tokens';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Dropdown } from '../components/ui/Dropdown';

interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: string;
  date: string;
}

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD-001', customer: 'John Doe', items: 3, total: 129.99, status: 'pending', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Jane Smith', items: 1, total: 89.50, status: 'shipped', date: '2024-01-14' },
    { id: 'ORD-003', customer: 'Bob Wilson', items: 2, total: 45.00, status: 'delivered', date: '2024-01-13' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return tokens.colors.warning;
      case 'shipped': return tokens.colors.secondary;
      case 'delivered': return tokens.colors.success;
      case 'cancelled': return tokens.colors.error;
      default: return tokens.colors.text_secondary;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, boxShadow: tokens.shadows.sm }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop Admin</div>
          <nav style={{ display: 'flex', gap: tokens.spacing.lg }}>
            <a href="/admin" style={{ color: tokens.colors.text_primary }}>Dashboard</a>
            <a href="/admin-productos" style={{ color: tokens.colors.text_primary }}>Products</a>
            <a href="/admin-pedidos" style={{ color: tokens.colors.primary, fontWeight: 600 }}>Orders</a>
            <a href="/admin-usuarios" style={{ color: tokens.colors.text_primary }}>Users</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: tokens.spacing.lg }}>
        <h1 style={{ fontSize: tokens.typography.headings.h1.size, marginBottom: tokens.spacing.lg }}>Orders</h1>

        <Card>
          <CardContent>
            <Table
              columns={[
                { key: 'id', label: 'Order ID' },
                { key: 'customer', label: 'Customer' },
                { key: 'items', label: 'Items' },
                { key: 'total', label: 'Total' },
                { key: 'status', label: 'Status' },
                { key: 'date', label: 'Date' },
                { key: 'actions', label: 'Actions' },
              ]}
              data={orders.map(o => ({
                ...o,
                status: <Badge type="status" value={o.status} color={getStatusColor(o.status)} />,
                actions: <Dropdown
                  options={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'shipped', label: 'Shipped' },
                    { value: 'delivered', label: 'Delivered' },
                    { value: 'cancelled', label: 'Cancelled' },
                  ]}
                  value={o.status}
                  onChange={() => {}}
                />
              }))}
              rowKey="id"
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}