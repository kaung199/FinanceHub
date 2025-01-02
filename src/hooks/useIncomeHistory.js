import { useState, useEffect, useRef } from "react";

const useIncomeHistory = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(new AbortController()); // Use `useRef` for consistent reference

  // Fetch user data with signal
  const fetchUserData = async (userId, signal) => {
    const response = await fetch(`${url}${userId}`, { signal });
    if (!response.ok) throw new Error("Failed to fetch user data");
    return response.json();
  };

  // Update user data with new income history
  const updateUserData = async (userId, updatedIncomeHistory, signal) => {
    const response = await fetch(`${url}${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ incomeHistory: updatedIncomeHistory }),
      signal,
    });
    if (!response.ok) throw new Error("Failed to update user data");
  };

  // Main function to add income history
  const addIncomeHistory = async (userId, newIncome) => {
    const signal = controllerRef.current.signal; // Use the signal from the controllerRef
    setLoading(true);
    setError(null);

    try {
      const userData = await fetchUserData(userId, signal);
      const updatedIncomeHistory = [...userData.incomeHistory, newIncome];
      await updateUserData(userId, updatedIncomeHistory, signal);
      return { success: true };
    } catch (err) {
      console.error(err);
      if (err.name !== "AbortError") {
        setError(err.message);
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    const controller = controllerRef.current; // Store reference for cleanup
    return () => {
      controller.abort();
    };
  }, []);

  return { addIncomeHistory, loading, error };
};

export default useIncomeHistory;
