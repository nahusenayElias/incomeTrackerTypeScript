import { Income, Expenses, VATRates } from './types';

export const calculateFinances = (income: Income, expenses: Expenses, vatRates: VATRates) => {
  const totalIncome = Object.values(income).reduce((sum, val) => sum + val, 0);
  const grossExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);

  const vatPayable = totalIncome * vatRates.income;

  const vatDeductible = Object.entries(expenses).reduce((sum, [key, value]) => {
    return sum + (value * vatRates[key as keyof VATRates]);
  }, 0);

  const netVatPayable = vatPayable - vatDeductible;
  const netIncome = totalIncome - grossExpenses - netVatPayable;

  return {
    totalIncome,
    grossExpenses,
    vatPayable,
    vatDeductible,
    netVatPayable,
    netIncome
  };
};