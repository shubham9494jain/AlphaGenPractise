import React from 'react';
import { Link } from 'react-router-dom';

const MobileSideMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
      onClick={onClose} // Close when clicking outside
    >
      <div className="w-64 bg-white h-full shadow-lg flex flex-col" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside */}
        {/* User Profile Summary */}
        <div className="p-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold mb-2">UA</div>
          <p className="text-sm font-semibold text-gray-800">User Name</p>
          <p className="text-xs text-gray-500">user@example.com</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">New project +</button>
          <Link to="#history" className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">History</Link>
          <Link to="/dashboard" className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">Home</Link>
          <Link to="#settings" className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200">Settings</Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-left text-red-600 hover:bg-red-50 rounded-md px-3 py-2 transition-colors duration-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSideMenu;