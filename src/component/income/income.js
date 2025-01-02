import React, { useState } from "react";
import SingleIncome from "./singleIncome";
import NewIncomeModal from "../modal/newIncome";
import generateRelationId from "../../hooks/generateRelationId";

export default function Income({
  incomeHistory,
  user,
  userNameAndId,
  addIncome,
  addOutcome,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userAmount, setUserAmount] = useState("");

  const groupedIncome = incomeHistory.reduce((acc, income) => {
    if (!acc[income.relatedUserId]) {
      acc[income.relatedUserId] = { ...income, amount: 0 };
    }
    acc[income.relatedUserId].amount += income.amount;
    return acc;
  }, {});

  const groupedIncomeArray = Object.values(groupedIncome);

  // const generateRelationId = (userId, userName) => {
  //   const now = new Date();
  //   const formattedDate = now
  //     .toISOString()
  //     .replace(/[-:.TZ]/g, "") // Remove unwanted characters
  //     .slice(0, 14); // Keep only YYYYMMDDHHMMSS
  //   const sanitizedUserName = userName.toLowerCase().replace(/\s+/g, ""); // Convert to lowercase and remove spaces
  //   return `${formattedDate}${sanitizedUserName}${userId}`;
  // };

  let newInCome = (e) => {
    e.preventDefault();

    if (userName && userId) {
      const newIncome = {
        ioRelatedId: generateRelationId(userId, userName),
        relatedUserId: userId,
        name: userName,
        amount: Number(userAmount),
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
      };

      addIncome(user.id, newIncome);

      const newOutcome = {
        ...newIncome,
        name: user.name,
        relatedUserId: user.id,
        amount: Number(-userAmount),
      };

      addOutcome(userId, newOutcome);

      setUserName("");
      setUserId("");
      setUserAmount("");
      setIsOpen(false);
    }
  };

  let getNameAndId = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const name = selectedOption.text; // Get the text content of the selected option
    const value = selectedOption.value; // Get the value of the selected option

    setUserName(name);
    setUserId(value);
  };

  return (
    <div className="mb-4">
      <h3
        className="text-xl cursor-pointer font-semibold text-green-500"
        title="Click to add new inflow"
        onClick={() => setIsOpen(true)}
      >
        {" "}
        Inflows (+)
      </h3>
      <ul className="list-disc list-inside">
        {groupedIncomeArray.map((income) => (
          <SingleIncome
            key={income.relatedUserId}
            income={income}
            user={user}
            addIncome={addIncome}
            addOutcome={addOutcome}
          />
        ))}
      </ul>
      {isOpen && (
        <NewIncomeModal>
          <>
            {/* Overlay */}
            <div className="fixed inset-0 z-40 bg-black bg-opacity-75"></div>

            {/* Modal Content */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsOpen(false);
                }
              }}
            >
              <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                    <h2 className="text-2xl font-bold mb-4">Add New Inflow</h2>

                    <form onSubmit={newInCome}>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="user"
                        >
                          User
                        </label>
                        <select
                          id="user"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={getNameAndId}
                        >
                          <option>Please Select User</option>
                          {userNameAndId.map((nameAndId) => {
                            if (nameAndId.id != user.id) {
                              return (
                                <option key={nameAndId.id} value={nameAndId.id}>
                                  {nameAndId.name}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="amount"
                        >
                          Amount
                        </label>
                        <input
                          value={userAmount}
                          onChange={(e) => setUserAmount(e.target.value)}
                          id="amount"
                          type="number"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Add
                        </button>
                      </div>
                    </form>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </NewIncomeModal>
      )}
    </div>
  );
}
