// src/components/IncomeForm.tsx

import React, { useState } from "react";
import { Income } from "../types";
import { v4 as uuidv4 } from "uuid";

interface IncomeFormProps {
  onAdd: (income: Income) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("incA");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ id: uuidv4(), source: source as Income["source"], amount: parseFloat(amount), date: new Date() });
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <select value={source} onChange={(e) => setSource(e.target.value)} className="border p-2">
        <option value="incA">Income A</option>
        <option value="incB">Income B</option>
        <option value="incC">Income C</option>
        <option value="incD">Income D</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Income</button>
    </form>
  );
};

export default IncomeForm;
