const FolderFileTree = ({ structure, onSelectFile, onContextMenu }) => {
  const renderTree = (nodes) => {
    return nodes.map(node => {
      if (node.type === 'folder') {
        return (
          <div key={node.id} className="pl-4">
            <div onContextMenu={(e) => onContextMenu(e, node.id)}>{node.name}</div>
            {node.children && <div>{renderTree(node.children)}</div>}
          </div>
        );
      } else {
        return (
          <div
            key={node.id}
            className="pl-4 cursor-pointer"
            onClick={() => onSelectFile(node)}
            onContextMenu={(e) => onContextMenu(e, node.id)}
          >
            {node.name}
          </div>
        );
      }
    });
  };

  return <div>{renderTree(structure)}</div>;
};

export default FolderFileTree;
