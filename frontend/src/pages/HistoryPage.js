import React from 'react';
import { useProjects } from '../context/ProjectContext';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
    const { projects } = useProjects();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Project History</h1>
            {projects.length > 0 ? (
                <ul className="space-y-4">
                    {projects.map(project => (
                        <li key={project.id} className="p-4 border rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold">{project.title}</h2>
                            <p className="text-gray-600">Created at: {new Date(project.created_at).toLocaleString()}</p>
                            <p className="text-gray-600">Last updated: {new Date(project.updated_at).toLocaleString()}</p>
                            <Link to="/dashboard" className="text-blue-500 hover:underline mt-2 inline-block">Go to Dashboard</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
};

export default HistoryPage;
