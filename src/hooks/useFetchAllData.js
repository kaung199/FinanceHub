import { useState, useEffect } from "react";

const useFetchAllData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;

    const fetchData = async (signal) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(signal);

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetchAllData;
