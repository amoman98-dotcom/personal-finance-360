import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PieChart, Target, LineChart, WalletCards, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Transactions', path: '/transactions', icon: ReceiptText },
  { name: 'Budgets', path: '/budgets', icon: PieChart },
  { name: 'Savings Goals', path: '/goals', icon: Target },
  { name: 'Spending Insights', path: '/analytics', icon: LineChart },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLight, setIsLight] = useState(false);

  const toggleTheme = () => {
    const nextState = !isLight;
    setIsLight(nextState);

    if (nextState) {
      document.body.style.filter = 'invert(0.92) hue-rotate(180deg)';
      document.body.style.backgroundColor = '#fff';
    } else {
      document.body.style.filter = 'none';
      document.body.style.backgroundColor = '';
    }
  };

  const handleLogout = () => {
    document.body.style.filter = 'none';
    logout();
    navigate('/auth');
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col p-4 border-r border-slate-800">
      <div className="flex items-center justify-between px-2 py-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <WalletCards className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Finance 360</h1>
            <p className="text-xs text-slate-400">Personal Tracker</p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          type="button"
          className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
          title="Toggle Theme"
        >
          {isLight ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
        </button>
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

      <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 mt-auto flex items-center justify-between">
        <div className="overflow-hidden">
          <p className="text-xs font-medium text-slate-400">User</p>
          <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
        </div>
        <button
          onClick={handleLogout}
          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};