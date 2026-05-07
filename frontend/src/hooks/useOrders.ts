import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export function useOrders() {
  const [state, setState] = useState<OrdersState>({
    orders: [],
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

  const fetchOrders = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const orders = await response.json();
      setState({ orders, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  const createOrder = useCallback(async (addressId: string, couponCode?: string, paymentMethodId?: string): Promise<Order> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ addressId, couponCode, paymentMethodId }),
      });
      if (!response.ok) throw new Error('Failed to create order');
      const order = await response.json();
      setState(prev => ({ orders: [...prev.orders, order], loading: false, error: null }));
      return order;
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
      throw error;
    }
  }, []);

  return {
    ...state,
    fetchOrders,
    createOrder,
  };
}