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
  rating: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: '1', name: 'Premium Cat Food', price: 29.99, discount: 10, images: ['https://placekitten.com/400/400'], rating: 4.5 },
        { id: '2', name: 'Cozy Cat Bed', price: 49.99, discount: 0, images: ['https://placekitten.com/401/401'], rating: 4.8 },
        { id: '3', name: 'Cat Toy Set', price: 19.99, discount: 15, images: ['https://placekitten.com/402/402'], rating: 4.2 },
        { id: '4', name: 'Cat Tree Tower', price: 89.99, discount: 5, images: ['https://placekitten.com/403/403'], rating: 4.6 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, boxShadow: tokens.shadows.sm }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop</div>
          <nav style={{ display: 'flex', gap: tokens.spacing.lg }}>
            <a href="/" style={{ color: tokens.colors.text_primary, textDecoration: 'none' }}>Home</a>
            <a href="/catalogo" style={{ color: tokens.colors.text_primary, textDecoration: 'none' }}>Catalog</a>
            <a href="/carrito" style={{ color: tokens.colors.text_primary, textDecoration: 'none' }}>Cart</a>
            <a href="/perfil" style={{ color: tokens.colors.text_primary, textDecoration: 'none' }}>Profile</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: tokens.spacing.lg }}>
        <section style={{ marginBottom: tokens.spacing.xxl }}>
          <h1 style={{ fontSize: tokens.typography.headings.h1.size, fontWeight: tokens.typography.headings.h1.weight, color: tokens.colors.text_primary, marginBottom: tokens.spacing.md }}>
            Welcome to CatShop
          </h1>
          <p style={{ fontSize: tokens.typography.body.large.size, color: tokens.colors.text_secondary }}>
            Find the best products for your feline friends
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: tokens.typography.headings.h2.size, marginBottom: tokens.spacing.lg }}>Featured Products</h2>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: tokens.spacing.lg }}>
              {[1, 2, 3, 4].map(i => <SkeletonLoader key={i} height={300} />)}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: tokens.spacing.lg }}>
              {products.map(product => (
                <Card key={product.id}>
                  <CardImage src={product.images[0]} alt={product.name} />
                  <CardContent>
                    <div style={{ marginBottom: tokens.spacing.sm }}>
                      {product.discount > 0 && (
                        <Badge type="discount" value={`-${product.discount}%`} />
                      )}
                    </div>
                    <CardTitle>{product.name}</CardTitle>
                    <p style={{ color: tokens.colors.text_secondary, fontSize: 12, margin: `${tokens.spacing.xs} 0` }}>
                      ★ {product.rating}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm', marginTop: tokens.spacing.sm }}>
                      <CardPrice>${product.price.toFixed(2)}</CardPrice>
                      {product.discount > 0 && (
                        <span style={{ textDecoration: 'line-through', color: tokens.colors.text_secondary, fontSize: 12 }}>
                          ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button variant="primary" size="md" style={{ width: '100%', marginTop: tokens.spacing.md }}>
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}