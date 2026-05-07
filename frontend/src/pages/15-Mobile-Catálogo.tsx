import React from 'react';
import { tokens } from '../styles/tokens';

export default function MobileCatalogoPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background, padding: tokens.spacing.sm }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.md, borderRadius: tokens.radii.md, marginBottom: tokens.spacing.md }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop - Catalog</div>
      </header>
      <p>Mobile catalog page</p>
    </div>
  );
}