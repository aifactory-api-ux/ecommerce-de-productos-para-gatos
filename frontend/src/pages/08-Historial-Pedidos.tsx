import React, { useState, useEffect } from 'react';
import { tokens } from '../styles/tokens';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';

interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export default function HistorialPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      items: [
        { name: 'Premium Cat Food', quantity: 2, price: 29.99 },
        { name: 'Cat Toy Set', quantity: 1, price: 19.99 },
      ],
      total: 79.97,
      status: 'delivered',
      createdAt: '2024-01-15',
    },
    {
      id: 'ORD-002',
      items: [
        { name: 'Cozy Cat Bed', quantity: 1, price: 49.99 },
      ],
      total: 49.99,
      status: 'shipped',
      createdAt: '2024-01-20',
    },
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return tokens.colors.warning;
      case 'paid': return tokens.colors.secondary;
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
          <div style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop</div>
          <nav style={{ display: 'flex', gap: tokens.spacing.lg }}>
            <a href="/" style={{ color: tokens.colors.text_primary, textDecoration: 'none' }}>Home</a>
            <a href="/catalogo" style={{ color: tokens.colors.text_primary, textDecoration: 'none' }}>Catalog</a>
            <a href="/carrito" style={{ color: tokens.colors.text_primary, textDecoration: 'none' }}>Cart</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: tokens.spacing.lg }}>
        <h1 style={{ fontSize: tokens.typography.headings.h1.size, marginBottom: tokens.spacing.lg }}>Order History</h1>

        {orders.length === 0 ? (
          <p style={{ color: tokens.colors.text_secondary }}>You haven't placed any orders yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
            {orders.map(order => (
              <Card key={order.id}>
                <CardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: tokens.spacing.md }}>
                    <div>
                      <p style={{ fontWeight: 600, margin: 0 }}>Order #{order.id}</p>
                      <p style={{ color: tokens.colors.text_secondary, fontSize: 12, marginTop: tokens.spacing.xs }}>
                        Placed on {order.createdAt}
                      </p>
                    </div>
                    <Badge type="status" value={order.status} color={getStatusColor(order.status)} />
                  </div>
                  <div style={{ borderTop: `1px solid ${tokens.colors.border}`, paddingTop: tokens.spacing.md }}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.xs }}>
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: tokens.spacing.md, fontWeight: 600 }}>
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}