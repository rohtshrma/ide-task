"use client";
import { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Editor from '../components/Editor';
// import NoteMaker from '../components/NoteMaker';
// import ListMaker from '../components/ListMaker';
// import ReadmePreviewer from '../components/ReadmePreviewer';
import Sidebar from './components/sidebar';
import Editor from './components/editor';
import NoteMaker from './components/noteMaker';
import ListMaker from './components/listMaker';
import ReadmePreviewer from './components/readmePreviewer';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const renderFileContent = () => {
    if (!selectedFile) return null;

    switch (selectedFile.extension) {
      case '.ed':
        return <Editor file={selectedFile} />;
      case '.note':
        return <NoteMaker file={selectedFile} />;
      case '.lt':
        return <ListMaker file={selectedFile} />;
      case '.readme':
        return <ReadmePreviewer file={selectedFile} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelectFile={setSelectedFile} />
      <div className="flex-grow p-4">
        {renderFileContent()}
      </div>
    </div>
  );
};

export default Home;
