import React from 'react';

const MainOutputArea = ({ className, isChatMaximized, toggleChatMaximized }) => {
  return (
    <main className={`${className} bg-white rounded-t-2xl shadow-sm p-4 flex flex-col h-full`}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Output space</h2>
        {/* Maximize/Minimize Icon Button - Hidden on mobile */}
        <button
          onClick={toggleChatMaximized}
          className="text-gray-500 hover:text-gray-700 focus:outline-none hidden md:block"
          title={isChatMaximized ? "Minimize chat" : "Maximize chat"}
        >
          {isChatMaximized ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9V4.5M15 9h4.5M15 9l5.25-5.25M15 15v4.5M15 15h4.5M15 15l5.25 5.25" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
            </svg>
          )}
        </button>
      </div>

      {/* Initial State (Empty) */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-6 shadow-sm">
        <p className="text-gray-500 text-center">Generated outputs will be displayed here</p>
      </div>
    </main>
  );
};

export default MainOutputArea;