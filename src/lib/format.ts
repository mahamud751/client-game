export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function statusLabel(status: string): string {
  switch (status) {
    case "in-stock":
      return "In Stock";
    case "pre-order":
      return "Pre-Order";
    case "backorder":
      return "Backorder";
    case "sold-out":
      return "Sold Out";
    default:
      return status;
  }
}
