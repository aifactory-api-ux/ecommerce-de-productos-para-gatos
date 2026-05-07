import { useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  updatedAt: string;
}

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

export function useCart() {
  const [state, setState] = useState<CartState>({
    cart: null,
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

  const addToCart = useCallback(async (productId: string, quantity: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/cart/add`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      const cart = await response.json();
      setState({ cart, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/cart/remove`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) throw new Error('Failed to remove from cart');
      const cart = await response.json();
      setState({ cart, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  const clearCart = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/cart/clear`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      const cart = await response.json();
      setState({ cart, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    await removeFromCart(productId);
    await addToCart(productId, quantity);
  }, [addToCart, removeFromCart]);

  return {
    ...state,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  };
}