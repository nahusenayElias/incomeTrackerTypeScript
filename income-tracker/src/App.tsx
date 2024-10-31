// src/App.tsx

import React, { useState } from "react";
import { Income, Expense } from "./types";
import ExpenseForm from "./components/ExpenseForm";
import IncomeForm from "./components/IncomeForm";

const VAT_ON_INCOME = 10; // VAT rate on income

const App: React.FC = () => {
  const [income, setIncome] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Calculate total income
  const totalIncome = income.reduce((total, inc) => total + inc.amount, 0);

  // Calculate VAT payable from income
  const VATPayable = totalIncome * (VAT_ON_INCOME / 100);

  // Calculate total expenses and deductible VAT
  const totalExpenses = expenses.reduce((total, exp) => total + exp.amount, 0);
  const totalVATDeductible = expenses.reduce(
    (total, exp) => total + (exp.amount * exp.VATRate) / (100 + exp.VATRate),
    0
  );

  // Calculate net income
  const netIncome = totalIncome - totalExpenses - VATPayable + totalVATDeductible;

  // Handlers for adding income and expenses
  const handleAddIncome = (newIncome: Income) => setIncome([...income, newIncome]);
  const handleAddExpense = (newExpense: Expense) => setExpenses([...expenses, newExpense]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Income and Expense Tracker</h1>

      <div className="flex flex-col space-y-4 mb-8">
        <div>
          <h2 className="font-semibold text-xl">Total Income: ${totalIncome.toFixed(2)}</h2>
          <h2 className="font-semibold text-xl">Total Expenses: ${totalExpenses.toFixed(2)}</h2>
          <h2 className="font-semibold text-xl">VAT Payable from Income: ${VATPayable.toFixed(2)}</h2>
          <h2 className="font-semibold text-xl">VAT Deductible from Expenses: ${totalVATDeductible.toFixed(2)}</h2>
          <h2 className="font-semibold text-xl">Net Income: ${netIncome.toFixed(2)}</h2>
        </div>
      </div>

      {/* Render the forms for adding income and expenses */}
      <IncomeForm onAdd={handleAddIncome} />
      <ExpenseForm onAdd={handleAddExpense} />
    </div>
  );
};

export default App;
