import React, { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';

function TextEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('editorContent', content);
  }, [content]); // Add content as a dependency here

  const config = {
    buttons: ['bold', 'italic', 'underline', 'align', 'eraser', 'ul', 'ol', 'font'],
  };

  const handleChange = (value) => {
    localStorage.setItem('editorContent', value);
  };

  return (
    <div className='p-5'>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={handleChange}
        config={config}
      />
    </div>
  );
}

export default TextEditor;
