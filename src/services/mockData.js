export const initialTransactions = [
  { id: "tx-1", type: "income", title: "Monthly Salary", amount: 25000, category: "Salary", date: "2026-09-01", note: "Direct bank deposit" },
  { id: "tx-2", type: "expense", title: "Supermarket Shopping", amount: 3200, category: "Groceries", date: "2026-09-04", note: "Monthly home supplies" },
  { id: "tx-3", type: "expense", title: "Internet & Electricity", amount: 1100, category: "Utilities", date: "2026-09-07", note: "Online payment" },
  { id: "tx-4", type: "income", title: "Freelance Project", amount: 7500, category: "Freelance", date: "2026-09-12", note: "Initial milestone payment" },
  { id: "tx-5", type: "expense", title: "Dining Out", amount: 950, category: "Dining", date: "2026-09-15", note: "Dinner with friends" },
  { id: "tx-6", type: "expense", title: "Car Maintenance & Fuel", amount: 1400, category: "Transport", date: "2026-09-18", note: "Fuel and oil filter" },
  { id: "tx-7", type: "expense", title: "Online Tech Courses", amount: 1800, category: "Education", date: "2026-09-20", note: "Udemy & Coursera subscriptions" }
];

export const initialBudgets = [
  { id: "b-1", category: "Groceries", limit: 5000 },
  { id: "b-2", category: "Dining", limit: 2000 },
  { id: "b-3", category: "Transport", limit: 2500 },
  { id: "b-4", category: "Utilities", limit: 1500 },
  { id: "b-5", category: "Education", limit: 3000 }
];

export const initialGoals = [
  { id: "g-1", title: "Emergency Fund", targetAmount: 50000, currentAmount: 22000, deadline: "2026-12-31" },
  { id: "g-2", title: "Laptop Upgrade", targetAmount: 35000, currentAmount: 18000, deadline: "2026-11-30" },
  { id: "g-3", title: "Vacation Trip", targetAmount: 15000, currentAmount: 6000, deadline: "2027-01-15" }
];