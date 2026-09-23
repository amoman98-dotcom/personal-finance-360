import { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';

export const useSpendingInsights = () => {
  const { transactions, budgets, goals } = useFinance();

  return useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const netSavings = totalIncome - totalExpense;

    const expensesByCategory = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
        return acc;
      }, {});

    let highestCategory = { category: 'None', amount: 0 };
    Object.entries(expensesByCategory).forEach(([category, amount]) => {
      if (amount > highestCategory.amount) {
        highestCategory = { category, amount };
      }
    });

    const categoryDataForChart = Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value
    }));

    const budgetComparison = budgets.map((b) => {
      const spent = expensesByCategory[b.category] || 0;
      const percentage = Math.min(Math.round((spent / b.limit) * 100), 100);
      return {
        category: b.category,
        limit: b.limit,
        spent,
        percentage,
        isOverBudget: spent > b.limit
      };
    });

    const totalBudgetLimit = budgets.reduce((acc, b) => acc + Number(b.limit), 0);
    const overallBudgetUsage = totalBudgetLimit > 0 
      ? Math.round((totalExpense / totalBudgetLimit) * 100) 
      : 0;

    const goalsProgress = goals.map((g) => ({
      ...g,
      percentage: Math.min(Math.round((g.currentAmount / g.targetAmount) * 100), 100)
    }));

    return {
      totalIncome,
      totalExpense,
      netSavings,
      highestCategory,
      categoryDataForChart,
      budgetComparison,
      overallBudgetUsage,
      goalsProgress
    };
  }, [transactions, budgets, goals]);
};