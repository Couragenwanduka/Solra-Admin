import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type BodySection = {
    header: string;
    paragraphs: string[];
  };
  
  type BlogContent = {
    header: string;
    smallDescription: string;
    body: BodySection[];
  };
  

const BlogEditor: React.FC = () => {
  const [contents, setContents] = useState<BlogContent>({
    header: '',
    smallDescription: '',
    body: [{ header: '', paragraphs: [''] }],
  });

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContents({ ...contents, header: e.target.value });
  };

  const handleSmallDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContents({ ...contents, smallDescription: e.target.value });
  };

  const handleBodyChange = (
    index: number,
    field: 'header' | 'paragraphs',
    value: string
  ) => {
    const updatedBody = [...contents.body];
    if (field === 'paragraphs') {
      updatedBody[index].paragraphs[0] = value;
    } else {
      updatedBody[index][field] = value;
    }
    setContents({ ...contents, body: updatedBody });
  };

  const addBodySection = () => {
    setContents({
      ...contents,
      body: [...contents.body, { header: '', paragraphs: [''] }],
    });
  };

//   const saveContent = () => {
//     console.log(contents); // Replace this with your API call or logic to save
//   };

  return (
    <div className="">
      {/* Header Input */}
      <div className="mb-4">
        {/* <label className="block font-bold mb-2 text-text-colour">Header</label> */}
        <input
          type="text"
          value={contents.header}
          onChange={handleHeaderChange}
          className="border-b  w-full bg-transparent border-text-colour/50 focus:outline-none h-16 placeholder:text-text-colour"
          placeholder="Enter blog header"
        />
      </div>

      {/* Small Description Input */}
      <div className="mb-4">
        {/* <label className="block font-bold mb-2">Small Description</label> */}
        <textarea
          value={contents.smallDescription}
          onChange={handleSmallDescriptionChange}
           className="border-b  w-full h-24 bg-transparent border-text-colour/50 focus:outline-none placeholder:text-text-colour resize-none "
          placeholder="Enter small description"
        />
      </div>

      {/* Body Sections */}
      <div>
        {/* <label className="block font-bold mb-2">Body Sections</label> */}
        {contents.body.map((section, index) => (
          <div key={index} className="mb-4 ">
            {/* <label className="block font-bold mb-1">Section Header</label> */}
            <input
              type="text"
              value={section.header}
              onChange={(e) =>
                handleBodyChange(index, 'header', e.target.value)
              }
               className="border-b w-full bg-transparent border-text-colour/50  focus:outline-none h-16 placeholder:text-text-colour"
              placeholder="Enter section header"
            />

            <label className="block font-bold  mt-5 text-text-colour mb-5">Paragraph</label>
            <ReactQuill
              theme="snow"
              value={section.paragraphs[0]}
              onChange={(value) =>
                handleBodyChange(index, 'paragraphs', value)
              }
              placeholder="Enter paragraph content"
              className='h-56 text-white'
            />
          </div>
        ))}

       <div className='flex justify-end'>
            <button
                onClick={addBodySection}
                className="mt-10 px-4 py-2 border border-peach text-peach rounded"
                >
                Add Body Section
                </button>
       </div>
      </div>

      {/* Save Button */}
      {/* <button
        onClick={saveContent}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded"
      >
        Save Blog
      </button> */}
    </div>
  );
};

export default BlogEditor;
