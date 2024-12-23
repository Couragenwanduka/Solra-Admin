import { FiBell } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useUser } from "../../../../hooks/userDetails";

const HeaderNav = () => {
  const { user } = useUser();

  return (
    <main className="flex justify-between items-center h-28 w-full font-inter">
      <div className="w-6/12 flex h-10 border border-text-colour/50 pr-3 pl-3 rounded-lg ml-7">
        <input
          type="text"
          placeholder="search ....."
          className="bg-transparent w-full placeholder:text-text-colour/50"
        />
        <button>
          <CiSearch className="text-white" />
        </button>
      </div>

      <div className="w-6/12 h-10 flex justify-end gap-7 mr-7">
        <button>
          <FiBell className="text-xl text-text-colour/50" />
        </button>
        <button className="flex justify-center items-center gap-3">
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
          <span className="text-black flex flex-col">
            <p className="text-white text-[15px]">{`${user?.firstName} ${user?.lastName}`}</p>
            <p className="text-[14px] text-text-colour/50">{user?.role}</p>
          </span>
        </button>
      </div>
    </main>
  );
};

export default HeaderNav;
