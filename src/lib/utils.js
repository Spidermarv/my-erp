export function formatCurrency(amount, currency = "MWK") {
    return new Intl.NumberFormat("en-MW", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }
  
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

export function calculatePercentageChange(oldValue, newValue) {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}
