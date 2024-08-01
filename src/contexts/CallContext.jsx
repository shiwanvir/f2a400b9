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
                const calls = response.data; // Get all calls from the response

                // Add date and time attributes to each call object
                calls.forEach(call => {
                    const createdAt = new Date(call.created_at);
                    call.date = createdAt.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    call.time = createdAt.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true, // Include AM/PM format
                    });
                });



                // Sort calls from recent to oldest by their created_at date
                calls.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                // Filter out archived calls (optional, based on your use case)
                //const nonArchivedCalls = calls.filter(call => !call.is_archived);
                setCalls(calls);
            } catch (error) {
                console.error('Error fetching call data:', error);
                setError(error.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchCalls();
    }, [API_BASE_URL]);

    const updateCall = async (callId, isArchived) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/activities/${callId}`, {
                is_archived: isArchived
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
          // Update the state locally
          setCalls(prevCalls => 
            prevCalls.map(call => 
              call.id === callId ? { ...call, is_archived: isArchived } : call
            )
          );
        } catch (error) {
          console.error('Error updating call:', error);
          setError(error.message || 'Something went wrong');
        }
       

    };

    const mockUpdateCall = async (callId, isArchived) => {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update the state locally
            setCalls(prevCalls => {
                // Update the specific call
                const updatedCalls = prevCalls.map(call =>
                    call.id === callId ? { ...call, is_archived: isArchived } : call
                );

                // Filter out archived calls if isArchived is true
                return isArchived
                    ? updatedCalls.filter(call => !call.is_archived)
                    : updatedCalls;
            });
        } catch (error) {
            console.error('Error updating call:', error);
            setError(error.message || 'Something went wrong');
        }
    };

    const unarchiveAllCalls = async () => {
        try {
          const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      
          // Send a request to the API endpoint to unarchive all calls
          const response = await axios.patch(`${API_BASE_URL}/reset`); // Assuming POST for unarchiving
      
          // Update the state locally (assuming successful response)
          setCalls(prevCalls => prevCalls.map(call => ({ ...call, is_archived: false })));
        } catch (error) {
          console.error('Error unarchiving calls:', error);
          setError(error.message || 'Something went wrong unarchiving calls');
        }
      };

    return (
        <CallContext.Provider value={{ calls, loading, error, updateCall, mockUpdateCall,unarchiveAllCalls }}>
            {children}
        </CallContext.Provider>
    );
};
