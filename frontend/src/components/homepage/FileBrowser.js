import React, { useState, useEffect } from 'react';
import Folder from './Folder';
import File from './File';

function FileBrowser() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch files and folders from the backend
    // For now, using dummy data
    const dummyItems = [
      { id: 1, type: 'folder', name: 'Folder 1' },
      { id: 2, type: 'file', name: 'File 1.pdf' },
      { id: 3, type: 'file', name: 'File 2.docx' },
    ];
    setItems(dummyItems);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map(item => {
        if (item.type === 'folder') {
          return <Folder key={item.id} name={item.name} />;
        } else {
          return <File key={item.id} name={item.name} />;
        }
      })}
    </div>
  );
}

export default FileBrowser;
