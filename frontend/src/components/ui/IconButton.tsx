import React from 'react';
import { tokens } from '../../styles/tokens';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, ariaLabel, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: tokens.radii.md,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: tokens.motion,
      }}
    >
      {icon}
    </button>
  );
};