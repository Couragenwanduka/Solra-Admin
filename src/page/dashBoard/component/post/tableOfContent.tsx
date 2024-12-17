import React, { useState } from 'react';

type TableOfContentsItem = {
    title: string;
    link?: string; // Optional, for linking to sections in the blog
  };
  

const TableOfContents: React.FC = () => {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  // Add a new item
  const addTOCItem = () => {
    setTableOfContents([...tableOfContents, { title: '', link: '' }]);
  };

  // Update an existing item
  const updateTOCItem = (index: number, field: 'title' | 'link', value: string) => {
    const updatedTOC = [...tableOfContents];
    updatedTOC[index][field] = value;
    setTableOfContents(updatedTOC);
  };

  // Remove an item
  const removeTOCItem = (index: number) => {
    const updatedTOC = tableOfContents.filter((_, i) => i !== index);
    setTableOfContents(updatedTOC);
  };

  return (
    <div>
      <h2 className='text-text-colour'>Table of Contents</h2>
      <div className='mb-5'>
      <input
            type="text"
            placeholder="Title"
            className="border-b mr-2 bg-transparent w-full h-16 border-text-colour/50"
          />
      <input
            type="text"
            placeholder="Title"
            className="border-b mr-2 bg-transparent w-full h-16 border-text-colour/50"
          />
      <input
            type="text"
            placeholder="Title"
            className="border-b  mr-2 bg-transparent w-full h-16 border-text-colour/50"
          />
      <input
            type="text"
            placeholder="Title"
            className="border-b  mr-2 bg-transparent w-full h-16 border-text-colour/50"
          />
      </div>
      {tableOfContents.map((item, index) => (
        <div key={index} className="mb-4 ">
          <input
            type="text"
            placeholder="Title"
            value={item.title}
            onChange={(e) => updateTOCItem(index, 'title', e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={() => removeTOCItem(index)} className="text-red-500">
            Remove
          </button>
        </div>
      ))}
      <div className='flex justify-end'>
            <button onClick={addTOCItem} className="bg-peach rounded-md text-white px-4 py-2">
                Add Item
            </button>
      </div>
    </div>
  );
};

export default TableOfContents;
