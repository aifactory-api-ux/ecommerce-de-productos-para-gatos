# CatShop Architecture

## System Overview

CatShop is a microservices-based ecommerce platform for cat products.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client                               │
│                    (Next.js Frontend)                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway                              │
│                   (nginx / LB)                              │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌──────────┬──────────┬──────────┬──────────┬────────────────┐
│          │          │          │          │                │
▼          ▼          ▼          ▼          ▼                ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐
│ Auth │ │Product│ │ Cart │ │Order │ │Coupon│ │  Users  │
│ Svc  │ │ Svc  │ │ Svc  │ │ Svc  │ │ Svc  │ │  Svc   │
└──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └────┬────┘
   │        │        │        │        │          │
   └────────┴────────┴────────┴────────┴──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │   Shared Services   │
         │  (PostgreSQL/Redis) │
         └─────────────────────┘
```

## Services

### Auth Service (Port 8001)
- User registration and login
- JWT token generation and validation
- Password hashing with PBKDF2

### Products Service (Port 8002)
- Product catalog management
- Category management
- Search and filtering
- Paginated product listing

### Cart Service (Port 8003)
- Shopping cart CRUD
- Redis-backed session storage
- Real-time cart updates

### Orders Service (Port 8004)
- Order creation and management
- Stripe payment integration
- Order status tracking

### Coupons Service (Port 8005)
- Coupon CRUD operations
- Usage tracking
- Expiration management

### Reviews Service (Port 8006)
- Product reviews
- Rating system

### Addresses Service (Port 8007)
- User address management
- Multiple addresses per user

### Users Service (Port 8008)
- User management
- Role-based access control (RBAC)
- Admin/user permissions

## Data Stores

### PostgreSQL
- Primary data store
- User, product, order, coupon data
- ACID compliance for transactions

### Redis
- Session management
- Cart caching
- Rate limiting

## Security

- JWT authentication
- RBAC (Role-Based Access Control)
- Password hashing with salt
- CORS configuration
- Input validation with class-validator

## Design Patterns

- Repository pattern for data access
- DTO pattern for data transfer
- Service layer pattern
- CQRS for read/write separation (products)