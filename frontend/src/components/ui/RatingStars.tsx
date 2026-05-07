import React from 'react';
import { tokens } from '../../styles/tokens';

interface RatingStarsProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ value, max = 5, onChange, readOnly = false }) => {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    stars.push(
      <span
        key={i}
        onClick={() => !readOnly && onChange?.(i)}
        style={{
          cursor: readOnly ? 'default' : 'pointer',
          color: i <= value ? tokens.colors.accent : tokens.colors.border,
          fontSize: 20,
          transition: tokens.motion,
        }}
      >
        ★
      </span>
    );
  }

  return <div style={{ display: 'flex', gap: 2 }}>{stars}</div>;
};