import React, { useState, useEffect } from 'react';
import ProfileMenu from './ProfileMenu';
import MobileSideMenu from './MobileSideMenu';
import { useProjects } from '../context/ProjectContext';

const DashboardHeader = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const { currentProject, createProject, updateProject } = useProjects();
  const currentProjectId = currentProject?.id;

  useEffect(() => {
    if (currentProject) {
      setProjectTitle(currentProject.title);
    } else {
      setProjectTitle('Untitled Project');
    }
  }, [currentProject]);

  const handleTitleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const saveTitle = async () => {
    setIsLoading(true);
    setIsEditingTitle(false);
    const titleToSave = projectTitle.trim() === '' ? 'Untitled Project' : projectTitle;

    try {
      if (currentProjectId) {
        await updateProject(currentProjectId, titleToSave);
      } else {
        await createProject(titleToSave);
      }
    } catch (error) {
      console.error('Failed to save project title', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleBlur = () => {
    saveTitle();
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveTitle();
    }
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white shadow-md">
      {/* Left: Hamburger Icon (Mobile) and Logo */}
      <div className="flex items-center">
        <button onClick={toggleSideMenu} className="mr-2 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <img src="/loges/AlphaGenLogo.png" alt="AlphaGen Logo" className="h-8 w-auto object-contain mr-4" />
        {/* Project Title with Hover Edit Icon - Hidden on mobile */}
        <div className="group relative flex items-center hidden md:flex ml-[calc(25vw + 20px)]"> {/* Adjusted margin for alignment */}
          {isEditingTitle ? (
            <>
              <input
                type="text"
                value={projectTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                className="text-lg font-semibold text-gray-800 border-b border-gray-400 focus:outline-none"
                autoFocus
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={saveTitle}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          ) : (
            <span className={`text-lg font-semibold text-gray-800 cursor-pointer ${isLoading ? 'opacity-50' : ''}`} onClick={handleTitleClick}>
              {projectTitle}
            </span>
          )}
          {!isEditingTitle && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2 cursor-pointer hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={handleTitleClick}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
            </svg>
          )}
        </div>
      </div>

      {/* Right Side Container - Simplified for mobile */}
      <div className="flex items-center space-x-2">
        {/* User Avatar */}
        <ProfileMenu />
      </div>

      <MobileSideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
    </header>
  );
};

export default DashboardHeader;