# DEVELOPMENT PLAN: Ecommerce de Productos para Gatos

## 1. ARCHITECTURE OVERVIEW

**Components:**
- **Backend (NestJS, Node.js 20, PostgreSQL 15, Redis, Stripe, SendGrid):**
  - Auth Service (register, login, JWT, refresh, profile)
  - Product Service (catalog, search, CRUD, categories)
  - Cart Service (cart CRUD, session, Redis)
  - Order Service (checkout, order CRUD, Stripe integration)
  - Coupon Service (admin coupon management)
  - Review Service (product reviews)
  - Address Service (user addresses)
  - Users Service (admin/user management)
  - Shared modules (DTOs, interfaces, config, utils)
- **Frontend (React 18, Next.js 14, TypeScript):**
  - Pages: Home, Catalog, Product Detail, Cart, Checkout, Login/Register, Profile, Order History, Admin Dashboard, Admin CRUDs, Mobile variants
  - Components: UI kit (Button, Input, Card, etc.), domain components (SearchBar, FilterPanel, ImageGallery, etc.)
- **Infrastructure:**
  - Docker, docker-compose, Kubernetes manifests (for cloud), Redis, PostgreSQL
  - CI/CD (GitHub Actions, not in scope for code files)
  - Healthchecks, structured logging, env validation, error handling

**Folder Structure (as per SPEC.md and architecture):**
```
project-root/
├── frontend/
│   ├── src/
│   └── Dockerfile
├── backend/
│   ├── Dockerfile
│   ├── nest-cli.json
│   ├── tsconfig.json
│   ├── package.json
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── [domain modules...]
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
├── docker-compose.yml
├── .env.example
├── .gitignore
├── .dockerignore
├── run.sh
├── README.md
├── docs/
│   └── architecture.md
```

**Models & APIs:**
- All models/interfaces as per SPEC.md §2 (User, Product, Category, Cart, Order, etc.)
- All endpoints as per SPEC.md §3 (no additions/removals)
- All files as per SPEC.md §4 (no extra files)

## 2. ACCEPTANCE CRITERIA

1. The platform provides a fully functional e-commerce experience for cat products, including catalog browsing, cart, checkout with Stripe, user authentication, and admin management, accessible via responsive web UI.
2. All backend APIs are implemented as per SPEC.md, with JWT authentication, RBAC, input validation, error handling, and health checks, and are accessible via the documented endpoints.
3. The system runs locally with a single `./run.sh` command, provisioning all services (frontend, backend, PostgreSQL, Redis), with all healthchecks passing and the web app accessible at the documented URL.

---

## TEAM SCOPE (MANDATORY — PARSED BY THE PIPELINE)
- **role-tl (technical_lead):** Item 1 (Foundation)
- **role-be (backend_developer):** Item 2 (Backend — All Domain Services)
- **role-fe (frontend_developer):** Item 3 (Frontend — Pages & Components)
- **role-devops (devops_support):** Item 4 (Infrastructure & Deployment)

---

## 3. EXECUTABLE ITEMS

---

### ITEM 1: Foundation — shared types, interfaces, DB schemas, config

**Goal:**  
Create all shared code and configuration that other items will import, including:
- TypeScript interfaces and enums for all data contracts (User, Product, etc.)
- Shared config (env validation, constants)
- Shared utility functions
- NestJS shared constants, decorators, and utils
- Database schema (PostgreSQL) with all tables and indexes

