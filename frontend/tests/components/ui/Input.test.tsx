import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { Input } from '../../src/components/ui/Input';

describe('Input Component', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders text input correctly', () => {
    render(
      <Input
        type="text"
        value=""
        onChange={mockOnChange}
        placeholder="Enter text"
      />
    );
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.type).toBe('text');
  });

  it('renders with label', () => {
    render(
      <Input
        type="text"
        value=""
        onChange={mockOnChange}
        label="Username"
      />
    );
    expect(screen.getByText('Username')).toBeDefined();
  });

  it('calls onChange when value changes', () => {
    render(
      <Input
        type="text"
        value=""
        onChange={mockOnChange}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('renders password input', () => {
    render(
      <Input
        type="password"
        value=""
        onChange={mockOnChange}
      />
    );
    const input = screen.getByLabelText('') as HTMLInputElement;
    expect(input.type).toBe('password');
  });

  it('renders email input', () => {
    render(
      <Input
        type="email"
        value=""
        onChange={mockOnChange}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('shows error message', () => {
    render(
      <Input
        type="text"
        value=""
        onChange={mockOnChange}
        error="This field is required"
      />
    );
    expect(screen.getByText('This field is required')).toBeDefined();
  });

  it('shows required indicator', () => {
    render(
      <Input
        type="text"
        value=""
        onChange={mockOnChange}
        label="Name"
        required
      />
    );
    expect(screen.getByText('Name *')).toBeDefined();
  });
});