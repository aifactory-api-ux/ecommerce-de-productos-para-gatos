import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function useCategories() {
  const [state, setState] = useState<CategoriesState>({
    categories: [],
    loading: false,
    error: null,
  });

  const fetchCategories = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const categories = await response.json();
      setState({ categories, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  return {
    ...state,
    fetchCategories,
  };
}