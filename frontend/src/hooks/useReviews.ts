import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

export function useReviews(productId: string) {
  const [state, setState] = useState<ReviewsState>({
    reviews: [],
    loading: false,
    error: null,
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchReviews = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/products/${productId}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const reviews = await response.json();
      setState({ reviews, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, [productId]);

  const addReview = useCallback(async (rating: number, comment: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ rating, comment }),
      });
      if (!response.ok) throw new Error('Failed to add review');
      const newReview = await response.json();
      setState(prev => ({ reviews: [...prev.reviews, newReview], loading: false, error: null }));
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, [productId]);

  return {
    ...state,
    fetchReviews,
    addReview,
  };
}