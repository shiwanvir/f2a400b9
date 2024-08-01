import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

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
                setLoading('fetching');
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

                // Filter out archived calls 
                setCalls(calls);
            } catch (error) {
                console.error('Error fetching call data:', error);
                setError(error.message || 'Something went wrong');
            } finally {
                setLoading('idle');
            }
        };

        fetchCalls();
    }, [API_BASE_URL]);

    const updateCall = async (callId, isArchived) => {
        setLoading('updating');
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
        finally {
            setLoading('idle');
        }


    };

    const unarchiveAllCalls = async () => {
        setLoading('unarchiving');
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
        finally {
            setLoading('idle');
        }
    };

    return (
        <CallContext.Provider value={{ calls, loading, error, updateCall, unarchiveAllCalls }}>
            {children}
            {(loading === 'fetching' || loading === 'unarchiving' ||loading==='updating') && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000
                }}>
                    <CircularProgress />
                </div>
            )}
        </CallContext.Provider>
    );
};