**Files to create:**
- shared/types.ts (create) — All TypeScript interfaces and enums as per SPEC.md §2
- backend/src/shared/constants.ts (create) — Shared constants (roles, statuses, etc.)
- backend/src/shared/utils.ts (create) — Utility functions (e.g., password hashing, token generation)
- backend/src/shared/decorators/roles.decorator.ts (create) — RBAC decorator for NestJS
- backend/src/config/database.config.ts (create) — DB config and env validation
- backend/src/config/redis.config.ts (create) — Redis config and env validation
- backend/src/config/stripe.config.ts (create) — Stripe config and env validation
- backend/src/config/sendgrid.config.ts (create) — SendGrid config and env validation
- backend/src/shared/dto/user.dto.ts (create) — User DTOs
- backend/src/shared/dto/product.dto.ts (create) — Product DTOs
- backend/src/shared/dto/category.dto.ts (create) — Category DTOs
- backend/src/shared/dto/cart.dto.ts (create) — Cart DTOs
- backend/src/shared/dto/cart-item.dto.ts (create) — CartItem DTOs
- backend/src/shared/dto/order.dto.ts (create) — Order DTOs
- backend/src/shared/dto/order-item.dto.ts (create) — OrderItem DTOs
- backend/src/shared/dto/coupon.dto.ts (create) — Coupon DTOs
- backend/src/shared/dto/review.dto.ts (create) — Review DTOs
- backend/src/shared/dto/address.dto.ts (create) — Address DTOs
- backend/src/shared/dto/token.dto.ts (create) — AuthToken DTOs
- backend/src/db/schema.sql (create) — Complete PostgreSQL schema with all tables, indexes, and constraints

**Tests required:**
- backend/test/e2e/app.e2e-spec.ts:  
  - Test shared DTO validation (e.g., User, Product)
  - Test env validation (missing/invalid vars)
  - Test utility functions (e.g., password hashing)

**Dependencies:** None

**Validation:**  
- Run `npm run test` in backend/ to verify DTOs and utils
- Run `psql -f backend/src/db/schema.sql` to create DB schema without errors

**Role:** role-tl (technical_lead)

---

### ITEM 2: Backend — All Domain Services (NestJS, PostgreSQL, Redis, Stripe, SendGrid)

**Goal:**  
Implement all backend domain modules as per SPEC.md, including:
- Auth Service: register, login, refresh, profile (JWT, RBAC, SendGrid email)
- Product Service: catalog, search, CRUD, categories (CQRS, paginated search)
- Cart Service: cart CRUD, session (Redis-backed)
- Order Service: checkout, order CRUD, Stripe integration, Event Sourcing for order history
- Coupon Service: admin coupon management
- Review Service: product reviews
- Address Service: user addresses
- Users Service: admin/user management
- Health check endpoint
- Structured logging, error handling, input validation, RBAC enforcement

**Files to create:**
- backend/src/main.ts (create) — NestJS entry point
- backend/src/app.module.ts (create) — Root module, imports all domain modules
- backend/src/auth/auth.module.ts (create)
- backend/src/auth/auth.controller.ts (create)
- backend/src/auth/auth.service.ts (create)
- backend/src/auth/dto/login.dto.ts (create)
- backend/src/auth/dto/register.dto.ts (create)
- backend/src/auth/dto/token.dto.ts (create)
- backend/src/auth/strategies/jwt.strategy.ts (create)
- backend/src/auth/strategies/local.strategy.ts (create)
- backend/src/products/products.module.ts (create)
- backend/src/products/products.controller.ts (create)
- backend/src/products/products.service.ts (create)
- backend/src/products/dto/product.dto.ts (create)
- backend/src/products/dto/category.dto.ts (create)
- backend/src/cart/cart.module.ts (create)
- backend/src/cart/cart.controller.ts (create)
- backend/src/cart/cart.service.ts (create)
- backend/src/cart/dto/cart.dto.ts (create)
- backend/src/cart/dto/cart-item.dto.ts (create)
- backend/src/orders/orders.module.ts (create)
- backend/src/orders/orders.controller.ts (create)
- backend/src/orders/orders.service.ts (create)
- backend/src/orders/dto/order.dto.ts (create)
- backend/src/orders/dto/order-item.dto.ts (create)
- backend/src/coupons/coupons.module.ts (create)
- backend/src/coupons/coupons.controller.ts (create)
- backend/src/coupons/coupons.service.ts (create)
- backend/src/coupons/dto/coupon.dto.ts (create)
- backend/src/reviews/reviews.module.ts (create)
- backend/src/reviews/reviews.controller.ts (create)
- backend/src/reviews/reviews.service.ts (create)
- backend/src/reviews/dto/review.dto.ts (create)
- backend/src/addresses/addresses.module.ts (create)
- backend/src/addresses/addresses.controller.ts (create)
- backend/src/addresses/addresses.service.ts (create)
- backend/src/addresses/dto/address.dto.ts (create)
- backend/src/users/users.module.ts (create)
- backend/src/users/users.controller.ts (create)
- backend/src/users/users.service.ts (create)
- backend/src/users/dto/user.dto.ts (create)
- backend/src/shared/constants.ts (import from Item 1)
- backend/src/shared/utils.ts (import from Item 1)
- backend/src/shared/decorators/roles.decorator.ts (import from Item 1)
- backend/src/config/database.config.ts (import from Item 1)
- backend/src/config/redis.config.ts (import from Item 1)
- backend/src/config/stripe.config.ts (import from Item 1)
- backend/src/config/sendgrid.config.ts (import from Item 1)
- backend/Dockerfile (create) — Multi-stage build, non-root user, EXPOSE 3000, CMD: `node dist/main.js`
- backend/package.json (create) — All dependencies and scripts (start, build, test)
- backend/tsconfig.json (create) — TypeScript config (strict mode)
- backend/nest-cli.json (create) — NestJS CLI config
- backend/test/e2e/app.e2e-spec.ts (create) — E2E tests for all endpoints (happy path + error cases)

