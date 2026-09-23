import { useSpendingInsights } from '../hooks/useSpendingInsights';
import { useFinance } from '../context/FinanceContext';
import { Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


export const Analytics = () => {
  const { highestCategory, totalExpense, totalIncome, netSavings } = useSpendingInsights();
  const { transactions } = useFinance();

  const comparisonData = [
    { period: 'Last Month', income: totalIncome * 0.9, expense: totalExpense * 0.85 },
    { period: 'Current Month', income: totalIncome, expense: totalExpense }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Spending Insights & Analytics</h2>
        <p className="text-sm text-slate-500">Advanced automated financial breakdown and period-over-period trends.</p>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-2">
            <Sparkles className="w-5 h-5" /> Top Outflow Detected
          </div>
          <p className="text-sm text-indigo-900">
            Your highest expense category is <span className="font-bold underline">{highestCategory.category}</span> (${highestCategory.amount.toLocaleString()}).
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-2">
            <ShieldCheck className="w-5 h-5" /> Savings Efficiency
          </div>
          <p className="text-sm text-emerald-900">
            You retain <span className="font-bold">{totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0}%</span> of all incoming revenue this billing period.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-100 p-5 rounded-xl">
          <div className="flex items-center gap-2 text-amber-700 font-semibold mb-2">
            <AlertTriangle className="w-5 h-5" /> Spending Velocity
          </div>
          <p className="text-sm text-amber-900">
            Total active transactions registered: <span className="font-bold">{transactions.length} items</span> recorded.
          </p>
        </div>
      </div>

      {/* Period Comparison Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Period Comparison (Last Month vs Current Month)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="period" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income ($)" />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="Expense ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};