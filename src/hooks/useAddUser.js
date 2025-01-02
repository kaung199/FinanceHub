import { useState, useEffect, useRef } from "react";

const useCreateUser = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(new AbortController());

  // Main function to add income history
  const addUser = async (newUser) => {
    const signal = controllerRef.current.signal; // Use the signal from the controllerRef
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
        signal,
      });
      if (!response.ok) throw new Error("Failed to add user data");

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

  return { addUser, loading, error };
};

export default useCreateUser;
