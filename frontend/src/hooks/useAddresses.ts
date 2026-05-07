import { useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface Address {
  id: string;
  userId: string;
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface AddressesState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

export function useAddresses() {
  const [state, setState] = useState<AddressesState>({
    addresses: [],
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

  const fetchAddresses = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/addresses`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch addresses');
      const addresses = await response.json();
      setState({ addresses, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  const addAddress = useCallback(async (address: Omit<Address, 'id'>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/addresses`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(address),
      });
      if (!response.ok) throw new Error('Failed to add address');
      const newAddress = await response.json();
      setState(prev => ({ addresses: [...prev.addresses, newAddress], loading: false, error: null }));
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  const updateAddress = useCallback(async (id: string, address: Partial<Address>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/addresses/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(address),
      });
      if (!response.ok) throw new Error('Failed to update address');
      const updated = await response.json();
      setState(prev => ({
        addresses: prev.addresses.map(a => a.id === id ? updated : a),
        loading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  const deleteAddress = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(`${API_URL}/api/addresses/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to delete address');
      setState(prev => ({
        addresses: prev.addresses.filter(a => a.id !== id),
        loading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: (error as Error).message }));
    }
  }, []);

  return {
    ...state,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
  };
}