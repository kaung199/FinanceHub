import { useState, useEffect, useRef } from "react";

const useDeleteUser = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(new AbortController()); // Use `useRef` for consistent reference

  // Main function to DELETE USER
  const deleteUser = async (userId) => {
    const signal = controllerRef.current.signal; // Use the signal from the controllerRef
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        signal,
      });
      if (!response.ok) throw new Error("Failed to update user data");

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

  return { deleteUser, loading, error };
};

export default useDeleteUser;
