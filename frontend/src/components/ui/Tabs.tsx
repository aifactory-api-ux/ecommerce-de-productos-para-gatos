import React, { useState } from 'react';
import { tokens } from '../../styles/tokens';

interface Tab {
  label: string;
  key: string;
}

interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onTabChange: (key: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeKey, onTabChange }) => {
  return (
    <div style={{ borderBottom: `1px solid ${tokens.colors.border}` }}>
      <div style={{ display: 'flex', gap: tokens.spacing.lg }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            style={{
              padding: `${tokens.spacing.md} 0`,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: tokens.typography.body.regular.size,
              fontWeight: activeKey === tab.key ? 600 : 400,
              color: activeKey === tab.key ? tokens.colors.primary : tokens.colors.text_secondary,
              borderBottom: activeKey === tab.key ? `2px solid ${tokens.colors.primary}` : '2px solid transparent',
              marginBottom: -1,
              transition: tokens.motion,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};