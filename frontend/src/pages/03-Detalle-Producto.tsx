import React, { useEffect, useState } from 'react';
import { tokens } from '../styles/tokens';
import { ImageGallery } from '../components/ui/ImageGallery';
import { RatingStars } from '../components/ui/RatingStars';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  images: string[];
  rating: number;
  categoryId: string;
}

interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function DetalleProductoPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProduct({
        id: '1',
        name: 'Premium Cat Food',
        description: 'Nutritious and delicious cat food made with real chicken. Your cat will love it!',
        price: 29.99,
        discount: 10,
        stock: 25,
        images: [
          'https://placekitten.com/400/400',
          'https://placekitten.com/401/401',
          'https://placekitten.com/402/402',
        ],
        rating: 4.5,
        categoryId: '1',
      });
      setReviews([
        { id: '1', userId: 'user1', rating: 5, comment: 'My cat loves this food!', createdAt: '2024-01-15' },
        { id: '2', userId: 'user2', rating: 4, comment: 'Great quality for the price.', createdAt: '2024-01-10' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading || !product) {
    return <div style={{ padding: tokens.spacing.lg }}>Loading...</div>;
  }

  const finalPrice = product.price * (1 - product.discount / 100);

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
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Catalog', href: '/catalogo' }, { label: product.name, href: `/producto/${product.id}` }]} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.xl }}>
          <ImageGallery images={product.images} />

          <div>
            <div style={{ marginBottom: tokens.spacing.md }}>
              {product.discount > 0 && <Badge type="discount" value={`-${product.discount}%`} />}
              {product.stock < 10 && <Badge type="stock" value="Low Stock" />}
            </div>

            <h1 style={{ fontSize: tokens.typography.headings.h1.size, fontWeight: tokens.typography.headings.h1.weight, marginBottom: tokens.spacing.md }}>
              {product.name}
            </h1>

            <div style={{ marginBottom: tokens.spacing.md }}>
              <RatingStars value={product.rating} readOnly />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md, marginBottom: tokens.spacing.lg }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: tokens.colors.primary }}>
                ${finalPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span style={{ fontSize: 20, textDecoration: 'line-through', color: tokens.colors.text_secondary }}>
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ color: tokens.colors.text_secondary, lineHeight: 1.6, marginBottom: tokens.spacing.lg }}>
              {product.description}
            </p>

            <div style={{ marginBottom: tokens.spacing.lg }}>
              <label style={{ display: 'block', marginBottom: tokens.spacing.sm, fontWeight: 500 }}>Quantity</label>
              <QuantitySelector value={quantity} min={1} max={product.stock} onChange={setQuantity} />
            </div>

            <div style={{ display: 'flex', gap: tokens.spacing.md }}>
              <Button variant="primary" size="lg" onClick={() => alert('Added to cart!')}>
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <section style={{ marginTop: tokens.spacing.xxl }}>
          <h2 style={{ fontSize: tokens.typography.headings.h2.size, marginBottom: tokens.spacing.lg }}>Customer Reviews</h2>
          {reviews.map(review => (
            <div key={review.id} style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.md, borderRadius: tokens.radii.md, marginBottom: tokens.spacing.md }}>
              <RatingStars value={review.rating} readOnly />
              <p style={{ marginTop: tokens.spacing.sm }}>{review.comment}</p>
              <span style={{ fontSize: 12, color: tokens.colors.text_secondary }}>{review.createdAt}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}