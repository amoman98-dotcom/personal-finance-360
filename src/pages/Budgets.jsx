import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { useSpendingInsights } from '../hooks/useSpendingInsights';
import { Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Budgets = () => {
  const { addOrUpdateBudget } = useFinance();
  const { budgetComparison } = useSpendingInsights();
  const [category, setCategory] = useState('Groceries');
  const [limit, setLimit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!limit) return;
    addOrUpdateBudget({ category, limit: parseFloat(limit) });
    setLimit('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Monthly Budgets</h2>
        <p className="text-sm text-slate-500">Set spending thresholds and monitor your limits across categories.</p>
      </div>

      {/* Set Budget Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="text-base font-semibold text-slate-900 mb-3">Set / Update Category Budget</h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Groceries">Groceries</option>
            <option value="Dining">Dining</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            min="1"
            required
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Monthly Limit ($)"
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" /> Save Budget
          </button>
        </form>
      </div>

      {/* Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgetComparison.map((b) => (
          <div key={b.category} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">{b.category}</span>
              {b.isOverBudget ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  <AlertCircle className="w-3.5 h-3.5" /> Exceeded
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> On Track
                </span>
              )}
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Spent: ${b.spent.toLocaleString()}</span>
                <span>Limit: ${b.limit.toLocaleString()}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    b.isOverBudget ? 'bg-rose-500' : b.percentage > 80 ? 'bg-amber-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${b.percentage}%` }}
                />
              </div>
            </div>

            <div className="text-right text-xs font-medium text-slate-400">
              {b.percentage}% utilized
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};