import React from 'react';
import { tokens } from '../../styles/tokens';

interface FormGroupProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormGroup: React.FC<FormGroupProps> = ({ label, error, children }) => {
  return (
    <div style={{ marginBottom: tokens.spacing.md }}>
      <label style={{
        display: 'block',
        marginBottom: tokens.spacing.xs,
        fontWeight: 500,
        color: tokens.colors.text_primary,
      }}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{ color: tokens.colors.error, fontSize: 12, marginTop: tokens.spacing.xs, display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
};