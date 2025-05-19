import React, { useState, useEffect } from "react";
import { Income } from "../types";
import { v4 as uuidv4 } from "uuid";

interface IncomeFormProps {
  onAdd: (income: Income) => void;
  onEdit?: (income: Income) => void;
  existingIncome?: Income | null;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onAdd, onEdit, existingIncome }) => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState<Income["source"]>("incA");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (existingIncome) {
      setAmount(existingIncome.amount.toString());
      setSource(existingIncome.source);
      setDate(existingIncome.date.toISOString().split("T")[0]);
    }
  }, [existingIncome]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeData = {
      id: existingIncome?.id || uuidv4(),
      source,
      amount: parseFloat(amount),
      date: new Date(date),
    };

    if (existingIncome && onEdit) {
      onEdit(incomeData);
    } else {
      onAdd(incomeData);
    }

    if (!existingIncome) {
      setAmount("");
      setSource("incA");
      setDate(new Date().toISOString().split("T")[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
      <select
        value={source}
        onChange={(e) => setSource(e.target.value as Income["source"])}
        className="border p-2"
      >
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
        step="0.01"
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {existingIncome ? "Update Income" : "Add Income"}
      </button>
    </form>
  );
};

export default IncomeForm;