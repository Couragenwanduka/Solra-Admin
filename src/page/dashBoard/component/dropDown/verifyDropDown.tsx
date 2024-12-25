import { useState, FC } from "react";
import { FaChevronDown } from "react-icons/fa";
import apiFunctions from "../../../api";
import { useMutation } from "@tanstack/react-query";

interface Component {
  value: boolean;
  id: string;
}

const BooleanDropDown: FC<Component> = ({ value , id}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const mutation = useMutation<{ userVerified: boolean }, Error, { id: string, status: boolean }>({  
      mutationFn: async ({ id, status }) => {
        const response = await apiFunctions.changeVerifyStatus(id, status);
      if (!response) {
        throw new Error("Failed to update user verification status");
      }
      return response;
    },
    onSuccess: (newStatus: { userVerified: boolean }) => {
        console.log(newStatus); // Log the updated status to the console
      // Update the current value with the new status
      setCurrentValue(newStatus.userVerified); // Update the current value
    },
    onError: (error) => {
      console.error("Error updating user verification status:", error);
    },
  });

  const handleChangeRole = (status:boolean) => {
    mutation.mutate({ id, status });
    setIsOpen(false); // Close dropdown
 }

  const options = [true, false];

  return (
    <main className="relative w-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        className="bg-transparent text-text-colour flex justify-between w-full items-center border border-text-colour px-3 py-2 rounded-md"
      >
        <div className="text-start">{currentValue ? "True" : "False"}</div>
        <FaChevronDown className="ml-2 text-text-colour" />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-[#191919] rounded-md shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.toString()}
              onClick={() => {
                setCurrentValue(option); // Update the current value
                setIsOpen(false); // Close dropdown
                handleChangeRole(option); // Update user verification status
              }}
              className="px-3 py-2 text-left hover:bg-[#0f0e0e] text-text-colour cursor-pointer"
            >
              {option ? "True" : "False"}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default BooleanDropDown;
