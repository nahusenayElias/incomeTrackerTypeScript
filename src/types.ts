export interface Income {
    id: string;
    source: "incA" | "incB" | "incC" | "incD";
    amount: number;
    date: Date;
  }

  export type ExpenseCategory =
  | "fuel"
  | "maintenance"
  | "meal"
  | "CarWash"
  | "telephone"
  | "miscellaneous"
  | "roadTax"
  | "insurance"
  | "pension"
  | "parking"
  | "commission";


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
        parking: 25.5,
        CarWash: 25.5,
        meal: 14,
        insurance: 0,
        miscellaneous: 25.5,
        commission: 0,
      };
