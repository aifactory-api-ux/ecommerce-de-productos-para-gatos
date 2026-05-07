import React from 'react';
import { tokens } from '../../styles/tokens';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width = '100%', height = 20, count = 1 }) => {
  const style: React.CSSProperties = {
    width,
    height,
    backgroundColor: tokens.colors.border,
    borderRadius: tokens.radii.md,
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={style} />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
};