import { useState, FC } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import apiFunctions from "../../../api";

// Define User interface
interface User {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _id?: any;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    picture?: string;
    role?: string;
    isVerified?: boolean;
    phoneNumber?: string;
}

interface Component {
  role: string;
  id:string
}

const RoleDropDown: FC<Component> = ({ role, id }) => {
    const [selectedRole, setSelectedRole] = useState(role);
  const [isOpen, setIsOpen] = useState(false);
  const roles = ['Editor', 'Admin', 'Cheif Editor', 'Developer'];

  const mutation = useMutation<{ userRole: User }, Error, string>({
    mutationFn: async (newRole) => {
      const response = await apiFunctions.assignRole(id,newRole);
      if (!response) {
        throw new Error("Failed to update user role");
      }
      return response;
    },
    onSuccess: (newRole:{userRole:User}) => {
        console.log(newRole);
      setSelectedRole(newRole.userRole.role || ''); // Update state with new role
    },
    onError: (error) => {
      console.error("Error updating user role:", error);
    },
  });

  const handleChangeRole = (roleItem:string) => {
     if(roleItem === role){
        // alert('bitch please')
        alert('user role is already' + role)
     }else{
        mutation.mutate(roleItem);
        setIsOpen(false); // Close dropdown
     }
  }

  return (
    <main className="relative w-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        className="bg-transparent text-text-colour flex justify-between w-full items-center border border-text-colour/50 px-3 py-2 rounded-md"
      >
        <div className="text-start">{selectedRole}</div>
        <FaChevronDown className="ml-2 text-text-colour" />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-[#191919] rounded-md shadow-lg z-10">
          {roles.map((roleItem) => (
            <div
              key={roleItem}
              onClick={() => {
                console.log(roleItem); // Handle selection if needed
                handleChangeRole(roleItem); // Update role state
                setIsOpen(false); // Close dropdown
              }}
              className="px-3 py-2 text-left hover:bg-[#0f0e0e] text-text-colour cursor-pointer"
            >
              {roleItem}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default RoleDropDown;
