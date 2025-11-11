import React from 'react';
import { Folder, FileText, MessageSquare } from 'lucide-react';

const BottomTabBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: 'folders', icon: <Folder size={24} />, label: 'Folders' },
    { name: 'output', icon: <FileText size={24} />, label: 'Output' },
    { name: 'chat', icon: <MessageSquare size={24} />, label: 'Chat' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab.name
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          {tab.icon}
          <span className="mt-1">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomTabBar;