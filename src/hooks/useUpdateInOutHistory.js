import { useState, useRef, useEffect } from "react";

const useUpdateInOutHistory = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(new AbortController());

  const updateHistory = async (userId, ioRelatedId, newAmount, historyType) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch user data
      const response = await fetch(`${url}${userId}`, {
        signal: controllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user with ID ${userId}`);
      }

      const user = await response.json();

      // Update the specified history type
      const updatedHistory = user[historyType].map((entry) => {
        if (entry.ioRelatedId === ioRelatedId) {
          return { ...entry, amount: Number(newAmount) };
        }
        return entry;
      });

      // Send the updated history back to the server
      const updateResponse = await fetch(`${url}${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [historyType]: updatedHistory }),
        signal: controllerRef.current.signal,
      });

      if (!updateResponse.ok) {
        throw new Error(`Failed to update ${historyType} for user ${userId}`);
      }

      setLoading(false);
      return updatedHistory; // Return updated data for further use
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = controllerRef.current; // Store reference for cleanup
    return () => {
      controller.abort(); // Cleanup on component unmount
    };
  }, []);

  return {
    updateIncomeHistory: (userId, ioRelatedId, newAmount) =>
      updateHistory(userId, ioRelatedId, newAmount, "incomeHistory"),
    updateOutcomeHistory: (userId, ioRelatedId, newAmount) =>
      updateHistory(userId, ioRelatedId, newAmount, "outcomeHistory"),
    loading,
    error,
  };
};

export default useUpdateInOutHistory;
