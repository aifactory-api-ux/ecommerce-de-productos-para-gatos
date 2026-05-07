import React from 'react';
import { tokens } from '../../styles/tokens';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterItem {
  type: 'checkbox' | 'range' | 'radio';
  label: string;
  options?: FilterOption[];
  range?: { min: number; max: number };
}

interface FilterPanelProps {
  filters: FilterItem[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, values, onChange }) => {
  return (
    <div style={{ padding: tokens.spacing.md, backgroundColor: tokens.colors.surface, borderRadius: tokens.radii.md }}>
      {filters.map((filter, index) => (
        <div key={index} style={{ marginBottom: tokens.spacing.md }}>
          <label style={{ fontWeight: 600, marginBottom: tokens.spacing.sm, display: 'block' }}>
            {filter.label}
          </label>
          {filter.type === 'checkbox' && filter.options?.map(opt => (
            <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, marginBottom: tokens.spacing.xs }}>
              <input
                type="checkbox"
                checked={values[filter.label]?.includes(opt.value) || false}
                onChange={(e) => {
                  const current = values[filter.label] || [];
                  if (e.target.checked) {
                    onChange(filter.label, [...current, opt.value]);
                  } else {
                    onChange(filter.label, current.filter((v: string) => v !== opt.value));
                  }
                }}
              />
              {opt.label}
            </label>
          ))}
          {filter.type === 'radio' && filter.options?.map(opt => (
            <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, marginBottom: tokens.spacing.xs }}>
              <input
                type="radio"
                name={filter.label}
                checked={values[filter.label] === opt.value}
                onChange={() => onChange(filter.label, opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};