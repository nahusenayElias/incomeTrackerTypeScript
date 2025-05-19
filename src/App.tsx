import React, { useState } from "react";
import { Income, Expense } from "./types";
import IncomeForm from "./components/IncomeForm";
import ExpenseForm from "./components/ExpenseForm";
import { vatCalc } from "./components/ExpenseForm";
import logo from "./assets/2.png";

const VAT_RATE = 14;

const App: React.FC = () => {
  const [income, setIncome] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Calculate totals
  const totalIncome = income.reduce((total, inc) => total + inc.amount, 0);
  const VATPayable = totalIncome - totalIncome / (1 + VAT_RATE / 100);
  const totalExpenses = expenses.reduce((total, exp) => total + exp.amount, 0);
  const totalVATDeductible = expenses.reduce((total, exp) => {
    if (exp.VATRate === 0) return total;
    const vat = exp.amount - exp.amount / (1 + exp.VATRate / 100);
    return total + vat;
  }, 0);
  const netIncome = totalIncome - totalExpenses - VATPayable + totalVATDeductible;

  // Income handlers
  const handleAddIncome = (newIncome: Income) => {
    setIncome([...income, newIncome]);
    setEditingIncome(null);
  };

  const handleEditIncome = (updatedIncome: Income) => {
    setIncome(income.map(inc =>
      inc.id === updatedIncome.id ? updatedIncome : inc
    ));
    setEditingIncome(null);
  };

  const handleDeleteIncome = (incomeId: string) => {
    setIncome(income.filter(inc => inc.id !== incomeId));
  };

  // Expense handlers
  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]);
    setEditingExpense(null);
  };

  const handleEditExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(exp =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    ));
    setEditingExpense(null);
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter(exp => exp.id !== expenseId));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {editingIncome ? "Edit Income" : "Add Income"}
            </h2>
            <IncomeForm
              onAdd={handleAddIncome}
              onEdit={handleEditIncome}
              existingIncome={editingIncome}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {editingExpense ? "Edit Expense" : "Add Expense"}
            </h2>
            <ExpenseForm
              onAdd={handleAddExpense}
              onEdit={handleEditExpense}
              existingExpense={editingExpense}
            />
          </div>
        </div>

        {/* Income Table */}
        {income.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Income Records</h2>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Date', 'Source', 'Amount (€)', 'Actions'].map((header) => (
                      <th key={header} className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {income.map((inc) => (
                    <tr key={inc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {inc.date.toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                        {inc.source}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                        {inc.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 space-x-2">
                        <button
                          onClick={() => setEditingIncome(inc)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteIncome(inc.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Expenses Table */}
        {expenses.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Expense Receipts</h2>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Date', 'Category', 'Total (€)', 'VAT %', 'VAT (€)', 'Net (€)', 'Actions'].map((header) => (
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
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {exp.date.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                          {exp.category}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                          {exp.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {exp.VATRate.toFixed(2)}%
                        </td>
                        <td className="px-4 py-3 text-sm text-blue-600 font-medium">
                          {vatAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                          {netPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 space-x-2">
                          <button
                            onClick={() => setEditingExpense(exp)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(exp.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
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