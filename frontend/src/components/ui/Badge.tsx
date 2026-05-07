import React from 'react';
import { tokens } from '../../styles/tokens';

interface BadgeProps {
  type: 'status' | 'discount' | 'stock';
  value: string | number;
  color?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, value, color }) => {
  const getBgColor = () => {
    if (color) return color;
    switch (type) {
      case 'status':
        return tokens.colors.secondary;
      case 'discount':
        return tokens.colors.error;
      case 'stock':
        return tokens.colors.success;
      default:
        return tokens.colors.primary;
    }
  };

  const styles: React.CSSProperties = {
    display: 'inline-block',
    padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    borderRadius: tokens.radii.full,
    backgroundColor: getBgColor(),
    color: tokens.colors.text_on_primary,
    fontSize: 12,
    fontWeight: 600,
  };

  return <span style={styles}>{value}</span>;
};