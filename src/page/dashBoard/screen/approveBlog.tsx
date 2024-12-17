import ApproveBlogUi from "../component/approve/approveBlogUi"
import { useState } from "react"

const ApproveBlog = () => {
    const [activeTab, setActiveTab]= useState(0);
  return (
     <main className="h-screen overflow-scroll"> 
      <div className="mt-10 mb-5">
        <button onClick={() => setActiveTab(0)} className={`px-4 py-2 rounded-md ${activeTab === 0? "text-peach underline": "text-text-colour"}`}>New</button>
        <button onClick={() => setActiveTab(1)} className={`px-4 py-2 rounded-md ${activeTab === 1? "text-peach underline": "text-text-colour"}`}>Approve</button>
        <button onClick={() => setActiveTab(2)} className={`px-4 py-2 rounded-md ${activeTab === 2? "text-peach underline": "text-text-colour"}`}>UnApproved</button>
        <button onClick={() => setActiveTab(3)} className={`px-4 py-2 rounded-md ${activeTab === 3? "text-peach underline": "text-text-colour"}`}>Pending</button>
    </div>
        <div>
            <ApproveBlogUi
            isBlog={false}
            authorName="Courage Nduka"
            category="Blockchain"
            postDate="December 20, 2024"
            title="Tech Giants Announce New Product Line"
            description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
            likes={200}
            shares={200}
            />
            <ApproveBlogUi
            isBlog={false}
            authorName="Courage Nduka"
            category="Blockchain"
            postDate="December 20, 2024"
            title="Tech Giants Announce New Product Line"
            description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
            likes={200}
            shares={200}
            />
            <ApproveBlogUi
            isBlog={true}
            authorName="Courage Nduka"
            category="Blockchain"
            postDate="December 20, 2024"
            title="Tech Giants Announce New Product Line"
            description="Explore the latest innovations from tech industry leaders, unveiling new products that promise to transform the digital landscape"
            likes={200}
            shares={200}
            />
            <ApproveBlogUi
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

export default ApproveBlog