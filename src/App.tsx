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
  const handleAddIncome = (newIncome: Income) => setIncome([...income, newIncome]);

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
          {/* ... Keep the same stats grid as before ... */}
        </div>

        {/* Forms Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Income</h2>
            <IncomeForm onAdd={handleAddIncome} />
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

        {/* Expenses Table */}
        {expenses.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
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