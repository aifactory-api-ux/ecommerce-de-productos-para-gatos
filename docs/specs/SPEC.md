# SPEC.md

## 1. TECHNOLOGY STACK

- **Backend**
  - Node.js v20.x
  - NestJS v10.x
  - TypeScript v5.x
  - PostgreSQL v15.x
  - Redis v7.x
  - Stripe API (latest stable)
  - SendGrid API (latest stable)
- **Frontend**
  - React v18.x
  - Next.js v14.x
  - TypeScript v5.x
- **Infrastructure**
  - Docker v24.x
  - docker-compose v2.x
  - Kubernetes v1.29.x

---

## 2. DATA CONTRACTS

### TypeScript Interfaces (frontend & backend DTOs)

```typescript
// User
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  avatarUrl: string | null;
  role: 'customer' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// Product
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  categoryId: string;
  images: string[];
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// Category
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

// CartItem
export interface CartItem {
  productId: string;
  quantity: number;
}

// Cart
export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  updatedAt: string;
}

// Order
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress: Address;
  paymentIntentId: string;
}

// OrderItem
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Address
export interface Address {
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

// Coupon
export interface Coupon {
  id: string;
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

// Review
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// AuthToken
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

---

## 3. API ENDPOINTS

### Auth Service

- **POST /api/auth/register**
  - Request: `{ email: string; password: string; name: string; }`
  - Response: `User`

- **POST /api/auth/login**
  - Request: `{ email: string; password: string; }`
  - Response: `AuthToken`

- **POST /api/auth/refresh**
  - Request: `{ refreshToken: string; }`
  - Response: `AuthToken`

- **GET /api/auth/me**
  - Auth: Bearer
  - Response: `User`

### Product Service

- **GET /api/products**
  - Query: `?categoryId?:string&search?:string&page?:number&limit?:number`
  - Response: `{ products: Product[]; total: number; page: number; limit: number; }`

- **GET /api/products/:id**
  - Response: `Product`

- **POST /api/products** (admin)
  - Body: `Product` (without id, createdAt, updatedAt)
  - Response: `Product`

- **PUT /api/products/:id** (admin)
  - Body: `Partial<Product>`
  - Response: `Product`

- **DELETE /api/products/:id** (admin)
  - Response: `{ success: boolean; }`

### Category Service

- **GET /api/categories**
  - Response: `Category[]`

- **POST /api/categories** (admin)
  - Body: `Category` (without id)
  - Response: `Category`

- **PUT /api/categories/:id** (admin)
  - Body: `Partial<Category>`
  - Response: `Category`

- **DELETE /api/categories/:id** (admin)
  - Response: `{ success: boolean; }`

### Cart Service

- **GET /api/cart**
  - Auth: Bearer
  - Response: `Cart`

- **POST /api/cart/add**
  - Auth: Bearer
  - Body: `{ productId: string; quantity: number; }`
  - Response: `Cart`

- **POST /api/cart/remove**
  - Auth: Bearer
  - Body: `{ productId: string; }`
  - Response: `Cart`

- **POST /api/cart/clear**
  - Auth: Bearer
  - Response: `Cart`

### Order Service

- **GET /api/orders**
  - Auth: Bearer
  - Response: `Order[]`

- **GET /api/orders/:id**
  - Auth: Bearer
  - Response: `Order`

- **POST /api/orders**
  - Auth: Bearer
  - Body: `{ addressId: string; couponCode?: string; paymentMethodId: string; }`
  - Response: `Order`

- **PUT /api/orders/:id/status** (admin)
  - Body: `{ status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'; }`
  - Response: `Order`

### Coupon Service

- **GET /api/coupons**
  - Auth: Admin
  - Response: `Coupon[]`

- **POST /api/coupons** (admin)
  - Body: `Coupon` (without id, usedCount)
  - Response: `Coupon`

- **PUT /api/coupons/:id** (admin)
  - Body: `Partial<Coupon>`
  - Response: `Coupon`

- **DELETE /api/coupons/:id** (admin)
  - Response: `{ success: boolean; }`

### Review Service

- **GET /api/products/:productId/reviews**
  - Response: `Review[]`

- **POST /api/products/:productId/reviews**
  - Auth: Bearer
  - Body: `{ rating: number; comment: string; }`
  - Response: `Review`

### Address Service

- **GET /api/addresses**
  - Auth: Bearer
  - Response: `Address[]`

- **POST /api/addresses**
  - Auth: Bearer
  - Body: `Address` (without id)
  - Response: `Address`

- **PUT /api/addresses/:id**
  - Auth: Bearer
  - Body: `Partial<Address>`
  - Response: `Address`

- **DELETE /api/addresses/:id**
  - Auth: Bearer
  - Response: `{ success: boolean; }`

---

## 4. FILE STRUCTURE

```
.
├── docker-compose.yml                # Multi-service orchestration
├── .env.example                     # Environment variable template
├── .gitignore                       # Git ignore rules
├── README.md                        # Project documentation
├── run.sh                           # Root startup script
├── backend/
│   ├── Dockerfile                   # Backend build instructions
│   ├── nest-cli.json                # NestJS CLI config
│   ├── tsconfig.json                # TypeScript config
│   ├── package.json                 # Backend dependencies
│   ├── src/
│   │   ├── main.ts                  # NestJS entry point
│   │   ├── app.module.ts            # Root module
│   │   ├── auth/                    # Auth microservice
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   ├── register.dto.ts
│   │   │   │   ├── token.dto.ts
│   │   │   └── strategies/
│   │   │       ├── jwt.strategy.ts
│   │   │       └── local.strategy.ts
│   │   ├── products/
│   │   │   ├── products.module.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── product.dto.ts
│   │   │   │   └── category.dto.ts
│   │   ├── cart/
│   │   │   ├── cart.module.ts
│   │   │   ├── cart.controller.ts
│   │   │   ├── cart.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── cart.dto.ts
│   │   │   │   └── cart-item.dto.ts
│   │   ├── orders/
│   │   │   ├── orders.module.ts
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── order.dto.ts
│   │   │   │   └── order-item.dto.ts
│   │   ├── coupons/
│   │   │   ├── coupons.module.ts
│   │   │   ├── coupons.controller.ts
│   │   │   ├── coupons.service.ts
│   │   │   ├── dto/
│   │   │   │   └── coupon.dto.ts
│   │   ├── reviews/
│   │   │   ├── reviews.module.ts
│   │   │   ├── reviews.controller.ts
│   │   │   ├── reviews.service.ts
│   │   │   ├── dto/
│   │   │   │   └── review.dto.ts
│   │   ├── addresses/
│   │   │   ├── addresses.module.ts
│   │   │   ├── addresses.controller.ts
│   │   │   ├── addresses.service.ts
│   │   │   ├── dto/
│   │   │   │   └── address.dto.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── dto/
│   │   │   │   └── user.dto.ts
│   │   ├── shared/
│   │   │   ├── constants.ts
│   │   │   ├── utils.ts
│   │   │   └── decorators/
│   │   │       └── roles.decorator.ts
│   │   └── config/
│   │       ├── database.config.ts
│   │       ├── redis.config.ts
│   │       └── stripe.config.ts
│   └── test/
│       └── e2e/
│           └── app.e2e-spec.ts
├── frontend/
│   ├── Dockerfile                   # Frontend build instructions
│   ├── next.config.js               # Next.js config
│   ├── package.json                 # Frontend dependencies
│   ├── tsconfig.json                # TypeScript config
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── pages/
│   │   │   ├── 01-Home.tsx
│   │   │   ├── 02-Catálogo.tsx
│   │   │   ├── 03-Detalle-Producto.tsx
│   │   │   ├── 04-Carrito.tsx
│   │   │   ├── 05-Checkout.tsx
│   │   │   ├── 06-Login-Registro.tsx
│   │   │   ├── 07-Perfil.tsx
│   │   │   ├── 08-Historial-Pedidos.tsx
│   │   │   ├── 09-Admin-Dashboard.tsx
│   │   │   ├── 10-Admin-Productos.tsx
│   │   │   ├── 11-Admin-Pedidos.tsx
│   │   │   ├── 12-Admin-Usuarios.tsx
│   │   │   ├── 13-Admin-Cupones.tsx
│   │   │   ├── 14-Mobile-Home.tsx
│   │   │   ├── 15-Mobile-Catálogo.tsx
│   │   │   ├── 16-Mobile-Detalle.tsx
│   │   │   ├── 17-Mobile-Carrito.tsx
│   │   │   └── 18-Mobile-Checkout.tsx
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Badge.tsx
│   │   │       ├── Modal.tsx
│   │   │       ├── Toast.tsx
│   │   │       ├── Dropdown.tsx
│   │   │       ├── Pagination.tsx
│   │   │       ├── Breadcrumb.tsx
│   │   │       ├── Tabs.tsx
│   │   │       ├── Accordion.tsx
│   │   │       ├── Tooltip.tsx
│   │   │       ├── SkeletonLoader.tsx
│   │   │       ├── RatingStars.tsx
│   │   │       ├── QuantitySelector.tsx
│   │   │       ├── SearchBar.tsx
│   │   │       ├── FilterPanel.tsx
│   │   │       ├── ImageGallery.tsx
│   │   │       ├── Stepper.tsx
│   │   │       ├── Table.tsx
│   │   │       ├── FormGroup.tsx
│   │   │       ├── IconButton.tsx
│   │   │       ├── Avatar.tsx
│   │   │       └── Logo.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useCart.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useOrders.ts
│   │   │   ├── useCategories.ts
│   │   │   ├── useCoupons.ts
│   │   │   ├── useReviews.ts
│   │   │   ├── useAddresses.ts
│   │   │   └── useToast.ts
│   │   ├── styles/
│   │   │   └── tokens.ts
│   │   └── utils/
│   │       └── api.ts
│   └── start.sh                     # Frontend startup script
```

---

## PORT TABLE

| Service         | Listening Port | Path                    |
|-----------------|---------------|-------------------------|
| auth-service    | 8001          | backend/src/auth/       |
| products-service| 8002          | backend/src/products/   |
| cart-service    | 8003          | backend/src/cart/       |
| orders-service  | 8004          | backend/src/orders/     |
| coupons-service | 8005          | backend/src/coupons/    |
| reviews-service | 8006          | backend/src/reviews/    |
| addresses-service| 8007         | backend/src/addresses/  |
| users-service   | 8008          | backend/src/users/      |

---

## SHARED MODULES

| Shared path         | Imported by services                                      |
|---------------------|----------------------------------------------------------|
| backend/src/shared/ | auth, products, cart, orders, coupons, reviews, addresses, users |

---

## 5. ENVIRONMENT VARIABLES

| Name                  | Type   | Description                                   | Example Value                |
|-----------------------|--------|-----------------------------------------------|-----------------------------|
| NODE_ENV              | string | Node environment                              | production                  |
| DATABASE_URL          | string | PostgreSQL connection string                  | postgres://user:pass@db:5432/catshop |
| REDIS_URL             | string | Redis connection string                       | redis://redis:6379          |
| JWT_SECRET            | string | JWT signing secret                            | supersecretjwtkey           |
| STRIPE_SECRET_KEY     | string | Stripe API secret key                         | sk_test_...                 |
| SENDGRID_API_KEY      | string | SendGrid API key                              | SG.xxxxxxxx                 |
| FRONTEND_URL          | string | Public frontend URL                           | https://catshop.com         |
| BACKEND_URL           | string | Public backend URL                            | https://api.catshop.com     |
| PORT                  | number | Port for service (per microservice)           | 8001                        |
| SESSION_SECRET        | string | Session encryption secret                     | sessionsecret               |
| ADMIN_EMAIL           | string | Default admin email                           | admin@catshop.com           |
| ADMIN_PASSWORD        | string | Default admin password                        | strongpassword              |

---

## 6. IMPORT CONTRACTS

### Backend

- `from src/auth/auth.service import AuthService`
- `from src/auth/auth.controller import AuthController`
- `from src/products/products.service import ProductsService`
- `from src/products/products.controller import ProductsController`
- `from src/cart/cart.service import CartService`
- `from src/cart/cart.controller import CartController`
- `from src/orders/orders.service import OrdersService`
- `from src/orders/orders.controller import OrdersController`
- `from src/coupons/coupons.service import CouponsService`
- `from src/coupons/coupons.controller import CouponsController`
- `from src/reviews/reviews.service import ReviewsService`
- `from src/reviews/reviews.controller import ReviewsController`
- `from src/addresses/addresses.service import AddressesService`
- `from src/addresses/addresses.controller import AddressesController`
- `from src/users/users.service import UsersService`
- `from src/users/users.controller import UsersController`
- `from src/shared/constants import ROLES, ORDER_STATUS`
- `from src/shared/utils import hashPassword, comparePassword, generateToken`

### Frontend

- `import { tokens } from '../styles/tokens'`
- `import { useAuth } from '../hooks/useAuth'`
- `import { useCart } from '../hooks/useCart'`
- `import { useProducts } from '../hooks/useProducts'`
- `import { useOrders } from '../hooks/useOrders'`
- `import { useCategories } from '../hooks/useCategories'`
- `import { useCoupons } from '../hooks/useCoupons'`
- `import { useReviews } from '../hooks/useReviews'`
- `import { useAddresses } from '../hooks/useAddresses'`
- `import { useToast } from '../hooks/useToast'`
- `import { Button } from '../components/ui/Button'`
- `import { Input } from '../components/ui/Input'`
- `import { Card } from '../components/ui/Card'`
- `import { Badge } from '../components/ui/Badge'`
- `import { Modal } from '../components/ui/Modal'`
- `import { Toast } from '../components/ui/Toast'`
- `import { Dropdown } from '../components/ui/Dropdown'`
- `import { Pagination } from '../components/ui/Pagination'`
- `import { Breadcrumb } from '../components/ui/Breadcrumb'`
- `import { Tabs } from '../components/ui/Tabs'`
- `import { Accordion } from '../components/ui/Accordion'`
- `import { Tooltip } from '../components/ui/Tooltip'`
- `import { SkeletonLoader } from '../components/ui/SkeletonLoader'`
- `import { RatingStars } from '../components/ui/RatingStars'`
- `import { QuantitySelector } from '../components/ui/QuantitySelector'`
- `import { SearchBar } from '../components/ui/SearchBar'`
- `import { FilterPanel } from '../components/ui/FilterPanel'`
- `import { ImageGallery } from '../components/ui/ImageGallery'`
- `import { Stepper } from '../components/ui/Stepper'`
- `import { Table } from '../components/ui/Table'`
- `import { FormGroup } from '../components/ui/FormGroup'`
- `import { IconButton } from '../components/ui/IconButton'`
- `import { Avatar } from '../components/ui/Avatar'`
- `import { Logo } from '../components/ui/Logo'`

---

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Shared State Primitives

```typescript
// Auth
useAuth() → {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

// Cart
useCart() → {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
}

// Products
useProducts() → {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (params?: { categoryId?: string; search?: string; page?: number; limit?: number }) => Promise<void>;
}

// Orders
useOrders() → {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  createOrder: (addressId: string, couponCode?: string, paymentMethodId?: string) => Promise<Order>;
}

// Categories
useCategories() → {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

// Coupons
useCoupons() → {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
  fetchCoupons: () => Promise<void>;
  createCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => Promise<void>;
}

// Reviews
useReviews(productId: string) → {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  addReview: (rating: number, comment: string) => Promise<void>;
}

// Addresses
useAddresses() → {
  addresses: Address[];
  loading: boolean;
  error: string | null;
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
}

// Toast
useToast() → {
  toasts: { id: string; message: string; type: 'success' | 'error' | 'info'; }[];
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}
```

### UI Component Props/Inputs

```typescript
// Button
Button props: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Input
Input props: {
  type: 'text' | 'email' | 'password' | 'search' | 'textarea' | 'select';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  options?: { value: string; label: string }[]; // for select
  disabled?: boolean;
  required?: boolean;
}

// Card
Card props: {
  variant?: 'product' | 'category' | 'order';
  children: React.ReactNode;
  className?: string;
}

// Badge
Badge props: {
  type: 'status' | 'discount' | 'stock';
  value: string | number;
  color?: string;
}

// Modal
Modal props: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

// Toast
Toast props: {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

// Dropdown
Dropdown props: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

// Pagination
Pagination props: {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

// Breadcrumb
Breadcrumb props: {
  items: { label: string; href: string }[];
}

// Tabs
Tabs props: {
  tabs: { label: string; key: string }[];
  activeKey: string;
  onTabChange: (key: string) => void;
}

// Accordion
Accordion props: {
  items: { title: string; content: React.ReactNode }[];
}

// Tooltip
Tooltip props: {
  content: React.ReactNode;
  children: React.ReactNode;
}

// SkeletonLoader
SkeletonLoader props: {
  width?: number | string;
  height?: number | string;
  count?: number;
}

// RatingStars
RatingStars props: {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

// QuantitySelector
QuantitySelector props: {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

// SearchBar
SearchBar props: {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

// FilterPanel
FilterPanel props: {
  filters: { type: 'checkbox' | 'range' | 'radio'; label: string; options: any[] }[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

// ImageGallery
ImageGallery props: {
  images: string[];
  activeIndex?: number;
  onChange?: (index: number) => void;
}

// Stepper
Stepper props: {
  steps: { label: string }[];
  activeStep: number;
  onStepChange: (step: number) => void;
}

// Table
Table props: {
  columns: { key: string; label: string }[];
  data: any[];
  rowKey: string;
}

// FormGroup
FormGroup props: {
  label: string;
  error?: string;
  children: React.ReactNode;
}

// IconButton
IconButton props: {
  icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  disabled?: boolean;
}

// Avatar
Avatar props: {
  src: string;
  alt: string;
  size?: number;
}

// Logo
Logo props: {
  size?: number;
}
```

---

## 8. FILE EXTENSION CONVENTION

- All frontend files use `.tsx` (TypeScript React).
- The project is TypeScript throughout (frontend and backend).
- Entry point: `/src/pages/01-Home.tsx` (Next.js will use this as the root route).

---

## 9. DESIGN TOKENS

```typescript
export const tokens = {
  colors: {
    primary: "#F28C28",
    primary_hover: "#E07B1F",
    secondary: "#4A90D9",
    secondary_hover: "#3A7BC8",
    accent: "#F5A623",
    background: "#F9F9F9",
    surface: "#FFFFFF",
    text_primary: "#2C3E50",
    text_secondary: "#7F8C8D",
    text_on_primary: "#FFFFFF",
    error: "#E74C3C",
    success: "#27AE60",
    warning: "#F39C12",
    border: "#E0E0E0",
    disabled: "#BDC3C7"
  },
  typography: {
    font_family: "'Inter', sans-serif",
    headings: {
      h1: { size: 32, weight: 700, line_height: 1.2 },
      h2: { size: 24, weight: 600, line_height: 1.3 },
      h3: { size: 20, weight: 600, line_height: 1.4 },
      h4: { size: 18, weight: 500, line_height: 1.4 }
    },
    body: {
      large: { size: 16, weight: 400, line_height: 1.5 },
      regular: { size: 14, weight: 400, line_height: 1.5 },
      small: { size: 12, weight: 400, line_height: 1.4 }
    },
    button: {
      size: 16,
      weight: 600,
      letter_spacing: 0.5
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.1)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.1)"
  },
  icon_style: "Outline icons with consistent stroke width (2px), rounded caps, and a friendly appearance. Use a set like Feather or Material Design outlined.",
  image_style: "High-resolution product photos on clean white or light gray backgrounds. Lifestyle images of cats with products in warm, natural settings.",
  motion: "Subtle transitions (0.2s-0.3s ease) for hover states, dropdowns, modals, and page transitions. Use micro-animations for feedback (e.g., button press, add to cart)."
};
```
