import React, { useState } from 'react';
import { tokens } from '../styles/tokens';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Premium Cat Food', price: 29.99, stock: 150, category: 'Food' },
    { id: '2', name: 'Cozy Cat Bed', price: 49.99, stock: 45, category: 'Furniture' },
    { id: '3', name: 'Cat Toy Set', price: 19.99, stock: 200, category: 'Toys' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, boxShadow: tokens.shadows.sm }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop Admin</div>
          <nav style={{ display: 'flex', gap: tokens.spacing.lg }}>
            <a href="/admin" style={{ color: tokens.colors.text_primary }}>Dashboard</a>
            <a href="/admin-productos" style={{ color: tokens.colors.primary, fontWeight: 600 }}>Products</a>
            <a href="/admin-pedidos" style={{ color: tokens.colors.text_primary }}>Orders</a>
            <a href="/admin-usuarios" style={{ color: tokens.colors.text_primary }}>Users</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: tokens.spacing.lg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.lg }}>
          <h1 style={{ fontSize: tokens.typography.headings.h1.size, margin: 0 }}>Products</h1>
          <Button variant="primary" onClick={() => setModalOpen(true)}>+ Add Product</Button>
        </div>

        <Card>
          <CardContent>
            <Table
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'category', label: 'Category' },
                { key: 'price', label: 'Price' },
                { key: 'stock', label: 'Stock' },
              ]}
              data={products}
              rowKey="id"
            />
          </CardContent>
        </Card>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add New Product">
          <div style={{ display: 'grid', gap: tokens.spacing.md }}>
            <Input type="text" value="" onChange={() => {}} label="Product Name" />
            <Input type="text" value="" onChange={() => {}} label="Category" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.md }}>
              <Input type="text" value="" onChange={() => {}} label="Price" />
              <Input type="text" value="" onChange={() => {}} label="Stock" />
            </div>
            <Button variant="primary" style={{ width: '100%' }}>Add Product</Button>
          </div>
        </Modal>
      </main>
    </div>
  );
}