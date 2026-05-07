import React from 'react';
import { tokens } from '../../styles/tokens';
import { Input } from './Input';
import { Button } from './Button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, placeholder = 'Search...' }) => {
  return (
    <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
      <div style={{ flex: 1 }}>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      <Button onClick={onSearch}>Search</Button>
    </div>
  );
};