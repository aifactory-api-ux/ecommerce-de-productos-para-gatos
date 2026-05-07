import React, { useEffect, useState } from 'react';
import { tokens } from '../styles/tokens';
import { Card, CardImage, CardContent, CardTitle, CardPrice } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/ui/SearchBar';
import { Pagination } from '../components/ui/Pagination';

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  images: string[];
  categoryId: string;
  rating: number;
}

interface Category {
  id: string;
  name: string;
}

export default function CatalogoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: '1', name: 'Premium Cat Food', price: 29.99, discount: 10, images: ['https://placekitten.com/400/400'], categoryId: '1', rating: 4.5 },
        { id: '2', name: 'Cozy Cat Bed', price: 49.99, discount: 0, images: ['https://placekitten.com/401/401'], categoryId: '2', rating: 4.8 },
        { id: '3', name: 'Cat Toy Set', price: 19.99, discount: 15, images: ['https://placekitten.com/402/402'], categoryId: '3', rating: 4.2 },
        { id: '4', name: 'Cat Tree Tower', price: 89.99, discount: 5, images: ['https://placekitten.com/403/403'], categoryId: '2', rating: 4.6 },
        { id: '5', name: 'Cat Litter', price: 24.99, discount: 0, images: ['https://placekitten.com/404/404'], categoryId: '1', rating: 4.0 },
        { id: '6', name: 'Cat Brush', price: 14.99, discount: 20, images: ['https://placekitten.com/405/405'], categoryId: '3', rating: 4.3 },
      ]);
      setCategories([
        { id: '1', name: 'Food' },
        { id: '2', name: 'Furniture' },
        { id: '3', name: 'Toys' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || p.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <h1 style={{ fontSize: tokens.typography.headings.h1.size, marginBottom: tokens.spacing.lg }}>Product Catalog</h1>

        <div style={{ display: 'flex', gap: tokens.spacing.lg, marginBottom: tokens.spacing.lg }}>
          <div style={{ flex: 1 }}>
            <SearchBar value={search} onChange={setSearch} onSearch={() => {}} placeholder="Search products..." />
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{ padding: tokens.spacing.sm, borderRadius: tokens.radii.md, border: `1px solid ${tokens.colors.border}` }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: tokens.spacing.lg }}>
              {filteredProducts.map(product => (
                <Card key={product.id}>
                  <CardImage src={product.images[0]} alt={product.name} />
                  <CardContent>
                    {product.discount > 0 && <Badge type="discount" value={`-${product.discount}%`} />}
                    <CardTitle style={{ marginTop: tokens.spacing.sm }}>{product.name}</CardTitle>
                    <p style={{ color: tokens.colors.text_secondary, fontSize: 12 }}>★ {product.rating}</p>
                    <CardPrice>${product.price.toFixed(2)}</CardPrice>
                    <Button variant="primary" size="md" style={{ width: '100%', marginTop: tokens.spacing.md }}>
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Pagination page={page} total={filteredProducts.length} limit={12} onPageChange={setPage} />
          </>
        )}
      </main>
    </div>
  );
}