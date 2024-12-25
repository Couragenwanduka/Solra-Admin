import ApproveBlogUi from "../component/approve/approveBlogUi";
import { useState } from "react";
import apiFunctions from "../../api";
import { useQuery } from "@tanstack/react-query";

interface Blog {
  id: string;
  isAuthor?: boolean;
  author: {
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    password: string;
    id: string;
  };
  category: {
    id: string;
    name: string;
  };
  postDate: string;
  title: string;
  description: string;
  likes: number;
  shares: number;
  _id: string;
  contents: [
    {
      header: string;
      smallDescription: string;
      body: string;
    }
  ];
  publicationDate: string;
  image?: string;
  video?: string;
  views?: number;
  sendBlog?: number;
  likesIp?: string[];
  isHeadLine?: boolean;
  status: string;
  pulicationDate: Date;
}

const ApproveBlog = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { data: blogData, isLoading, isError } = useQuery({
    queryKey: ["blog"],
    queryFn: apiFunctions.getAlLBlogPost,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs.</div>;

  const now = new Date();
  const seventyTwoHoursAgo = new Date(now.getTime() - 96 * 60 * 60 * 1000);

  // Filter blogs based on active tab
  const filterBlogs = (status: string | null) => {
    let filtered = blogData?.blogs || [];
    if (status) filtered = filtered.filter((blog: Blog) => blog.status === status);
    if (activeTab === 0) {
      return filtered.filter((blog: Blog) => new Date(blog.publicationDate) >= seventyTwoHoursAgo);
    }
    return filtered;
  };

  const tabs = [
    { label: "New", status: null },
    { label: "Approve", status: "approved" },
    { label: "UnApproved", status: "rejected" },
    { label: "Pending", status: "pending" },
  ];

  return (
    <main className="h-screen overflow-scroll">
      <div className="mt-10 mb-5">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-md ${
              activeTab === index ? "text-peach underline" : "text-text-colour"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {filterBlogs(tabs[activeTab].status).length > 0 ? (
          filterBlogs(tabs[activeTab].status).map((blog: Blog , index:number) => (
           <div key={index}>
             <ApproveBlogUi
              key={blog.id}
              isBlog={false}
              authorName={`${blog.author.firstName} ${blog.author.lastName}`}
              category={blog.category.name}
              postDate={blog.postDate}
              title={blog.title}
              description={blog.description}
              likes={blog.likes}
              shares={blog.sendBlog}
              authorsPicture={blog.author.picture}
              blog={blog}
            />
           </div>
          ))
        ) : (
          <div>No blogs found for this tab.</div>
        )}
      </div>
    </main>
  );
};

export default ApproveBlog;
