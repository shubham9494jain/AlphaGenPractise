import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [currentDocument, setCurrentDocument] = useState(null);
    const { tokens } = useAuth();

    const _setCurrentProject = (project) => {
        setCurrentProject(project);
        if (project) {
            localStorage.setItem('lastSelectedProjectId', project.id);
        } else {
            localStorage.removeItem('lastSelectedProjectId');
        }
    };

    const fetchProjects = useCallback(async () => {
        try {
            const response = await api.get('/projects/');
            setProjects(response.data);
            
            const lastSelectedProjectId = localStorage.getItem('lastSelectedProjectId');
            if (lastSelectedProjectId) {
                const lastSelectedProject = response.data.find(p => p.id === parseInt(lastSelectedProjectId));
                if (lastSelectedProject) {
                    _setCurrentProject(lastSelectedProject);
                } else if (response.data.length > 0) {
                    _setCurrentProject(response.data[0]);
                } else {
                    _setCurrentProject(null);
                }
            } else if (response.data.length > 0) {
                _setCurrentProject(response.data[0]);
            } else {
                _setCurrentProject(null);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }, []);

    useEffect(() => {
        if (tokens) {
            fetchProjects();
        }
    }, [tokens, fetchProjects]);


    const createProject = async (title) => {
        try {
            const response = await api.post('/projects/', { title });
            setProjects([...projects, response.data]);
            _setCurrentProject(response.data); // Use _setCurrentProject
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const updateProject = async (id, title) => {
        console.log('Updating project with id:', id, 'and title:', title);
        try {
            const response = await api.patch(`/projects/${id}/`, { title });
            console.log('Project updated:', response.data);
            setProjects(projects.map(p => (p.id === id ? response.data : p)));
            if (currentProject && currentProject.id === id) {
                _setCurrentProject(response.data); // Use _setCurrentProject
            }
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const deleteProject = async (id) => {
        try {
            await api.delete(`/projects/${id}/`);
            setProjects(projects.filter(p => p.id !== id));
            if (currentProject && currentProject.id === id) {
                _setCurrentProject(projects.length > 1 ? projects[0] : null); // Use _setCurrentProject
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const contextData = {
        projects,
        currentProject,
        currentProjectId: currentProject?.id,
        setCurrentProject: _setCurrentProject, // Expose _setCurrentProject
        currentDocument,
        setCurrentDocument,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
    };

    return (
        <ProjectContext.Provider value={contextData}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => {
    return useContext(ProjectContext);
};

export default ProjectContext;