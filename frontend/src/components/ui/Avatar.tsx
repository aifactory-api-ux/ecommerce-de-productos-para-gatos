import React from 'react';
import { tokens } from '../../styles/tokens';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 40 }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
        borderRadius: tokens.radii.full,
        objectFit: 'cover',
        border: `2px solid ${tokens.colors.border}`,
      }}
    />
  );
};