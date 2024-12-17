import ViewBlogUi from "../component/view/viewBlogsUi"
import HeaderNav from "../component/nav/header"
import { useState } from "react"

const ViewBlog = () => {
    const [activeTab, setActiveTab]= useState(0);

  return (
    <main className="h-screen overflow-scroll">
    <div>
        <HeaderNav />
    </div>
    <div>
        <button onClick={() => setActiveTab(0)} className={`px-4 py-2 rounded-md ${activeTab === 0? "text-peach underline": "text-text-colour"}`}>All</button>
        <button onClick={() => setActiveTab(1)} className={`px-4 py-2 rounded-md ${activeTab === 1? "text-peach underline": "text-text-colour"}`}>Featured</button>
        <button onClick={() => setActiveTab(2)} className={`px-4 py-2 rounded-md ${activeTab === 2? "text-peach underline": "text-text-colour"}`}>Popular</button>
        <button onClick={() => setActiveTab(3)} className={`px-4 py-2 rounded-md ${activeTab === 3? "text-peach underline": "text-text-colour"}`}>My Post</button>
    </div>
      <div className="mt-5">
      <ViewBlogUi 
        isBlog={false}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />
      <ViewBlogUi 
        isBlog={false}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />
      <ViewBlogUi 
        isBlog={true}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />
      <ViewBlogUi 
        isBlog={true}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />
      <ViewBlogUi 
        isBlog={true}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />
      <ViewBlogUi 
        isBlog={true}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />
      <ViewBlogUi 
        isBlog={true}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />
      <ViewBlogUi 
        isBlog={true}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />
      <ViewBlogUi 
        isBlog={true}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />
      <ViewBlogUi 
        isBlog={true}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />
      <ViewBlogUi 
        isBlog={false}
        authorName="Courage Nduka"
        category="Blockchain"
        postDate="December 20, 2024"
        title="Tech Giants Announce New Product Line"
        description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
        likes={200}
        shares={200}
        />

      </div>
    </main>
  )
}

export default ViewBlog