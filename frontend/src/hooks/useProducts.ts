import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  categoryId: string;
  images: string[];
  rating: number;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts() {
  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: false,
    error: null,
  });

  const fetchProducts = useCallback(async (params?: { categoryId?: string; search?: string; page?: number; limit?: number }) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const queryParams = new URLSearchParams();
      if (params?.categoryId) queryParams.set('categoryId', params.categoryId);
      if (params?.search) queryParams.set('search', params.search);
      if (params?.page) queryParams.set('page', String(params.page));
      if (params?.limit) queryParams.set('limit', String(params.limit));

      const response = await fetch(`${API_URL}/api/products?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setState({ products: data.products || data, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  return {
    ...state,
    fetchProducts,
  };
}