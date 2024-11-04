// src/components/ExpenseForm.tsx

import React, { useState } from "react";
import { Expense, ExpenseCategory, VAT_RATES } from "../types";
import { v4 as uuidv4 } from "uuid";

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("fuel");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const VATRate = VAT_RATES[category];
    onAdd({
      id: uuidv4(),
      category,
      amount: parseFloat(amount),
      VATRate,
      date: new Date(),
    });
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <select value={category}
      onChange={(e) => setCategory(e.target.value as ExpenseCategory)} className="border p-2">
        <option value="fuel">Fuel</option>
        <option value="maintenance">Maintenance</option>
        <option value="telephone">Telephone</option>
        <option value="roadTax">Road Tax</option>
        <option value="pension">Pension</option>
        <option value="insurance">Insurance</option>
        <option value="miscellaneous">Miscellaneous</option>
        <option value="commission">Commission</option>

      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