**Tests required:**
- backend/test/e2e/app.e2e-spec.ts:
  - Auth: register, login, refresh, RBAC
  - Products: list, detail, admin CRUD
  - Cart: add, remove, clear, get
  - Orders: create, get, update status
  - Coupons: admin CRUD
  - Reviews: list, create
  - Addresses: CRUD
  - Health check: GET /health

**Dependencies:** Item 1

**Validation:**  
- Run `docker build -t backend .` in backend/
- Run `npm run test` in backend/
- Start backend with Docker, verify all endpoints respond as per SPEC.md
- Health check: GET /health returns status: 'ok'

**Role:** role-be (backend_developer)

---

### ITEM 3: Frontend — Pages & Components (React 18, Next.js 14, TypeScript)

**Goal:**  
Implement the complete frontend as per SPEC.md, including:
- All pages: Home, Catalog, Product Detail, Cart, Checkout, Login/Register, Profile, Order History, Admin Dashboard, Admin CRUDs, Mobile variants
- All UI components: Button, Input, Card, Badge, Modal, Toast, Dropdown, Pagination, Breadcrumb, Tabs, Accordion, Tooltip, SkeletonLoader, RatingStars, QuantitySelector, SearchBar, FilterPanel, ImageGallery, Stepper, Table, FormGroup, IconButton, Avatar, Logo
- Responsive design (desktop/mobile)
- API integration with backend endpoints (auth, products, cart, orders, etc.)
- State management (React context/hooks as needed)
- Error handling, loading states, input validation
- Health check endpoint (GET /health)
- Strict TypeScript, explicit types

