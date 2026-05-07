import React, { useEffect } from 'react';
import { tokens } from '../../styles/tokens';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: tokens.colors.success,
    error: tokens.colors.error,
    info: tokens.colors.secondary,
  }[type];

  const styles: React.CSSProperties = {
    position: 'fixed',
    bottom: tokens.spacing.lg,
    right: tokens.spacing.lg,
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    backgroundColor: bgColor,
    color: tokens.colors.text_on_primary,
    borderRadius: tokens.radii.md,
    boxShadow: tokens.shadows.md,
    zIndex: 1100,
    animation: 'slideIn 0.3s ease',
  };

  return (
    <div style={styles}>
      {message}
    </div>
  );
};