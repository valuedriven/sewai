# SeWAI - Project Guidelines for Agents

Welcome, Agent! This document provides the necessary context and standards for contributing to the SeWAI project.

## 1. Project Overview

**SeWAI** (Simple Web AI) is a dual-flow platform designed to help micro-entrepreneurs manage their sales and provide a professional digital storefront for their customers.

- **Customer Flow**: Browse product catalog (vitrine), manage shopping cart, and place orders.
- **Admin Flow**: Manage categories, products, customers, and orders via a management dashboard.

## 2. Tech Stack

- **Framework**: [Next.js 16+](.agent/skills/nextjs/SKILL.md) (App Router).
- **Authentication**: [Clerk](.agent/skills/clerk/SKILL.md) (Profiles: Admin, Customer).
- **Database**: PostgreSQL (via [.agent/skills/supabase-postgres-best-practices/SKILL.md](.agent/skills/supabase-postgres-best-practices/SKILL.md)).
- **ORM**: Prisma 5+.
- **Frontend Deployment**: Vercel.
- **Observability**: [Grafana Cloud](.agent/skills/grafana-dashboards/SKILL.md) (Faro & OpenTelemetry).
- **Styling**: Vanilla CSS with [.agent/skills/design-system-patterns/SKILL.md](.agent/skills/design-system-patterns/SKILL.md).

## 3. Project Structure (`src/`)

- `app/`: Next.js App Router routes, layouts, and pages.
- `components/`: Reusable UI components (follows [.agent/skills/vercel-composition-patterns/SKILL.md](.agent/skills/vercel-composition-patterns/SKILL.md)).
- `contexts/`: React Context providers (e.g., `CartContext`).
- `lib/`: Shared utilities, Prisma client, and third-party initializations.
- `styles/`: Global styles and design system tokens.
- `proxy.ts`: Middleware/Proxy implementation for auth and route protection.

## 4. Key Entities & Statuses

### Entities
- **Category**: `id`, `name`, `active`.
- **Product**: `id`, `name`, `description`, `price`, `stock`, `image_url`, `category_id`, `active`.
- **Customer**: `id`, `name`, `email`, `phone`, `address`, `active`.
- **Order**: `id`, `total_value`, `customer_id`, `status`, `payment_method`, `payment_date`.
- **OrderItem**: `id`, `order_id`, `product_id`, `quantity`, `unit_price`.

### Order Status Flow
`Novo` → `Pago` → `Preparação` → `Faturado` → `Despachado` → `Entregue`
*Note: Any state (except Entregue/Cancelado) can transition to `Cancelado`.*

## 5. Development Standards

- **TypeScript**: Mandatory type safety for all new code.
- **Client vs. Server**: Use Server Components by default. Use `"use client"` only when necessary (interactivity, hooks).
- **Design System**: Use semantic tokens for colors and spacing. Follow the [UI Specification](docs/spec_ui.md) for badges and components.
- **Security**: 
    - Admin actions must be protected by profile checks.
    - Public routes: Vitrine, active products.
    - Protected routes: Order history, Admin dashboard.
- **Persistence**: 
    - All tables must have `created_at` and `updated_at` timestamps.
    - Soft deletes (via `active` flag) for customers with orders.

## 6. Resources

- [PRD (Product Requirements)](docs/prd.md)
- [UI Specification](docs/spec_ui.md)
- [Technical Specification](docs/spec_tech.md)

## 7. Restrições (Context Constraints)
1. **Forbidden Directories:** Você NÃO deve ler, analisar ou sugerir alterações em arquivos localizados nos seguintes diretórios:
   - `./docs/fluxos/`
   - `./.next/`
   - `./node_modules/`
   - `./public/`
2. Trate esses diretórios como inexistentes para fins de geração de código.