**Files to create:**
- frontend/Dockerfile (create) — Multi-stage build, non-root user, EXPOSE 3001, CMD: `npm run start`
- frontend/package.json (create) — All dependencies and scripts (start, build, test)
- frontend/tsconfig.json (create) — TypeScript config (strict mode)
- frontend/next.config.js (create) — Next.js config
- frontend/public/favicon.ico (create)
- frontend/src/pages/01-Home.tsx (create)
- frontend/src/pages/02-Catálogo.tsx (create)
- frontend/src/pages/03-Detalle-Producto.tsx (create)
- frontend/src/pages/04-Carrito.tsx (create)
- frontend/src/pages/05-Checkout.tsx (create)
- frontend/src/pages/06-Login-Registro.tsx (create)
- frontend/src/pages/07-Perfil.tsx (create)
- frontend/src/pages/08-Historial-Pedidos.tsx (create)
- frontend/src/pages/09-Admin-Dashboard.tsx (create)
- frontend/src/pages/10-Admin-Productos.tsx (create)
- frontend/src/pages/11-Admin-Pedidos.tsx (create)
- frontend/src/pages/12-Admin-Usuarios.tsx (create)
- frontend/src/pages/13-Admin-Cupones.tsx (create)
- frontend/src/pages/14-Mobile-Home.tsx (create)
- frontend/src/pages/15-Mobile-Catálogo.tsx (create)
- frontend/src/pages/16-Mobile-Detalle.tsx (create)
- frontend/src/pages/17-Mobile-Carrito.tsx (create)
- frontend/src/pages/18-Mobile-Checkout.tsx (create)
- frontend/src/components/ui/Button.tsx (create)
- frontend/src/components/ui/Input.tsx (create)
- frontend/src/components/ui/Card.tsx (create)
- frontend/src/components/ui/Badge.tsx (create)
- frontend/src/components/ui/Modal.tsx (create)
- frontend/src/components/ui/Toast.tsx (create)
- frontend/src/components/ui/Dropdown.tsx (create)
- frontend/src/components/ui/Pagination.tsx (create)
- frontend/src/components/ui/Breadcrumb.tsx (create)
- frontend/src/components/ui/Tabs.tsx (create)
- frontend/src/components/ui/Accordion.tsx (create)
- frontend/src/components/ui/Tooltip.tsx (create)
- frontend/src/components/ui/SkeletonLoader.tsx (create)
- frontend/src/components/ui/RatingStars.tsx (create)
- frontend/src/components/ui/QuantitySelector.tsx (create)
- frontend/src/components/ui/SearchBar.tsx (create)
- frontend/src/components/ui/FilterPanel.tsx (create)
- frontend/src/components/ui/ImageGallery.tsx (create)
- frontend/src/components/ui/Stepper.tsx (create)
- frontend/src/components/ui/Table.tsx (create)
- frontend/src/components/ui/FormGroup.tsx (create)
- frontend/src/components/ui/IconButton.tsx (create)
- frontend/src/components/ui/Avatar.tsx (create)
- frontend/src/components/ui/Logo.tsx (create)
- shared/types.ts (import from Item 1)
- frontend/tests/01-Home.test.tsx (create) — Test for Home page
- frontend/tests/04-Carrito.test.tsx (create) — Test for Cart page
- frontend/tests/05-Checkout.test.tsx (create) — Test for Checkout page
- frontend/tests/06-Login-Registro.test.tsx (create) — Test for Auth flow

**Tests required:**
- Home page renders and fetches products
- Cart page adds/removes items, updates quantity
- Checkout page completes order flow (mocked backend)
- Login/Register page handles auth, error cases

**Dependencies:** Item 1

**Validation:**  
- Run `docker build -t frontend .` in frontend/
- Run `npm run test` in frontend/
- Start frontend with Docker, verify all pages render and interact with backend
- Health check: GET /health returns status: 'ok'

**Role:** role-fe (frontend_developer)

---

### ITEM 4: Infrastructure & Deployment (REQUIRED — PROJECT MUST RUN)

**Goal:**  
Provide complete Docker orchestration and documentation for local development:
- docker-compose.yml: all services (frontend, backend, postgres, redis) with healthchecks and correct startup order
- .env.example: all required environment variables, with descriptions and example values
- .gitignore: exclude node_modules, dist, .env, etc.
- .dockerignore: exclude node_modules, .git, *.log, dist
- run.sh: validates Docker, builds, starts, waits for healthy, prints access URL
- README.md: prerequisites, setup, run, test, endpoints
- docs/architecture.md: system diagram and component descriptions

**Files to create:**
- docker-compose.yml (create)
- .env.example (create)
- .gitignore (create)
- .dockerignore (create)
- run.sh (create)
- README.md (create)
- docs/architecture.md (create)

**Dependencies:** Items 1, 2, 3

**Validation:**  
- Run `./run.sh` from project root
- All services start, healthchecks pass, web app accessible at printed URL
- All endpoints and pages function as per acceptance criteria

**Role:** role-devops (devops_support)

---

**END OF PLAN**