import React from 'react';
import { tokens } from '../../styles/tokens';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  style,
}) => {
  const baseStyles: React.CSSProperties = {
    fontFamily: tokens.typography.font_family,
    fontSize: tokens.typography.button.size,
    fontWeight: tokens.typography.button.weight,
    letterSpacing: tokens.typography.button.letter_spacing,
    borderRadius: tokens.radii.md,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: tokens.motion,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.sm,
    border: 'none',
    outline: 'none',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`, fontSize: 12 },
    md: { padding: `${tokens.spacing.sm} ${tokens.spacing.md}`, fontSize: 14 },
    lg: { padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, fontSize: 16 },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: tokens.colors.primary,
      color: tokens.colors.text_on_primary,
    },
    secondary: {
      backgroundColor: tokens.colors.secondary,
      color: tokens.colors.text_on_primary,
    },
    outline: {
      backgroundColor: 'transparent',
      color: tokens.colors.primary,
      border: `2px solid ${tokens.colors.primary}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: tokens.colors.text_primary,
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...baseStyles, ...sizeStyles[size], ...variantStyles[variant], ...style }}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};