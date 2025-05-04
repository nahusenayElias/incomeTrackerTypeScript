import React, { useState } from "react";
import { Income, Expense } from "./types";
import IncomeForm from "./components/IncomeForm";
import ExpenseForm from "./components/ExpenseForm";
import { vatCalc } from "./components/ExpenseForm";
import logo from "./assets/2.png";

const VAT_RATE = 14; // Adjust this based on your income VAT rate

const App: React.FC = () => {
  const [income, setIncome] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Calculate total income
  const totalIncome = income.reduce((total, inc) => total + inc.amount, 0);

  // Extract VAT from gross income
  const VATPayable = totalIncome - (totalIncome / (1 + VAT_RATE / 100));

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, exp) => total + exp.amount, 0);

  // Deductible VAT (extract per expense)
  const totalVATDeductible = expenses.reduce((total, exp) => {
    if (exp.VATRate === 0) return total;
    const vat = exp.amount - exp.amount / (1 + exp.VATRate / 100);
    return total + vat;
  }, 0);

  const netIncome = totalIncome - totalExpenses - VATPayable + totalVATDeductible;

  const handleAddIncome = (newIncome: Income) => setIncome([...income, newIncome]);
  const handleAddExpense = (newExpense: Expense) => setExpenses([...expenses, newExpense]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
    <div className="max-w-6xl mx-auto">
      {/* Logo & Header Section */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <img
          src={logo}
          alt="Company Logo"
          className="h-24 w-24 rounded-lg bg-white p-1 shadow-sm"
        />
        <h1 className="text-3xl font-bold text-gray-800">
          Income and Expense Tracker
        </h1>
      </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Income</h3>
            <p className="text-2xl font-semibold text-green-600">€{totalIncome.toFixed(2)}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Expenses</h3>
            <p className="text-2xl font-semibold text-red-600">€{totalExpenses.toFixed(2)}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">VAT Payable</h3>
            <p className="text-2xl font-semibold text-purple-600">€{VATPayable.toFixed(2)}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">VAT Deductible</h3>
            <p className="text-2xl font-semibold text-blue-600">€{totalVATDeductible.toFixed(2)}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 col-span-full lg:col-span-1">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Net Income</h3>
            <p className="text-2xl font-semibold text-gray-900">€{netIncome.toFixed(2)}</p>
          </div>
        </div>

        {/* Forms Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Income</h2>
            <IncomeForm onAdd={handleAddIncome} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Expense</h2>
            <ExpenseForm onAdd={handleAddExpense} />
          </div>
        </div>

        {/* Expenses Table */}
        {expenses.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Expense Receipts</h2>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Date', 'Category', 'Total (€)', 'VAT %', 'VAT (€)', 'Net (€)'].map((header) => (
                      <th key={header} className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expenses.map((exp) => {
                    const { vatAmount, netPrice } = vatCalc(exp.amount, exp.VATRate);
                    return (
                      <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-700">{exp.date.toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 capitalize">{exp.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">{exp.amount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{exp.VATRate}%</td>
                        <td className="px-4 py-3 text-sm text-blue-600 font-medium">{vatAmount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">{netPrice.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      </div>
  );
};

export default App;