import React, { useState } from 'react';
import { tokens } from '../styles/tokens';
import { Button } from '../components/ui/Button';
import { QuantitySelector } from '../components/ui/QuantitySelector';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function MobileCarritoPage() {
  const [items, setItems] = useState<CartItem[]>([
    { id: '1', name: 'Premium Cat Food', price: 29.99, quantity: 1 },
    { id: '2', name: 'Cozy Cat Bed', price: 49.99, quantity: 2 },
  ]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background, padding: tokens.spacing.sm }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.md, borderRadius: tokens.radii.md, marginBottom: tokens.spacing.md }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.primary }}>🛒 Cart</div>
      </header>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.md, borderRadius: tokens.radii.md, marginBottom: tokens.spacing.sm, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 500, margin: 0 }}>{item.name}</p>
                <p style={{ color: tokens.colors.primary }}>${item.price.toFixed(2)}</p>
              </div>
              <QuantitySelector value={item.quantity} onChange={() => {}} />
            </div>
          ))}
          <div style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.md, borderRadius: tokens.radii.md, marginTop: tokens.spacing.lg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18 }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button variant="primary" size="lg" style={{ width: '100%', marginTop: tokens.spacing.md }}>Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
}