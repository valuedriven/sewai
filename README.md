# SeWAI - Simple Web AI

SeWAI (Simple Web AI) is a dual-flow platform designed to empower micro-entrepreneurs by bridging the gap between professional digital presence and efficient sales management.

## 🚀 Key Features

### For Customers (Digital Showcase)
- **Digital Vitrine**: Browse a clean, professional product catalog.
- **Smart Cart**: Easily manage items and calculate totals automatically.
- **Order Tracking**: Historic view and detail page for all placed orders.

### For Administrators (Management Dashboard)
- **Sales Dashboard**: Real-time KPIs for total sales, received values, and pending amounts.
- **Catalog Management**: Full CRUD for Products and Categories.
- **Client & Order Control**: Manage customer data and move orders through an operational flow (Novo → Pago → Preparação → ...).

## 🛠️ Tech Stack

- **Frontend**: [Next.js 16+](.agent/skills/nextjs/SKILL.md) (App Router, Server Components).
- **Authentication**: [Clerk](.agent/skills/clerk/SKILL.md) (Role-based access).
- **Persistence**: PostgreSQL via [Supabase](.agent/skills/supabase-postgres-best-practices/SKILL.md) & [Prisma](https://www.prisma.io/).
- **Observability**: [Grafana Cloud](.agent/skills/grafana-dashboards/SKILL.md) (Faro & OpenTelemetry).
- **Styling**: Vanilla CSS following the [Design System Patterns](.agent/skills/design-system-patterns/SKILL.md).

## 📂 Project Structure

- `src/app/`: Core routing and page implementation.
- `src/components/`: Reusable UI components (follows [Vercel Composition Patterns](.agent/skills/vercel-composition-patterns/SKILL.md)).
- `src/contexts/`: Global state management (e.g., Shopping Cart).
- `src/lib/`: Business logic, third-party clients, and shared utilities.
- `src/styles/`: Theme tokens and global aesthetics.

## 🚦 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (copy `.env.example` to `.env`)
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 Resources

- [PRD (Requirements)](docs/prd.md)
- [UI Specification](docs/spec_ui.md)
- [Technical Specification](docs/spec_tech.md)
- [Agent Guidelines](AGENTS.md)
