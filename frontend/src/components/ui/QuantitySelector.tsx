import React from 'react';
import { tokens } from '../../styles/tokens';
import { Button } from './Button';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, min = 1, max = 99, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
      <Button
        variant="outline"
        size="sm"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        −
      </Button>
      <span style={{ minWidth: 40, textAlign: 'center', fontWeight: 600 }}>{value}</span>
      <Button
        variant="outline"
        size="sm"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        +
      </Button>
    </div>
  );
};