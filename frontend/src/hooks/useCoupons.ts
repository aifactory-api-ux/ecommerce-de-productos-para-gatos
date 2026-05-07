import { useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

interface CouponsState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}

export function useCoupons() {
  const [state, setState] = useState<CouponsState>({
    coupons: [],
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

  const fetchCoupons = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/coupons`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch coupons');
      const coupons = await response.json();
      setState({ coupons, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  const createCoupon = useCallback(async (coupon: Omit<Coupon, 'id' | 'usedCount'>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/coupons`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(coupon),
      });
      if (!response.ok) throw new Error('Failed to create coupon');
      const newCoupon = await response.json();
      setState(prev => ({ coupons: [...prev.coupons, newCoupon], loading: false, error: null }));
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  return {
    ...state,
    fetchCoupons,
    createCoupon,
  };
}