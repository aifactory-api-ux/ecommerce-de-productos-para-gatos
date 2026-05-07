import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from '../../src/hooks/useAuth';

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('useAuth Hook', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    localStorage.clear();
  });

  it('should initialize with loading state', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: '1', email: 'test@test.com', name: 'Test', role: 'customer' }),
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(true);
  });

  it('should login successfully', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        accessToken: 'token',
        user: { id: '1', email: 'test@test.com', name: 'Test', role: 'customer' },
      }),
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@test.com', 'password123');
    });

    expect(result.current.error).toBeNull();
  });

  it('should handle login failure', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('wrong@test.com', 'wrongpass');
    });

    expect(result.current.error).toBe('Login failed');
  });

  it('should logout', async () => {
    localStorage.setItem('accessToken', 'test-token');

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('should register successfully', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: '1', email: 'test@test.com', name: 'Test', role: 'customer' }),
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.register('test@test.com', 'password123', 'Test User');
    });

    expect(result.current.error).toBeNull();
  });
});