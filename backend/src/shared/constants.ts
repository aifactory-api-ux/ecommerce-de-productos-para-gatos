export const ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const AUTH_TOKEN_EXPIRY = 3600;
export const REFRESH_TOKEN_EXPIRY = 86400 * 7;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

export const REDIS_KEYS = {
  CART_PREFIX: 'cart:',
  SESSION_PREFIX: 'session:',
} as const;