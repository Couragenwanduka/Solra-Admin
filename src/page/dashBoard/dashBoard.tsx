import React, { useState } from 'react';
import LogoSolra from '../../component/Logo/Logo';
import { MdDashboard, MdPostAdd, MdOutlineApproval } from 'react-icons/md';
import { CiViewList } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa6';
import { IoIosLogOut } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi'; 
import classNames from 'classnames';
import DashBoardScreen from './screen/dashBoard';
import PostBlog from './screen/postBlog';
import ViewBlog from './screen/viewBlog';
import ApproveBlog from './screen/approveBlog';
import User from './screen/user';
import Setting from './screen/setting';
import { useAuth } from '../../hooks/authContext';
import { useUser } from '../../hooks/userDetails';

const USER_KEY = 'user';

const DashBoard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(0);
  const { logout } = useAuth();
  const [openSideBar, setOpenSideBar] = useState(true); // Sidebar is open by default

  const toggleSideBar = () => setOpenSideBar(!openSideBar);

  const clearLocalStorage = () => {
    localStorage.removeItem(USER_KEY);
    logout();
    window.location.replace('/');
  };

  type UserRole = 'Admin' | 'Developer' | 'Editor' | 'Cheif Editor';

  const roleTabs: Record<UserRole, { icon: React.JSX.Element; label: string; content: React.JSX.Element; action?: () => void }[]> = {
    Admin: [
      { icon: <MdDashboard />, label: 'Dashboard', content: <DashBoardScreen /> },
      { icon: <MdPostAdd />, label: 'Post Blog', content: <PostBlog /> },
      { icon: <CiViewList />, label: 'View Blog', content: <ViewBlog /> },
      { icon: <IoSettingsOutline />, label: 'Setting', content: <Setting /> },
      { icon: <IoIosLogOut />, label: 'Log out', content: <h2>Log Out Content</h2>, action: clearLocalStorage }
    ],
    Developer: [
      { icon: <MdDashboard />, label: 'Dashboard', content: <DashBoardScreen /> },
      { icon: <MdPostAdd />, label: 'Post Blog', content: <PostBlog /> },
      { icon: <CiViewList />, label: 'View Blog', content: <ViewBlog /> },
      { icon: <MdOutlineApproval />, label: 'Approve Blog', content: <ApproveBlog /> },
      { icon: <FaRegUser />, label: 'User', content: <User /> },
      { icon: <IoSettingsOutline />, label: 'Setting', content: <Setting /> },
      { icon: <IoIosLogOut />, label: 'Log out', content: <h2>Log Out Content</h2>, action: clearLocalStorage }
    ],
    Editor: [
      { icon: <MdDashboard />, label: 'Dashboard', content: <DashBoardScreen /> },
      { icon: <MdPostAdd />, label: 'Post Blog', content: <PostBlog /> },
      { icon: <CiViewList />, label: 'View Blog', content: <ViewBlog /> },
      { icon: <IoSettingsOutline />, label: 'Setting', content: <Setting /> },
      { icon: <IoIosLogOut />, label: 'Log out', content: <h2>Log Out Content</h2>, action: clearLocalStorage }
    ],
    'Cheif Editor': [
      { icon: <MdDashboard />, label: 'Dashboard', content: <DashBoardScreen /> },
      { icon: <MdPostAdd />, label: 'Post Blog', content: <PostBlog /> },
      { icon: <CiViewList />, label: 'View Blog', content: <ViewBlog /> },
      { icon: <MdOutlineApproval />, label: 'Approve Blog', content: <ApproveBlog /> },
      { icon: <IoSettingsOutline />, label: 'Setting', content: <Setting /> },
      { icon: <IoIosLogOut />, label: 'Log out', content: <h2>Log Out Content</h2>, action: clearLocalStorage }
    ]
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const tabs = user?.role && roleTabs[user.role as UserRole] ? roleTabs[user.role as UserRole] : roleTabs['Editor'];

  return (
    <div className="flex font-inter h-screen overflow-scroll">
      {/* Sidebar */}
      <section className={classNames( 'bg-[#141414] h-screen fixed top-0 left-0 transition-all duration-300 z-50',
          {
            'w-[70px]': !openSideBar,
            'w-[230px]': openSideBar,
          }
        )}
      >
        <div className="flex justify-between items-center p-4 mt-8 ml-5">
          {openSideBar && <LogoSolra />}
          <button onClick={toggleSideBar} className="text-white text-2xl md:hidden">
            {openSideBar ? 'X' : <GiHamburgerMenu />}
          </button>
        </div>
        <div className="flex flex-col mt-10 gap-3 ml-5">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index);
                if (tab.action) tab.action();
              }}
              className={classNames(
                'flex items-center gap-4 text-lg w-[99.5%]  rounded-l-xl px-4 py-4',
                {
                  'justify-center': !openSideBar,
                  'justify-start': openSideBar,
                  'bg-[#191919] text-white font-bold': activeTab === index,
                  'text-text-colour': activeTab !== index,
                }
              )}
            >
              <span className="text-xl">{tab.icon}</span>
              {openSideBar && tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Panels */}
      <div className="flex-grow z-10">
        {tabs[activeTab]?.content || <h2 className="text-center text-gray-500">Select a tab to display content</h2>}
      </div>
    </div>
  );
};

export default DashBoard;
