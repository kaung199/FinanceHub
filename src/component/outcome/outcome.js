import React from "react";
import SingleOutcome from "./singleOutcome";

export default function Outcome({ outcomeHistory }) {
  const groupedOutcome = outcomeHistory.reduce((acc, outcome) => {
    if (!acc[outcome.relatedUserId]) {
      acc[outcome.relatedUserId] = { ...outcome, amount: 0 };
    }
    acc[outcome.relatedUserId].amount += outcome.amount;
    return acc;
  }, {});

  const groupedOutcomeArray = Object.values(groupedOutcome);

  return (
    <div>
      <h3 className="text-xl font-semibold text-red-500">Outflows (-)</h3>
      <ul className="list-disc list-inside">
        {groupedOutcomeArray.map((outcome) => (
          <SingleOutcome outcome={outcome} key={outcome.relatedUserId} />
        ))}
      </ul>
    </div>
  );
}
