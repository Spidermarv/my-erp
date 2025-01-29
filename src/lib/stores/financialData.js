import { writable } from "svelte/store";


export const financialData = writable({
  revenue: 0,
  expenses: 0,
  profit: 0,
  transactions: [],
  financialGoal: {
    target: 0,
    deadline: "",
    strategies: []
  }
});


export function addTransaction(type, amount, category, date) {
  financialData.update((data) => {
    if (type === "income") data.revenue += amount;
    else if (type === "expense") data.expenses += amount;
    
    data.profit = data.revenue - data.expenses;
    
    data.transactions.push({ type, amount, category, date });
    
    return data;
  });
}


export function setFinancialGoal(target, deadline) {
  financialData.update((data) => {
    data.financialGoal = { target, deadline, strategies: [] };
    return data;
  });
}
