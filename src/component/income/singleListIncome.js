import React, { useState } from "react";

export default function SingleListIncome({
  user,
  item,
  handleUpdateIncome,
  handleUpdateOutcome,
}) {
  const [inflowEdit, setInflowEdit] = useState(false);
  const [newInflowAmount, setNewInflowAmount] = useState("");

  let updateInComeAndOotcome = (e, ioRelatedId) => {
    e.preventDefault();
    if (newInflowAmount) {
      handleUpdateIncome(user.id, ioRelatedId, Number(newInflowAmount));
      handleUpdateOutcome(
        item.relatedUserId,
        ioRelatedId,
        Number(-newInflowAmount)
      );
    }

    setInflowEdit(false);
    setNewInflowAmount("");
  };
  return (
    <>
      {!inflowEdit && (
        <td
          className="px-6 py-3 text-green-500 cursor-pointer hover:text-yellow-700 transition duration-300 text-right"
          onDoubleClick={(e) => setInflowEdit(true)}
        >
          {item.amount} MMK
        </td>
      )}
      {inflowEdit && (
        <td className="px-6 py-3 text-right">
          <form onSubmit={(e) => updateInComeAndOotcome(e, item.ioRelatedId)}>
            <input
              type="number"
              value={newInflowAmount}
              onChange={(e) => setNewInflowAmount(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              autoFocus
            />
          </form>
        </td>
      )}
    </>
  );
}
