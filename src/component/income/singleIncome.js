import React, { useEffect, useState } from "react";
import generateRelationId from "../../hooks/generateRelationId";

export default function SingleIncome({ income, user, addIncome, addOutcome }) {
  let [showForm, setShowForm] = useState(false);
  let [addIncomeAmount, setAddIncomeAmount] = useState("");
  // let [currentAmount, setCurrentAmount] = useState(income.amount);

  const addIncomeForm = async (e) => {
    e.preventDefault();

    if (addIncomeAmount) {
      const newIncome = {
        ...income,
        ioRelatedId: generateRelationId(income.relatedUserId, income.name),
        amount: Number(addIncomeAmount),
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      addIncome(user.id, newIncome);

      const newOutcome = {
        ...newIncome,
        name: user.name,
        relatedUserId: user.id,
        amount: Number(-addIncomeAmount),
      };

      addOutcome(income.relatedUserId, newOutcome);

      // setCurrentAmount(
      //   (prevAmount) => Number(prevAmount) + Number(addIncomeAmount)
      // );
    }
    setShowForm(false);
    setAddIncomeAmount("");
  };

  return (
    <li className="flex justify-between p-2 border-b border-gray-300 w-full">
      {!showForm && (
        <>
          <span className="font-bold text-lg">{income.name}</span>
          <span
            onDoubleClick={() => setShowForm(true)}
            className="text-green-500 cursor-pointer hover:text-green-700 transition duration-300"
            title="Double click to add inflows"
          >
            {income.amount} MMK
          </span>
        </>
      )}

      {showForm && (
        <form
          className="flex items-center space-x-2 w-full"
          onSubmit={addIncomeForm}
        >
          <input
            type="number"
            value={addIncomeAmount}
            onChange={(e) => setAddIncomeAmount(e.target.value)}
            placeholder="Enter Income Amount"
            className="border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
            autoFocus
          ></input>
        </form>
      )}
    </li>
  );
}
