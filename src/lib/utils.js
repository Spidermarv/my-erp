export function formatCurrency(amount, currency = "MWK") {
    return new Intl.NumberFormat("en-MW", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }
  