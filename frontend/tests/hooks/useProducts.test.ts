import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProducts } from '../../src/hooks/useProducts';

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('useProducts Hook', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch products successfully', async () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 100, stock: 10 },
      { id: '2', name: 'Product 2', price: 200, stock: 20 },
    ];

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ products: mockProducts }),
    });

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await result.current.fetchProducts();
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await result.current.fetchProducts();
    });

    expect(result.current.error).toBe('Failed to fetch products');
    expect(result.current.loading).toBe(false);
  });

  it('should pass query parameters', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ products: [] }),
    });

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await result.current.fetchProducts({ categoryId: 'cat-1', search: 'test', page: 1, limit: 10 });
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('categoryId=cat-1'),
      expect.any(Object)
    );
  });
});