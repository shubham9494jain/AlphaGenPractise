import React from 'react';
import { useOutletContext } from 'react-router-dom';
import LeftSidebar from '../components/LeftSidebar';
import MainOutputArea from '../components/MainOutputArea';
import RightChatSidebar from '../components/RightChatSidebar';

function HomePage() {
  const { leftSidebarWidth, mainOutputWidth, rightChatWidth, isChatMaximized, toggleChatMaximized } = useOutletContext();

  return (
    <div className="flex flex-1 overflow-hidden">
      <LeftSidebar className={`${leftSidebarWidth} mr-[5px]`} />
      <MainOutputArea className={`${mainOutputWidth} ml-[5px] mr-[5px]`} isChatMaximized={isChatMaximized} toggleChatMaximized={toggleChatMaximized} />
      <RightChatSidebar className={`${rightChatWidth} ml-[5px]`} />
    </div>
  );
}

export default HomePage;