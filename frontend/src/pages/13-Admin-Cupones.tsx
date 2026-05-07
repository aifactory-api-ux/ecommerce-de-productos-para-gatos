import React, { useState } from 'react';
import { tokens } from '../styles/tokens';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export default function AdminCuponesPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: '1', code: 'WELCOME10', discount: 10, validFrom: '2024-01-01', validTo: '2024-12-31', usageLimit: 100, usedCount: 45, active: true },
    { id: '2', code: 'SUMMER20', discount: 20, validFrom: '2024-06-01', validTo: '2024-08-31', usageLimit: 50, usedCount: 30, active: true },
    { id: '3', code: 'BLACKFRI', discount: 30, validFrom: '2024-11-01', validTo: '2024-11-30', usageLimit: 200, usedCount: 0, active: false },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, boxShadow: tokens.shadows.sm }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop Admin</div>
          <nav style={{ display: 'flex', gap: tokens.spacing.lg }}>
            <a href="/admin" style={{ color: tokens.colors.text_primary }}>Dashboard</a>
            <a href="/admin-productos" style={{ color: tokens.colors.text_primary }}>Products</a>
            <a href="/admin-pedidos" style={{ color: tokens.colors.text_primary }}>Orders</a>
            <a href="/admin-usuarios" style={{ color: tokens.colors.text_primary }}>Users</a>
            <a href="/admin-cupones" style={{ color: tokens.colors.primary, fontWeight: 600 }}>Coupons</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: tokens.spacing.lg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.lg }}>
          <h1 style={{ fontSize: tokens.typography.headings.h1.size, margin: 0 }}>Coupons</h1>
          <Button variant="primary" onClick={() => setModalOpen(true)}>+ Add Coupon</Button>
        </div>

        <Card>
          <CardContent>
            <Table
              columns={[
                { key: 'code', label: 'Code' },
                { key: 'discount', label: 'Discount %' },
                { key: 'validFrom', label: 'Valid From' },
                { key: 'validTo', label: 'Valid To' },
                { key: 'usage', label: 'Usage' },
                { key: 'active', label: 'Status' },
              ]}
              data={coupons.map(c => ({
                ...c,
                discount: `${c.discount}%`,
                usage: `${c.usedCount}/${c.usageLimit}`,
                active: <Badge type="status" value={c.active ? 'Active' : 'Inactive'} color={c.active ? tokens.colors.success : tokens.colors.text_secondary} />,
              }))}
              rowKey="id"
            />
          </CardContent>
        </Card>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add New Coupon">
          <div style={{ display: 'grid', gap: tokens.spacing.md }}>
            <Input type="text" value="" onChange={() => {}} label="Coupon Code" />
            <Input type="text" value="" onChange={() => {}} label="Discount %" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.md }}>
              <Input type="text" value="" onChange={() => {}} label="Valid From" />
              <Input type="text" value="" onChange={() => {}} label="Valid To" />
            </div>
            <Input type="text" value="" onChange={() => {}} label="Usage Limit" />
            <Button variant="primary" style={{ width: '100%' }}>Add Coupon</Button>
          </div>
        </Modal>
      </main>
    </div>
  );
}