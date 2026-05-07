const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: RequestMethod;
  body?: unknown;
  headers?: Record<string, string>;
  authenticated?: boolean;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, authenticated = false } = options;

  const authHeaders: Record<string, string> = {};
  if (authenticated) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        authHeaders['Authorization'] = `Bearer ${token}`;
      }
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: { authenticated?: boolean }) =>
    request<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, body: unknown, options?: { authenticated?: boolean }) =>
    request<T>(endpoint, { method: 'POST', body, ...options }),

  put: <T>(endpoint: string, body: unknown, options?: { authenticated?: boolean }) =>
    request<T>(endpoint, { method: 'PUT', body, ...options }),

  delete: <T>(endpoint: string, options?: { authenticated?: boolean }) =>
    request<T>(endpoint, { method: 'DELETE', ...options }),
};

export default api;
