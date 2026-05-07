import React, { useState } from 'react';
import { tokens } from '../../styles/tokens';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ border: `1px solid ${tokens.colors.border}`, borderRadius: tokens.radii.md }}>
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            style={{
              width: '100%',
              padding: tokens.spacing.md,
              backgroundColor: openIndex === index ? tokens.colors.background : tokens.colors.surface,
              border: 'none',
              borderBottom: index < items.length - 1 ? `1px solid ${tokens.colors.border}` : 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'left',
              fontWeight: 500,
            }}
          >
            {item.title}
            <span>{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div style={{ padding: tokens.spacing.md, backgroundColor: tokens.colors.surface }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};