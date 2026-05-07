import React, { useEffect, useState } from 'react';
import { tokens } from '../styles/tokens';
import { Card, CardImage, CardContent, CardTitle, CardPrice } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  images: string[];
}

export default function MobileHomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: '1', name: 'Cat Food', price: 29.99, discount: 10, images: ['https://placekitten.com/400/400'] },
        { id: '2', name: 'Cat Bed', price: 49.99, discount: 0, images: ['https://placekitten.com/401/401'] },
        { id: '3', name: 'Cat Toys', price: 19.99, discount: 15, images: ['https://placekitten.com/402/402'] },
        { id: '4', name: 'Cat Tree', price: 89.99, discount: 5, images: ['https://placekitten.com/403/403'] },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background, padding: tokens.spacing.sm }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.md, borderRadius: tokens.radii.md, marginBottom: tokens.spacing.md }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop</div>
          <div style={{ display: 'flex', gap: tokens.spacing.md }}>
            <a href="/mobile-carrito" style={{ color: tokens.colors.text_primary }}>🛒</a>
          </div>
        </div>
      </header>

      <section style={{ marginBottom: tokens.spacing.lg }}>
        <h1 style={{ fontSize: tokens.typography.headings.h2.size }}>Welcome!</h1>
        <p style={{ color: tokens.colors.text_secondary }}>Find the best for your cat</p>
      </section>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.sm }}>
          {[1, 2, 3, 4].map(i => <SkeletonLoader key={i} height={200} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.sm }}>
          {products.map(product => (
            <Card key={product.id} style={{ padding: 0 }}>
              <CardImage src={product.images[0]} alt={product.name} style={{ height: 120 }} />
              <CardContent style={{ padding: tokens.spacing.sm }}>
                {product.discount > 0 && <Badge type="discount" value={`-${product.discount}%`} />}
                <CardTitle style={{ fontSize: 14 }}>{product.name}</CardTitle>
                <CardPrice>${product.price.toFixed(2)}</CardPrice>
                <Button variant="primary" size="sm" style={{ width: '100%', marginTop: tokens.spacing.xs }}>Add</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}