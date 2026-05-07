import React, { useState } from 'react';
import { tokens } from '../../styles/tokens';

interface ImageGalleryProps {
  images: string[];
  activeIndex?: number;
  onChange?: (index: number) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, activeIndex = 0, onChange }) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  const handleChange = (index: number) => {
    setCurrentIndex(index);
    onChange?.(index);
  };

  if (images.length === 0) return null;

  return (
    <div>
      <div style={{ borderRadius: tokens.radii.lg, overflow: 'hidden', marginBottom: tokens.spacing.sm }}>
        <img
          src={images[currentIndex]}
          alt="Product"
          style={{ width: '100%', height: 400, objectFit: 'cover' }}
        />
      </div>
      <div style={{ display: 'flex', gap: tokens.spacing.sm, overflowX: 'auto' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleChange(index)}
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              borderRadius: tokens.radii.md,
              cursor: 'pointer',
              border: index === currentIndex ? `2px solid ${tokens.colors.primary}` : `2px solid ${tokens.colors.border}`,
              opacity: index === currentIndex ? 1 : 0.7,
              transition: tokens.motion,
            }}
          />
        ))}
      </div>
    </div>
  );
};