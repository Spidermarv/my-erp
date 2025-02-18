import { writable } from 'svelte/store';

const createFinancialStore = () => {
  const { subscribe, set, update } = writable({
    profit: 0,
    revenue: 0,
    expenses: 0,
    cashFlow: 0,
    transactions: [],
    financialHealth: {
      score: 0,
      metrics: {},
      lastUpdated: new Date().toISOString()
    }
  });

  function updateFinancialHealth(data) {
    const metrics = calculateFinancialMetrics(data);
    const newData = {
      ...data,
      financialHealth: {
        score: calculateHealthScore(metrics),
        metrics,
        lastUpdated: new Date().toISOString()
      }
    };
    set(newData);
    return newData;
  }

  function calculateFinancialMetrics(data) {
    return {
      profitMargin: (data.profit / data.revenue) * 100 || 0,
      cashFlowRatio: (data.cashFlow / data.expenses) || 0,
      revenueGrowth: calculateRevenueGrowth(data.transactions),
      expenseRatio: (data.expenses / data.revenue) * 100 || 0
    };
  }

  function calculateHealthScore(metrics) {
    const weights = {
      profitMargin: 0.4,
      cashFlowRatio: 0.3,
      revenueGrowth: 0.2,
      expenseRatio: 0.1
    };

    return Object.entries(metrics).reduce((score, [key, value]) => {
      return score + (value * weights[key]);
    }, 0);
  }

  function calculateRevenueGrowth(transactions) {
    if (transactions.length < 2) return 0;

    const recentRevenue = transactions
      .filter(t => t.type === "income")
      .slice(-10)
      .reduce((sum, t) => sum + t.amountInBase, 0);

    const previousRevenue = transactions
      .filter(t => t.type === "income")
      .slice(-20, -10)
      .reduce((sum, t) => sum + t.amountInBase, 0);

    return previousRevenue ? ((recentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
  }

  return {
    subscribe,
    update,
    updateFinancialHealth
  };
};

export const financialData = createFinancialStore();