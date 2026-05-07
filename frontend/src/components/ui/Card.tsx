import React from 'react';
import { tokens } from '../../styles/tokens';

interface CardProps {
  variant?: 'product' | 'category' | 'order';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ variant = 'product', children, className, style }) => {
  const baseStyles: React.CSSProperties = {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radii.lg,
    boxShadow: tokens.shadows.sm,
    overflow: 'hidden',
    transition: tokens.motion,
    ...style,
  };

  return (
    <div className={className} style={baseStyles}>
      {children}
    </div>
  );
};

export const CardImage: React.FC<{ src: string; alt: string; style?: React.CSSProperties }> = ({ src, alt, style }) => (
  <img
    src={src}
    alt={alt}
    style={{
      width: '100%',
      height: 200,
      objectFit: 'cover',
      ...style,
    }}
  />
);

export const CardContent: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ padding: tokens.spacing.md, ...style }}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <h3 style={{ margin: 0, fontSize: tokens.typography.headings.h3.size, fontWeight: tokens.typography.headings.h3.weight, color: tokens.colors.text_primary, ...style }}>
    {children}
  </h3>
);

export const CardPrice: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span style={{ fontSize: tokens.typography.headings.h4.size, fontWeight: 600, color: tokens.colors.primary, ...style }}>
    {children}
  </span>
);