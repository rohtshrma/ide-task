import { useState } from 'react';

const Editor = ({ file }) => {
  const [content, setContent] = useState(file.content || '');

  return (
    <textarea
      className="w-full h-full border p-2"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
};

export default Editor;
