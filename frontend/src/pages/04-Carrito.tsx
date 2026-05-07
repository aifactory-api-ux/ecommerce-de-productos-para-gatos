import React, { useState } from 'react';
import { tokens } from '../styles/tokens';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { QuantitySelector } from '../components/ui/QuantitySelector';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CarritoPage() {
  const [items, setItems] = useState<CartItem[]>([
    { id: '1', productId: '1', name: 'Premium Cat Food', price: 29.99, quantity: 2, image: 'https://placekitten.com/400/400' },
    { id: '2', productId: '2', name: 'Cozy Cat Bed', price: 49.99, quantity: 1, image: 'https://placekitten.com/401/401' },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

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
        <h1 style={{ fontSize: tokens.typography.headings.h1.size, marginBottom: tokens.spacing.lg }}>Shopping Cart</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: tokens.spacing.xl }}>
          <div>
            {items.length === 0 ? (
              <p style={{ color: tokens.colors.text_secondary }}>Your cart is empty.</p>
            ) : (
              items.map(item => (
                <Card key={item.id} style={{ marginBottom: tokens.spacing.md }}>
                  <CardContent style={{ display: 'flex', gap: tokens.spacing.md }}>
                    <img src={item.image} alt={item.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: tokens.radii.md }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, marginBottom: tokens.spacing.xs }}>{item.name}</h3>
                      <p style={{ color: tokens.colors.primary, fontWeight: 600 }}>${item.price.toFixed(2)}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md, marginTop: tokens.spacing.sm }}>
                        <QuantitySelector value={item.quantity} onChange={(q) => updateQuantity(item.id, q)} />
                        <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
                      </div>
                    </div>
                    <div style={{ fontWeight: 600 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div>
            <Card>
              <CardContent>
                <h3 style={{ marginTop: 0 }}>Order Summary</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <hr style={{ border: 'none', borderTop: `1px solid ${tokens.colors.border}`, margin: `${tokens.spacing.md} 0` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18 }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button variant="primary" size="lg" style={{ width: '100%', marginTop: tokens.spacing.lg }} onClick={() => window.location.href = '/checkout'}>
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}