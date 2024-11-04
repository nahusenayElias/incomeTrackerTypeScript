/**
 * Calculates the net price and VAT amount from a total price and VAT rate.
 * @param totalPrice - The total price including VAT.
 * @param vatRate - The VAT rate as a percentage (e.g., 25.5).
 * @returns An object containing netPrice (excluding VAT) and vatAmount.
 */
export function vatCalc(totalPrice: number, vatRate: number) {
    const netPrice = totalPrice / (1 + vatRate / 100);
    const vatAmount = totalPrice - netPrice;
    return { netPrice, vatAmount };
  }
