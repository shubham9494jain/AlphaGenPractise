import React, { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null); // { message, type: 'success' | 'error' }

  const showAlert = useCallback((message, type) => {
    setAlert({ message, type });
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }, []);

  const dismissAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert, dismissAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
