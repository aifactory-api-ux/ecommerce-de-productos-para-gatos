import React from 'react';
import { tokens } from '../../styles/tokens';

interface InputProps {
  type: 'text' | 'email' | 'password' | 'search' | 'textarea' | 'select';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  error,
  options,
  disabled = false,
  required = false,
}) => {
  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: tokens.spacing.sm,
    fontSize: tokens.typography.body.regular.size,
    fontFamily: tokens.typography.font_family,
    border: `1px solid ${error ? tokens.colors.error : tokens.colors.border}`,
    borderRadius: tokens.radii.md,
    backgroundColor: disabled ? tokens.colors.disabled : tokens.colors.surface,
    color: tokens.colors.text_primary,
    outline: 'none',
    transition: tokens.motion,
  };

  const labelStyles: React.CSSProperties = {
    display: 'block',
    marginBottom: tokens.spacing.xs,
    fontSize: tokens.typography.body.regular.size,
    fontWeight: 500,
    color: tokens.colors.text_primary,
  };

  if (type === 'textarea') {
    return (
      <div>
        {label && <label style={labelStyles}>{label}{required && ' *'}</label>}
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          style={{ ...inputStyles, minHeight: 100, resize: 'vertical' }}
        />
        {error && <span style={{ color: tokens.colors.error, fontSize: 12 }}>{error}</span>}
      </div>
    );
  }

  if (type === 'select' && options) {
    return (
      <div>
        {label && <label style={labelStyles}>{label}{required && ' *'}</label>}
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          style={inputStyles}
        >
          <option value="">{placeholder || 'Select...'}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <span style={{ color: tokens.colors.error, fontSize: 12 }}>{error}</span>}
      </div>
    );
  }

  return (
    <div>
      {label && <label style={labelStyles}>{label}{required && ' *'}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={inputStyles}
      />
      {error && <span style={{ color: tokens.colors.error, fontSize: 12 }}>{error}</span>}
    </div>
  );
};