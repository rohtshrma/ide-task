import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ReadmePreviewer = ({ file }) => {
  const [content, setContent] = useState(file.content || '');

  return (
    <div>
      <textarea
        className="w-full h-32 border p-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="prose">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ReadmePreviewer;
