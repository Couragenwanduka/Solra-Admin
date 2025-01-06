import ViewBlogUi from "../component/view/viewBlogsUi";
import HeaderNav from "../component/nav/header";
import { useState } from "react";
import apiFunctions from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../../hooks/userDetails";

interface Blog {
  id:string
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
  contents:[{
    header:string;
    smallDescription:string;
    body:string
}]
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

  return (
    <main className="h-screen overflow-scroll">
      <div>
        <HeaderNav />
      </div>
      <div>
        <button onClick={() => setActiveTab(0)} className={`px-4 py-2 rounded-md ${ activeTab === 0 ? "text-peach underline" : "text-text-colour"}`}>
         All
        </button>
        <button onClick={() => setActiveTab(1)} className={`px-4 py-2 rounded-md ${ activeTab === 1 ? "text-peach underline" : "text-text-colour"}`}>
          Featured
        </button>
        <button onClick={() => setActiveTab(2)} className={`px-4 py-2 rounded-md ${ activeTab === 2 ? "text-peach underline" : "text-text-colour"}`} >
          Popular
        </button>
        <button onClick={() => setActiveTab(3)} className={`px-4 py-2 rounded-md ${ activeTab === 3 ? "text-peach underline" : "text-text-colour"}`}>
          My Post
        </button>
      </div>

      {/* Render blogs based on activeTab */}
      {activeTab === 0 && (
        <div>
        {blogData?.blogs
          ?.filter((blog: Blog) => blog.status === 'approved')
          .map((blog: Blog, index:number) => (
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
              blog={blog}
            />
           </div>
          ))}
      </div>
      
      )}

      {activeTab === 1 && (
        <div>
          {/* Featured blogs */}
          {blogData?.blogs.map((blog: Blog, index:number) => {
            if (blog.isHeadLine === true && blog.status === 'approved') {
              return (
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
                  blog={blog}
                />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      {activeTab === 2 && (
       <div>
       {/* Popular blogs */}
       {blogData?.blogs
         ?.filter((blog: Blog) => blog.status === 'approved') // Filter approved blogs
         .sort((a: Blog, b: Blog) => b.likes - a.likes) // Sort by likes in descending order
         .map((blog: Blog, index:number) => (
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
             blog={blog}
           />
           </div>
         ))}
     </div>
     
      )}

      {activeTab === 3 && (
        <div>
          {blogData?.blogs.map((blog:Blog, index:number)=> {
            if(blog.author?.email === user?.email){
              return (
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
                  isAuthor={true} // to show edit and delete buttons for the author's blog post.
                  blog={blog}
                />
                </div>
              );
            }
            return null;  // to prevent rendering blogs of other users if logged in user is not the author of the blog.
          })
          }
        </div>
      )}
    </main>
  );
};

export default ViewBlog;
