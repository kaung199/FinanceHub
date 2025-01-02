import { useState, useEffect, useRef } from "react";

const useOutcomeHistory = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(new AbortController()); // Use `useRef` for consistent reference

  // Fetch user data with signal
  const fetchUserData = async (userId, signal) => {
    const response = await fetch(`${url}${userId}`, { signal });
    if (!response.ok) throw new Error("Failed to fetch user data");
    return response.json();
  };

  // Update user data with new outcome history
  const updateUserData = async (userId, updatedOutcomeHistory, signal) => {
    const response = await fetch(`${url}${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ outcomeHistory: updatedOutcomeHistory }),
      signal,
    });
    if (!response.ok) throw new Error("Failed to update user data");
  };

  // Main function to add outcome history
  const addOutcomeHistory = async (userId, newOutcome) => {
    const signal = controllerRef.current.signal; // Use the signal from the controllerRef
    setLoading(true);
    setError(null);

    try {
      const userData = await fetchUserData(userId, signal);
      const updatedOutcomeHistory = [...userData.outcomeHistory, newOutcome];
      await updateUserData(userId, updatedOutcomeHistory, signal);
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

  return { addOutcomeHistory, loading, error };
};

export default useOutcomeHistory;
