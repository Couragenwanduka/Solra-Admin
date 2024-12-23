import React, { useState, createContext, useContext } from 'react';

export interface PostContents {
  _id: string;
  title: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  author: {
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    password: string;
    id: string;
  };
  contents:[{
    header:string;
    smallDescription:string;
    body:string
}]
  image?: string;
  video?: string;
  views?: number;
  likes?: number;
  sendBlog?: number;
  likesIp?: string[];
  isHeadLine?: boolean;
  pulicationDate: Date;
}

// Define the context's value type
interface BlogContextType {
  blogs: PostContents | undefined;
  addBlog: (blog: PostContents) => void;
}

// Create the context with the proper type
const BlogContext = createContext<BlogContextType | undefined>(undefined);

// BlogContextProvider component
export const BlogContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blogs, setBlogs] = useState<PostContents | undefined>(undefined);

  // Function to add a blog
  const addBlog = (blog: PostContents) => {
    setBlogs(blog);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

// Custom hook to use the context
export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogs must be used within a BlogContextProvider');
  }
  return context;
};
