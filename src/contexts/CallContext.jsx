import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the CallContext
export const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Base URL from environment variable
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/activities`);
        setCalls(response.data);
      } catch (error) {
        console.error('Error fetching call data:', error);
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, [API_BASE_URL]); // Dependency array includes API_BASE_URL

  return (
    <CallContext.Provider value={{ calls, loading, error }}>
      {children}
    </CallContext.Provider>
  );
};
