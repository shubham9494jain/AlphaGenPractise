import React from 'react';
import { useAlert } from './AlertContext';

const Alert = () => {
  const { alert, dismissAlert } = useAlert();

  if (!alert) return null;

  const bgColor = alert.type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = alert.type === 'success' ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-between`}>
        <div className="flex items-center">
          {icon}
          <span>{alert.message}</span>
        </div>
        <button onClick={dismissAlert} className="ml-4 text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;