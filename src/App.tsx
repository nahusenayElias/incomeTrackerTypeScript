import React, { useState } from 'react';
import { Income, Expenses, VATRates } from './types';
import { calculateFinances } from './utils';

const initialIncome: Income = { incA: 0, incB: 0, incC: 0, incD: 0 };
const initialExpenses: Expenses = {
  commission: 0, fuel: 0, maintenance: 0, meal: 0, telephone: 0,
  miscellaneous: 0, roadTax: 0, insurance: 0, pension: 0
};
const vatRates: VATRates = {
  income: 0.10, fuel: 0.255, maintenance: 0.255, meal: 0.14,
  telephone: 0, miscellaneous: 0, roadTax: 0, insurance: 0, pension: 0
};

function App() {
  const [income, setIncome] = useState<Income>(initialIncome);
  const [expenses, setExpenses] = useState<Expenses>(initialExpenses);
  const [results, setResults] = useState<ReturnType<typeof calculateFinances> | null>(null);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome({ ...income, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenses({ ...expenses, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(calculateFinances(income, expenses, vatRates));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Income and Expense Tracker</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Income</h2>
            {Object.keys(income).map((key) => (
              <div key={key} className="mb-2">
                <label className="block">{key}</label>
                <input
                  type="number"
                  name={key}
                  value={income[key as keyof Income]}
                  onChange={handleIncomeChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Expenses</h2>
            {Object.keys(expenses).map((key) => (
              <div key={key} className="mb-2">
                <label className="block">{key}</label>
                <input
                  type="number"
                  name={key}
                  value={expenses[key as keyof Expenses]}
                  onChange={handleExpenseChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Calculate
        </button>
      </form>
      {results && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <p>Total Income: {results.totalIncome.toFixed(2)}</p>
          <p>Gross Expenses: {results.grossExpenses.toFixed(2)}</p>
          <p>VAT Payable: {results.vatPayable.toFixed(2)}</p>
          <p>VAT Deductible: {results.vatDeductible.toFixed(2)}</p>
          <p>Net VAT Payable: {results.netVatPayable.toFixed(2)}</p>
          <p>Net Income: {results.netIncome.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;