
import { writable } from "svelte/store";

export const financialData = writable({
  revenue: 0,
  expenses: 0,
  profit: 0,
  cashFlow: 0,
  transactions: [],
  financialHealth: {
    score: 0,
    metrics: {},
    lastUpdated: ""
  },
  financialGoal: {
    target: 0,
    deadline: "",
    progress: 0,
    strategies: []
  },
  budgets: {
    monthly: {},
    quarterly: {},
    annual: {}
  },
  taxes: {
    vat: 0,
    gst: 0,
    corporate: 0
  },
  documents: [],
  currencies: {
    base: "MWK",
    rates: {}
  }
});

export function addTransaction(type, amount, category, date, currency = "MWK") {
  financialData.update((data) => {
    const amountInBase = convertCurrency(amount, currency, data.currencies.base);
    
    if (type === "income") {
      data.revenue += amountInBase;
      data.cashFlow += amountInBase;
    } else if (type === "expense") {
      data.expenses += amountInBase;
      data.cashFlow -= amountInBase;
    }
    
    data.profit = data.revenue - data.expenses;
    data.transactions.push({ 
      type, 
      amount, 
      amountInBase,
      category, 
      date,
      currency 
    });
    
    updateFinancialHealth(data);
    return data;
  });
}

export function setFinancialGoal(target, deadline, strategies = []) {
  financialData.update((data) => {
    data.financialGoal = { 
      target, 
      deadline, 
      progress: (data.profit / target) * 100,
      strategies 
    };
    return data;
  });
}

export function addDocument(title, type, content, date) {
  financialData.update((data) => {
    data.documents.push({
      id: crypto.randomUUID(),
      title,
      type,
      content,
      date,
      lastModified: new Date().toISOString()
    });
    return data;
  });
}

function updateFinancialHealth(data) {
  const metrics = calculateFinancialMetrics(data);
  data.financialHealth = {
    score: calculateHealthScore(metrics),
    metrics,
    lastUpdated: new Date().toISOString()
  };
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
  // Basic growth calculation - can be enhanced with more sophisticated logic
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

function convertCurrency(amount, from, to) {
  // Placeholder for currency conversion - can be enhanced with real exchange rates
  return amount; // Currently returning same amount - would need exchange rate integration
}
