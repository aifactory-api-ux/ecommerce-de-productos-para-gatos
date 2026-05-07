import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from '../../src/components/ui/Button';

describe('Button Component', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDefined();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading text when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('renders different variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost'] as const;
    variants.forEach(variant => {
      const { container } = render(<Button variant={variant}>Button</Button>);
      expect(container.querySelector('button')).toBeDefined();
    });
  });

  it('renders different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { container } = render(<Button size={size}>Button</Button>);
      expect(container.querySelector('button')).toBeDefined();
    });
  });
});