import React, { useState, useEffect, useMemo } from 'react';
import { useProjects } from '../context/ProjectContext';
import api from '../utils/api';

const RightChatSidebar = ({ className }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { currentProject, currentDocument, currentProjectId } = useProjects();
  const [documents, setDocuments] = useState([]);
  const [chatDisabled, setChatDisabled] = useState(true);

  const chatHeaderText = useMemo(() => {
    if (currentDocument && currentProject) {
      return `${currentProject.title} - ${currentDocument.name}`;
    } else if (currentProject) {
      return currentProject.title;
    }
    return 'Chat space';
  }, [currentProject, currentDocument]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!currentProjectId) {
        setDocuments([]);
        setChatDisabled(true); // Disable chat if no project is selected
        return;
      }
      try {
        const response = await api.get(`/documents/?project=${currentProjectId}`);
        setDocuments(response.data);
        // Update chatDisabled based on new logic
        setChatDisabled(response.data.length === 0 && !currentDocument);
      } catch (error) {
        console.error('Failed to fetch documents', error);
        setChatDisabled(true); // Disable chat on error
      }
    };
    fetchDocuments(); // Call fetchDocuments directly
  }, [currentProjectId, currentDocument]); // Add currentDocument to dependencies

  return (
    <aside className={`${className} h-full bg-white rounded-t-2xl shadow-sm flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between transition-all duration-300">
        {isSearchActive ? (
          <div className="w-full flex items-center">
            <input
              type="text"
              placeholder="Search chat..."
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={() => setIsSearchActive(false)} className="ml-2 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-800 truncate overflow-hidden" title={chatHeaderText}>
              {chatHeaderText}
            </h2>
            <button onClick={() => setIsSearchActive(true)} className="ml-2 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Chat Body: Empty State */}
      <div className="flex-1 flex items-center justify-center text-gray-500 text-center p-4">
        <p>Ask your questions here</p>
      </div>

      {/* Footer with Pills and Input */}
      <div className="p-4 border-t border-gray-200">
        {chatDisabled && (
            <div className="text-red-500 text-center mb-2">
                No documents uploaded. Please upload documents first.
            </div>
        )}
        {/* Suggested Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer">Summarize this report</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer">List top holdings</span>
        </div>

        {/* Input Area */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder={chatDisabled ? "Upload documents to start chat" : "Type here"}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            disabled={chatDisabled}
          />
          <div className="flex items-center justify-end">
            <button
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center"
              disabled={chatDisabled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightChatSidebar;
