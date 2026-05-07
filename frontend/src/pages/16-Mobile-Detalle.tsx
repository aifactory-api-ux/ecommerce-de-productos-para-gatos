import React from 'react';
import { tokens } from '../styles/tokens';

export default function MobileDetallePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background, padding: tokens.spacing.sm }}>
      <header style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.md, borderRadius: tokens.radii.md, marginBottom: tokens.spacing.md }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: tokens.colors.primary }}>🐱 CatShop - Product Detail</div>
      </header>
      <p>Mobile product detail page</p>
    </div>
  );
}