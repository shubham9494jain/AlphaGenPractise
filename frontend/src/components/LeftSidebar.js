import React, { useState, useRef, useEffect } from 'react';
import { useProjects } from '../context/ProjectContext';
import api from '../utils/api';
import { FileText, FileArchive, Trash2, Edit, Plus, Check, X } from 'lucide-react';

const LeftSidebar = ({ className }) => {
  const { projects, currentProject, setCurrentProject, createProject, updateProject, deleteProject, setCurrentDocument, refreshProject } = useProjects();
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');

  const handleNewProject = async () => {
    await createProject('Untitled Project');
  };

  const handleRename = (project) => {
    setEditingProjectId(project.id);
    setNewProjectName(project.title);
  };

  const handleRenameSubmit = async (projectId) => {
    await updateProject(projectId, newProjectName);
    setEditingProjectId(null);
    setNewProjectName('');
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project and all its documents?')) {
      await deleteProject(projectId);
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await api.delete(`/documents/${docId}/`);
        await refreshProject(currentProject.id);
      } catch (error) {
        console.error('Failed to delete document', error);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files.length || !currentProject) return;

    const newUploadingFiles = Array.from(files).map(file => ({
      name: file.name,
      progress: 0,
      status: 'Uploading',
    }));
    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    try {
      await api.post(`/projects/${currentProject.id}/upload_document/`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadingFiles(prev => prev.map(f => ({ ...f, progress })));
        },
      });
      setUploadingFiles(prev => prev.map(f => ({ ...f, status: 'Completed' })));
      await refreshProject(currentProject.id);
    } catch (error) {
      console.error('File upload failed', error);
      setUploadingFiles(prev => prev.map(f => ({ ...f, status: 'Failed' })));
    } finally {
        setTimeout(() => setUploadingFiles([]), 5000);
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (extension === 'pdf') return <FileText className="text-red-500" />;
    if (['doc', 'docx'].includes(extension)) return <FileText className="text-blue-500" />;
    if (['xls', 'xlsx'].includes(extension)) return <FileText className="text-green-500" />;
    if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) return <FileText className="text-purple-500" />;
    if (extension === 'zip') return <FileArchive className="text-yellow-500" />;
    return <FileText className="text-gray-500" />;
  };

  return (
    <aside className={`${className} bg-white rounded-t-2xl shadow-sm flex flex-col h-full`}>
      {/* Header: Projects */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
          <button onClick={handleNewProject} className="p-1 hover:bg-gray-200 rounded">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Project List */}
      <div className="overflow-y-auto p-4">
        <ul>
          {projects.map(project => (
            <li key={project.id} 
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer group ${currentProject?.id === project.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => {
                  setCurrentProject(project);
                  setCurrentDocument(null);
                }}>
              {editingProjectId === project.id ? (
                <div className="flex items-center w-full">
                  <input 
                    type="text" 
                    value={newProjectName} 
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleRenameSubmit(project.id);
                      }
                    }}
                    className="flex-grow bg-transparent border-b border-blue-500 focus:outline-none"
                    autoFocus
                  />
                  {newProjectName !== project.title ? (
                    <button onClick={() => handleRenameSubmit(project.id)} className="p-1 text-green-600 hover:bg-green-100 rounded">
                      <Check size={16} />
                    </button>
                  ) : (
                    <button onClick={() => setEditingProjectId(null)} className="p-1 text-red-600 hover:bg-red-100 rounded">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <span className="text-sm flex-grow">{project.title}</span>
                  <div className="hidden group-hover:flex items-center">
                    <button onClick={(e) => { e.stopPropagation(); handleRename(project); }} className="p-1 text-gray-500 hover:text-blue-600 rounded">
                      <Edit size={16} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }} className="p-1 text-gray-500 hover:text-red-600 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Documents Section */}
      <div className="p-4 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Documents</h2>
      </div>

      <div className="p-4">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          disabled={!currentProject}
        />
        <button 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
          onClick={() => fileInputRef.current.click()}
          disabled={!currentProject}
        >
          + Upload Files
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {currentProject ? (
          currentProject.documents && currentProject.documents.length > 0 ? (
            <ul>
              {currentProject.documents.map(doc => (
                <li key={doc.id} 
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 group"
                    onClick={() => setCurrentDocument(doc)}>
                  <div className="flex items-center">
                    {getFileIcon(doc.name)}
                    <span className="ml-2 text-sm">{doc.name}</span>
                  </div>
                  <button onClick={() => handleDeleteDocument(doc.id)} className="hidden group-hover:block text-gray-500 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-center">
              <p>No documents in this project.</p>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-center">
            <p>Select a project to see documents.</p>
          </div>
        )}
      </div>

      {/* Uploading Area */}
      {uploadingFiles.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Uploading...</h3>
          {uploadingFiles.map((file, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center justify-between text-sm">
                <span>{file.name}</span>
.
                <span>{file.status}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${file.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;