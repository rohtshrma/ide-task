import { useState } from 'react';
import FolderFileTree from '../folderFileTree';

const initialStructure = [
  {
    id: '1',
    name: 'root',
    type: 'folder',
    children: []
  }
];

const Sidebar = ({ onSelectFile }) => {
  const [structure, setStructure] = useState(initialStructure);
  const [contextMenu, setContextMenu] = useState(null);

  const createFolder = (parentId) => {
    const newFolder = {
      id: Date.now().toString(),
      name: `New Folder`,
      type: 'folder',
      children: []
    };
    updateStructure(parentId, newFolder);
  };

  const createFile = (parentId, extension) => {
    const newFile = {
      id: Date.now().toString(),
      name: `New File${extension}`,
      type: 'file',
      extension: extension
    };
    updateStructure(parentId, newFile);
  };

  const updateStructure = (parentId, newItem) => {
    const updateNodes = (nodes) => {
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...node.children, newItem]
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateNodes(node.children)
          };
        }
        return node;
      });
    };
    setStructure(updateNodes(structure));
  };

  const renameItem = (id, newName) => {
    const updateNodes = (nodes) => {
      return nodes.map(node => {
        if (node.id === id) {
          return {
            ...node,
            name: newName
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateNodes(node.children)
          };
        }
        return node;
      });
    };
    setStructure(updateNodes(structure));
  };

  const deleteItem = (id) => {
    const updateNodes = (nodes) => {
      return nodes.filter(node => {
        if (node.id === id) {
          return false;
        }
        if (node.children) {
          node.children = updateNodes(node.children);
        }
        return true;
      });
    };
    setStructure(updateNodes(structure));
  };

  const handleContextMenu = (e, id) => {
    e.preventDefault();
    setContextMenu({
      id,
      x: e.pageX,
      y: e.pageY
    });
  };

  const handleRename = () => {
    const newName = prompt("Enter new name:");
    if (newName) {
      renameItem(contextMenu.id, newName);
      setContextMenu(null);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem(contextMenu.id);
      setContextMenu(null);
    }
  };

  return (
    <div className="w-64 bg-gray-200 p-4">
      <button onClick={() => createFolder('1')}>Create Folder</button>
      <button onClick={() => createFile('1', '.ed')}>Create .ed File</button>
      <button onClick={() => createFile('1', '.note')}>Create .note File</button>
      <button onClick={() => createFile('1', '.lt')}>Create .lt File</button>
      <button onClick={() => createFile('1', '.readme')}>Create .readme File</button>
      <FolderFileTree
        structure={structure}
        onSelectFile={onSelectFile}
        onContextMenu={handleContextMenu}
      />
      {contextMenu && (
        <div
          className="absolute bg-white border rounded shadow"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button onClick={handleRename}>Rename</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
