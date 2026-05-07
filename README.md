# CatShop - Ecommerce for Cat Products

A full-stack ecommerce platform for cat products built with NestJS, Next.js, PostgreSQL, Redis, and Stripe.

## Features

- **User Authentication**: JWT-based auth with registration, login, refresh tokens
- **Product Catalog**: Browse, search, filter products by category
- **Shopping Cart**: Add, remove, update quantities
- **Checkout**: Stripe payment integration
- **Order Management**: View order history, track status
- **Admin Dashboard**: Manage products, orders, users, coupons
- **Responsive Design**: Desktop and mobile interfaces

## Tech Stack

### Backend
- NestJS (Node.js v20)
- TypeScript v5
- PostgreSQL v15
- Redis v7
- Stripe API
- SendGrid API

### Frontend
- Next.js v14
- React v18
- TypeScript v5

### Infrastructure
- Docker v24
- docker-compose v2

## Getting Started

### Prerequisites

- Docker and docker-compose installed
- Node.js v20 (for local development)
- PostgreSQL v15 (if not using Docker)
- Redis v7 (if not using Docker)

### Quick Start

1. Clone the repository
2. Run the startup script:
   ```bash
   chmod +x run.sh
   ./run.sh
   ```
3. Access the application:
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

### Environment Variables

Create a `.env` file or use the `.env.example` template:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/catshop
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG.xxxxxxxx
FRONTEND_URL=http://localhost:3001
```

## Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── auth/           # Authentication
│   │   ├── products/       # Product catalog
│   │   ├── cart/           # Shopping cart
│   │   ├── orders/         # Order management
│   │   ├── coupons/         # Coupon management
│   │   ├── reviews/         # Product reviews
│   │   ├── addresses/       # User addresses
│   │   ├── users/           # User management
│   │   ├── shared/          # Shared DTOs, utils
│   │   └── config/          # Configuration
│   └── test/
├── frontend/
│   ├── src/
│   │   ├── pages/           # Next.js pages
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── styles/          # Design tokens
│   │   └── utils/            # API utilities
│   └── public/
├── docker-compose.yml
└── run.sh
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add item
- `POST /api/cart/remove` - Remove item
- `POST /api/cart/clear` - Clear cart

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update status (admin)

## License

MIT