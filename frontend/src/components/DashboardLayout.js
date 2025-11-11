import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import LeftSidebar from './LeftSidebar';
import MainOutputArea from './MainOutputArea';
import RightChatSidebar from './RightChatSidebar';
import BottomTabBar from './BottomTabBar';

const DashboardLayout = () => {
  const [isChatMaximized, setIsChatMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('folders');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleChatMaximized = () => {
    setIsChatMaximized(!isChatMaximized);
  };

  const leftSidebarWidth = isChatMaximized ? 'w-1/4' : 'w-1/4';
  const mainOutputWidth = isChatMaximized ? 'w-1/4' : 'w-1/2';
  const rightChatWidth = isChatMaximized ? 'w-1/2' : 'w-1/4';

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <DashboardHeader />
      {isMobile ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto pt-[10px] px-[10px]"> {/* Added padding here for mobile content */}
            {activeMobileTab === 'folders' && <LeftSidebar className="w-full" />}
            {activeMobileTab === 'output' && <MainOutputArea className="w-full" />}
            {activeMobileTab === 'chat' && <RightChatSidebar className="w-full" isChatMaximized={isChatMaximized} toggleChatMaximized={toggleChatMaximized} />}
          </div>
          <BottomTabBar activeTab={activeMobileTab} setActiveTab={setActiveMobileTab} />
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden pt-[10px] px-[10px]">
          <Outlet context={{ leftSidebarWidth, mainOutputWidth, rightChatWidth, isChatMaximized, toggleChatMaximized }} />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;