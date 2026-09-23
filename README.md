# Personal Finance 360

A comprehensive personal finance and wealth management dashboard built with **React**, **Tailwind CSS**, and **Recharts**. Designed to empower users to track income, control expenses, manage monthly budgets, and achieve savings goals through data-driven insights.

---

##  Live Demo & Repository

- **Live Application**: [https://personal-finance-360.vercel.app](https://personal-finance-360.vercel.app)
- **GitHub Repository**: [https://github.com/amoman98-dotcom/personal-finance-360.git](https://github.com/amoman98-dotcom/personal-finance-360.git)

---

##  Features

- **Authentication & Flow**: Client-side authentication with session persistence via `localStorage` and route protection.
- **Financial Dashboard**: Real-time KPI summaries (Total Income, Total Expenses, Net Savings) paired with interactive Recharts visualizations.
- **Transaction Management**: Full CRUD operations for income and expense transactions, featuring real-time search, category/type filtering, and sorting.
- **Monthly Budgets**: Category-specific spending limits with automated progress meters and threshold warnings.
- **Savings Goals**: Goal tracking interface with real-time target calculations and instant deposit simulation.
- **Advanced Spending Insights**: Automated derived-state analytics identifying top expense drivers, period-over-period comparisons, and retention metrics.
- **Responsive Architecture**: Fully optimized layout for mobile, tablet, and desktop screens.

---

## 🛠 Tech Stack

- **Core**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Navigation**: React Router DOM (v6)
- **State & Storage**: React Context API, Custom Hooks, `localStorage`
- **Deployment**: Vercel

---

##  Project Structure

```text
src/
├── components/          # Reusable UI primitives, cards, forms & layout
│   ├── dashboard/       # Charts, metrics & KPI widgets
│   ├── layout/          # Navbar, sidebar, and layout shell
│   └── transactions/   # Data tables, filters, and modal forms
├── context/             # Global AuthContext & FinanceContext
├── hooks/               # Custom hooks for analytics & derived calculations
├── pages/               # Dashboard, Transactions, Budgets, Goals, Analytics, Auth
├── services/            # Mock dataset initialization
└── App.jsx              # Routing configurations & protected route setup