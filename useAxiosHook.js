import { useState, useEffect, useRef } from "react";
import api from "../api/axiosInstance"; // your pre-configured axios instance

/**
 * useAxios hook for GET requests with automatic cancellation support.
 * @param {string} url - API endpoint to fetch.
 * @param {object} options - Axios config options (optional).
 * @returns {object} { data, error, loading, refetch }
 */
function useAxios(url, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null);

  const fetchData = async () => {
    if (controllerRef.current) {
      // Cancel previous request if still running
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(url, {
        signal: controller.signal,
        ...options,
      });
      setData(response.data);
    } catch (err) {
      if (err.name === "CanceledError" || err.name === "AbortError") {
        // Request was canceled, silently ignore or handle if needed
        console.log("Request canceled");
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Cleanup on unmount: cancel ongoing request
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [url]); // refetch if url changes

  // Return data, loading state, error and a manual refetch function
  return { data, loading, error, refetch: fetchData };
}

export default useAxios;

// How to use this hook in a component:
// import React from "react";
// import useAxios from "../hooks/useAxios";

function UserProfile() {
  const { data, loading, error, refetch } = useAxios("/user/profile");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Hello, {data.name}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}

// export default UserProfile;
