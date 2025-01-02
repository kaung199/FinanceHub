import React from "react";

export default function SingleOutcome({ outcome }) {
  return (
    <li className="flex justify-between p-2 border-b border-gray-300">
      <span>{outcome.name}</span>
      <span className="text-red-500">{outcome.amount} MMK</span>
    </li>
  );
}
