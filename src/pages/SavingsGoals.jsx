import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { useSpendingInsights } from '../hooks/useSpendingInsights';
import { Plus, Target, DollarSign } from 'lucide-react';

export const SavingsGoals = () => {
  const { addGoal, updateGoalAmount } = useFinance();
  const { goalsProgress } = useSpendingInsights();

  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!title || !targetAmount) return;

    addGoal({
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline: deadline || '2026-12-31'
    });

    setTitle('');
    setTargetAmount('');
    setDeadline('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Savings Goals</h2>
        <p className="text-sm text-slate-500">Plan long-term financial targets and monitor milestone progress.</p>
      </div>

      {/* Create New Goal Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="text-base font-semibold text-slate-900 mb-3">Add Savings Goal</h3>
        <form onSubmit={handleCreateGoal} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Goal Title (e.g. New Car)"
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            min="1"
            required
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="Target Amount ($)"
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </form>
      </div>

      {/* Goals Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {goalsProgress.map((g) => (
          <div key={g.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <Target className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-slate-900">{g.title}</h4>
                </div>
                <span className="text-xs text-slate-400">Due {g.deadline}</span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>${Number(g.currentAmount).toLocaleString()}</span>
                  <span>${Number(g.targetAmount).toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${g.percentage}%` }}
                  />
                </div>
                <p className="text-right text-xs font-semibold text-emerald-600 mt-1">{g.percentage}% reached</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateGoalAmount(g.id, 500)}
                className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-medium py-1.5 px-2 bg-slate-50 hover:bg-indigo-50 text-indigo-600 rounded-lg border border-slate-200 transition-colors"
              >
                <DollarSign className="w-3.5 h-3.5" /> +$500 Deposit
              </button>
              <button
                type="button"
                onClick={() => updateGoalAmount(g.id, 1000)}
                className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-medium py-1.5 px-2 bg-slate-50 hover:bg-indigo-50 text-indigo-600 rounded-lg border border-slate-200 transition-colors"
              >
                <DollarSign className="w-3.5 h-3.5" /> +$1,000 Deposit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};