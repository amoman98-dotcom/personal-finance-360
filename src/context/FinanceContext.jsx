import { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions, initialBudgets, initialGoals } from '../services/mockData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('pf360_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('pf360_budgets');
    return saved ? JSON.parse(saved) : initialBudgets;
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('pf360_goals');
    return saved ? JSON.parse(saved) : initialGoals;
  });

  useEffect(() => {
    localStorage.setItem('pf360_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('pf360_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('pf360_goals', JSON.stringify(goals));
  }, [goals]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [{ ...tx, id: `tx-${Date.now()}` }, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const addOrUpdateBudget = (budget) => {
    setBudgets((prev) => {
      const exists = prev.find((b) => b.category === budget.category);
      if (exists) {
        return prev.map((b) => (b.category === budget.category ? { ...b, limit: Number(budget.limit) } : b));
      }
      return [...prev, { id: `b-${Date.now()}`, ...budget, limit: Number(budget.limit) }];
    });
  };

  const addGoal = (goal) => {
    setGoals((prev) => [...prev, { ...goal, id: `g-${Date.now()}` }]);
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        goals,
        addTransaction,
        deleteTransaction,
        addOrUpdateBudget,
        addGoal
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFinance = () => useContext(FinanceContext);