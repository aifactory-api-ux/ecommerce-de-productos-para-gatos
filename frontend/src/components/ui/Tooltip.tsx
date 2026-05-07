import React, { useState } from 'react';
import { tokens } from '../../styles/tokens';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
          backgroundColor: tokens.colors.text_primary,
          color: tokens.colors.text_on_primary,
          borderRadius: tokens.radii.sm,
          fontSize: 12,
          whiteSpace: 'nowrap',
          zIndex: 100,
          marginBottom: tokens.spacing.xs,
        }}>
          {content}
        </div>
      )}
    </div>
  );
};