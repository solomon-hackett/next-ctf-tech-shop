export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });
};
