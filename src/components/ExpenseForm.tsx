import React, { useState } from "react";
import { Expense, ExpenseCategory, VAT_RATES } from "../types";
import { v4 as uuidv4 } from "uuid";

export function vatCalc(totalPrice: number, vatRate: number) {
  const netPrice = totalPrice / (1 + vatRate / 100);
  const vatAmount = totalPrice - netPrice;
  return { netPrice, vatAmount };
}

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("fuel");
  const [customVAT, setCustomVAT] = useState("");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]); // default to current date

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const defaultRate = VAT_RATES[category];
    const totalAmount = parseFloat(amount);
let finalVATRate = defaultRate;

if (category === "telephone") {
  const vatEuro = parseFloat(customVAT || "0");
  if (totalAmount > 0 && !isNaN(vatEuro)) {
    finalVATRate = (vatEuro / totalAmount) * 100;
  }
}


    onAdd({
      id: uuidv4(),
      category,
      amount: parseFloat(amount),
      VATRate: finalVATRate,
      date: new Date(date), // use the selected date
    });

    setAmount("");
    setCustomVAT("");
    setDate(new Date().toISOString().split("T")[0]); // reset date to current date after submission
  };

  const isCustomVAT = category === "telephone";

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
        className="border p-2"
      >
        <option value="fuel">Fuel</option>
        <option value="CarWash">CarWash</option>
        <option value="maintenance">Maintenance</option>
        <option value="telephone">Telephone</option>
        <option value="roadTax">Road Tax</option>
        <option value="pension">Pension</option>
        <option value="meal">Meal</option>
        <option value="insurance">Insurance</option>
        <option value="miscellaneous">Miscellaneous</option>
        <option value="commission">Commission</option>
      </select>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (€)"
        className="border p-2"
        required
      />

      {isCustomVAT && (
        <input
          type="number"
          value={customVAT}
          onChange={(e) => setCustomVAT(e.target.value)}
          placeholder="Custom VAT (%)"
          className="border p-2"
          required
        />
      )}

      {/* Date Input */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2"
      />

      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
