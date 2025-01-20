import React from "react";
import { FiBell } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useUser } from "../../../../hooks/userDetails";

const HeaderNav = () => {
  const { user } = useUser();

  return (
    <main className="flex justify-between items-center h-28 w-full font-inter">
      <div className="w-6/12 h-10 border border-text-colour/50 pr-3 pl-3 rounded-lg md:ml-[15.5rem] hidden md:flex">
        <input
          type="text"
          placeholder="search ....."
          className="bg-transparent w-full placeholder:text-text-colour/50"
        />
        <button>
          <CiSearch className="text-white" />
        </button>
      </div>

      <div className="md:w-6/12 w-full h-10 flex md:justify-end justify-center ml-14  gap-9 md:gap-7 md:mr-7">
        <button>
          <FiBell className="text-xl text-text-colour/50" />
        </button>
        <div className="flex justify-center items-center md:gap-3 gap-5">
          <span className="rounded-full w-9 h-9 border border-text-colour/50 flex justify-center items-center">
            {/* Conditionally render the profile image or the default icon */}
            {user?.picture ? (
              <img
                className="rounded-full w-full h-full object-cover"
                src={user?.picture}
                alt="user avatar"
              />
            ) : (
              <IoPersonOutline className="text-xl text-text-colour/50" />
            )}
          </span>
          <span className="text-black flex flex-col ml-3 md:ml-0">
            <p className="text-white text-[15px]">{`${user?.firstName} ${user?.lastName}`}</p>
            <p className="text-[14px] text-text-colour/50">{user?.role}</p>
          </span>
        </div>
      </div>
    </main>
  );
};

export default HeaderNav;
