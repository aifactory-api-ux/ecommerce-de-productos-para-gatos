import React from 'react';
import { tokens } from '../../styles/tokens';

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  rowKey: string;
}

export const Table: React.FC<TableProps> = ({ columns, data, rowKey }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: tokens.typography.body.regular.size }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${tokens.colors.border}` }}>
          {columns.map(col => (
            <th key={col.key} style={{ padding: tokens.spacing.md, textAlign: 'left', fontWeight: 600 }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item[rowKey]} style={{ borderBottom: `1px solid ${tokens.colors.border}` }}>
            {columns.map(col => (
              <td key={col.key} style={{ padding: tokens.spacing.md }}>
                {item[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};