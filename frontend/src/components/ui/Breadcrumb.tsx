import React from 'react';
import { tokens } from '../../styles/tokens';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav style={{ marginBottom: tokens.spacing.md }}>
      <ol style={{ display: 'flex', gap: tokens.spacing.sm, listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
            {index > 0 && <span style={{ marginRight: tokens.spacing.sm, color: tokens.colors.text_secondary }}>/</span>}
            {index === items.length - 1 ? (
              <span style={{ color: tokens.colors.text_secondary }}>{item.label}</span>
            ) : (
              <a href={item.href} style={{ color: tokens.colors.primary, textDecoration: 'none' }}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};