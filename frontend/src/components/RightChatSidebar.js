import React, { useState, useMemo, useEffect, useContext, useRef } from 'react';
import { useProjects } from '../context/ProjectContext';
import AuthContext from '../context/AuthContext'; // Import AuthContext
import api from '../utils/api'; // Assuming you have an api utility for authenticated requests
import Spinner from './Spinner'; // Assuming you have a Spinner component

const RightChatSidebar = ({ className }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentProject, currentDocument } = useProjects();
  const { tokens } = useContext(AuthContext); // Get tokens from AuthContext
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  const chatDisabled = !currentProject || (!currentDocument && (!currentProject.documents || currentProject.documents.length === 0));

  const chatHeaderText = useMemo(() => {
    if (currentDocument && currentProject) {
      return `${currentProject.title} - ${currentDocument.name}`;
    } else if (currentProject) {
      return currentProject.title;
    }
    return 'Chat space';
  }, [currentProject, currentDocument]);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Fetch chat history when currentProject or currentDocument changes
    const fetchChatHistory = async () => {
      if (!tokens || !currentProject) {
        setMessages([]);
        return;
      }

      setIsLoading(true);
      try {
        const params = {};
        if (currentProject) {
          params.project_id = currentProject.id;
        }
        if (currentDocument) {
          params.document_id = currentDocument.id;
        }

        const response = await api.get('chat-history/', {
          params: params,
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, [currentProject, currentDocument, tokens]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || chatDisabled || !tokens) return;

    const newMessage = {
      id: Date.now(), // Temporary ID for optimistic update
      message: messageText,
      is_user_message: true,
      created_at: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
    setIsLoading(true); // Set loading true when user sends message

    try {
      const payload = {
        message: messageText,
      };
      if (currentProject) {
        payload.project_id = currentProject.id;
      }
      if (currentDocument) {
        payload.document_id = currentDocument.id;
      }

      const response = await api.post('chat-history/', payload);

      // Replace temporary user message with actual data and add AI response
      setMessages((prevMessages) =>
        prevMessages
          .filter((msg) => msg.id !== newMessage.id)
          .concat([response.data.user_message, response.data.ai_message])
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      );
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally, revert the optimistic update or show an error message
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== newMessage.id));
    } finally {
      setIsLoading(false); // Set loading false after response or error
    }
  };

  const handlePillClick = (text) => {
    sendMessage(text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

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

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading && messages.length === 0 ? (
          <div className="text-center text-gray-500">Loading chat history...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500">Ask your questions here</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.is_user_message ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.is_user_message
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))
        )}
        {isLoading && messages.length > 0 && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none flex items-center">
              <Spinner />
              <span className="ml-2">AI is typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Element to scroll to */}
      </div>

      {/* Footer with Pills and Input */}
      <div className="p-4 border-t border-gray-200">
        {chatDisabled && (
            <div className="text-red-500 text-center mb-2">
                No documents uploaded or project selected. Please upload documents or select a project first.
            </div>
        )}
        {/* Suggested Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200"
            onClick={() => handlePillClick('Summarize this report')}
          >
            Summarize this report
          </span>
          <span
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200"
            onClick={() => handlePillClick('List top holdings')}
          >
            List top holdings
          </span>
        </div>

        {/* Input Area */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder={chatDisabled ? "Upload documents or select a project to start chat" : "Type here"}
            className="flex-1 p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={chatDisabled || isLoading}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
            disabled={chatDisabled || isLoading}
            onClick={() => sendMessage(inputMessage)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RightChatSidebar;
