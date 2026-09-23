import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PieChart, Target, WalletCards } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Transactions', path: '/transactions', icon: ReceiptText },
  { name: 'Budgets', path: '/budgets', icon: PieChart },
  { name: 'Savings Goals', path: '/goals', icon: Target },
];

export const Navbar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col p-4 border-r border-slate-800">
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <WalletCards className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">Finance 360</h1>
          <p className="text-xs text-slate-400">Personal Tracker</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 mt-auto">
        <p className="text-xs font-medium text-slate-300">Logged in as</p>
        <p className="text-sm font-semibold text-white truncate">User Account</p>
      </div>
    </aside>
  );
};