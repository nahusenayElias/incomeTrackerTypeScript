export interface Income {
    id: string;
    source: "incA" | "incB" | "incC" | "incD";
    amount: number;
    date: Date;
  }

  export type ExpenseCategory =

      | "income"
      | "commission"
      | "VAT"
      | "fuel"
      | "maintenance"
      | "meal"
      | "telephone"
      | "miscellaneous"
      | "roadTax"
      | "insurance"
      | "pension";

      export interface Expense {
        id: string;
        category: ExpenseCategory;
        amount: number;
        VATRate: number; // VAT rate for this expense
        date: Date;
      }

      // Define VAT rates
      export const VAT_RATES: Record<ExpenseCategory, number> = {
        fuel: 25.5,
        maintenance: 25.5,
        telephone: 0,
        roadTax: 0,
        pension: 0,
        insurance: 0,
        miscellaneous: 14,
        commission: 0,
      };
