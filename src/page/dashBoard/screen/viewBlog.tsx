import ViewBlogUi from "../component/view/viewBlogsUi";
import HeaderNav from "../component/nav/header";
import { useState } from "react";
import apiFunctions from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../../hooks/userDetails";

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
  pulicationDate: Date;
  status: string;
}

const ViewBlog = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(0);
  const { data: blogData, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: apiFunctions.getAlLBlogPost,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const renderNoBlogsFound = () => (
    <div className="text-center text-gray-500 mt-10">
      No blog posts found
    </div>
  );

  const filteredBlogs =
    activeTab === 0
      ? blogData?.blogs?.filter((blog: Blog) => blog.status === "approved")
      : activeTab === 1
      ? blogData?.blogs?.filter(
          (blog: Blog) => blog.isHeadLine && blog.status === "approved"
        )
      : activeTab === 2
      ? blogData?.blogs
          ?.filter((blog: Blog) => blog.status === "approved")
          .sort((a: Blog, b: Blog) => b.likes - a.likes)
      : blogData?.blogs?.filter(
          (blog: Blog) => blog.author?.email === user?.email
        );

  return (
    <main className="h-screen overflow-scroll bg-[#191919]">
      <div>
        <HeaderNav />
      </div>
      <div className="ml-16 md:ml-60">
        <button
          onClick={() => setActiveTab(0)}
          className={`px-4 py-2 rounded-md ${
            activeTab === 0 ? "text-peach underline" : "text-text-colour"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`px-4 py-2 rounded-md ${
            activeTab === 1 ? "text-peach underline" : "text-text-colour"
          }`}
        >
          Featured
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`px-4 py-2 rounded-md ${
            activeTab === 2 ? "text-peach underline" : "text-text-colour"
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`px-4 py-2 rounded-md ${
            activeTab === 3 ? "text-peach underline" : "text-text-colour"
          }`}
        >
          My Post
        </button>
      </div>

      {/* Render blogs or fallback */}
      <div>
        {filteredBlogs?.length ? (
          filteredBlogs.map((blog: Blog, index: number) => (
            <div key={index}>
              <ViewBlogUi
                key={blog.id}
                author={blog.author}
                category={blog.category}
                postDate={blog.pulicationDate}
                title={blog.title}
                description={blog.description}
                likes={blog.likes}
                shares={blog.sendBlog}
                isAuthor={activeTab === 3} // Show edit and delete buttons for user's posts
                blog={blog}
              />
            </div>
          ))
        ) : (
          renderNoBlogsFound()
        )}
      </div>
    </main>
  );
};

export default ViewBlog;
