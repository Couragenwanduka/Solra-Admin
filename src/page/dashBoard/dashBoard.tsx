import { useState } from 'react';
import LogoSolra from '../../component/Logo/Logo';
import { MdDashboard, MdPostAdd, MdOutlineApproval } from 'react-icons/md';
import { CiViewList } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa6';
import { IoIosLogOut } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import classNames from 'classnames';
import DashBoardScreen from './screen/dashBoard';
import PostBlog from './screen/postBlog';
import ViewBlog from './screen/viewBlog';
import ApproveBlog from './screen/approveBlog';
import User from './screen/user';
import Setting from './screen/setting';
import { useAuth } from '../../hooks/authContext';

const USER_KEY = 'user';
const DashBoard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { logout } = useAuth(); // Get the logout function

  // Function to handle logout and clear local storage
  const clearLocalStorage = () => {
    localStorage.removeItem(USER_KEY);
    logout(); // Log the user out using the logout function from context
    window.location.replace('/'); // Redirect to home or login page
  };

  const tabs = [
    { icon: <MdDashboard />, label: 'Dashboard', content: <DashBoardScreen /> },
    { icon: <MdPostAdd />, label: 'Post Blog', content: <PostBlog /> },
    { icon: <CiViewList />, label: 'View Blog', content: <ViewBlog /> },
    { icon: <MdOutlineApproval />, label: 'Approve Blog', content: <ApproveBlog /> },
    { icon: <FaRegUser />, label: 'User', content: <User /> },
    { icon: <IoSettingsOutline />, label: 'Setting', content: <Setting /> },
    { 
      icon: <IoIosLogOut />, 
      label: 'Log out', 
      content: <h2>Log Out Content</h2>, 
      action: clearLocalStorage // Only set the logout action for this tab
    },
  ];

  return (
    <div className="flex font-inter h-screen overflow-scroll">
      {/* Sidebar */}
      <section className="w-[23%] bg-[#141414] h-screen hidden lg:block">
        <div className="flex pt-10 pl-12">
          <LogoSolra />
        </div>
        <div className="flex flex-col justify-center items-start mt-10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index); // Set active tab
                if (tab.action) tab.action(); // If this tab has an action (like logout), call it
              }}
              className={classNames(
                'flex items-center gap-4 text-lg w-full ml-5 rounded-l-xl px-4 py-2 text-left',
                {
                  'bg-[#191919] text-white font-bold pl-5': activeTab === index,
                  'text-text-colour': activeTab !== index,
                }
              )}
            >
              <span className="w-10 h-10 flex justify-center items-center text-xl">
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Panels */}
      <div className="flex-grow w-[77%]">
        {tabs[activeTab]?.content || (
          <h2 className="text-center text-gray-500">Select a tab to display content</h2>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
