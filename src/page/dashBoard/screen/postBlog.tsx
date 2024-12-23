import { useState } from "react";
import PostWithImage from "../component/post/postWithImage";
import PostWithVideo from "../component/post/postWithVideo";

const PostBlog = () => {
  const [activeTab, setActiveTab] = useState(0); // For Post and Preview tabs
  const [previewTab, setPreviewTab] = useState(0); // For Post with Image and Post with Video
 

  return (
    <main className="font-inter p-4 h-screen overflow-hidden">
      {/* Header: Post and Preview */}
      <div className="flex gap-4 mb-4 justify-center items-center">
        <button
          onClick={() => setActiveTab(0)}
          className={`px-4 py-2 rounded-md font-inter text-lg ${
            activeTab === 0 ? "text-peach underline" : "text-text-colour"
          }`}
        >
          Post
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`px-4 py-2 rounded-md font-inter text-lg ${
            activeTab === 1 ? "text-peach underline" : "text-text-colour "
          }`}
        >
          Preview
        </button>
      </div>

      {/* Sub-tabs: Post with Image and Post with Video */}
      {activeTab === 0 && (
        <div className="flex gap-4 mb-4 justify-center items-center mt-5">
          <button
            onClick={() => setPreviewTab(0)}
            className={`px-4 py-2 rounded-md ${
              previewTab === 0 ? "text-peach underline" : "text-text-colour"
            }`}
          >
            Post with Image
          </button>
          <button
            onClick={() => setPreviewTab(1)}
            className={`px-4 py-2 rounded-md ${
              previewTab === 1 ? "text-peach underline" : "text-text-colour"
            }`}
          >
            Post with Video
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="mt-4 h-screen overflow-scroll pb-56">
        {activeTab === 0 ? (
          previewTab === 0 ? (
            <div className="flex justify-center">
                <PostWithImage/>
            </div>
          ) : (
            <div className="flex justify-center">
                <PostWithVideo/>
            </div>
          )
        ) : (
          <div>Preview Content</div>
        )}
      </div>
    </main>
  );
};

export default PostBlog;
