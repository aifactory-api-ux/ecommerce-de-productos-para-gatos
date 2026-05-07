import React from 'react';
import { tokens } from '../../styles/tokens';

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 40 }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      fontSize: size * 0.6,
      fontWeight: 700,
      color: tokens.colors.primary,
    }}>
      <span style={{ fontSize: size }}>🐱</span>
      <span>CatShop</span>
    </div>
  );
};