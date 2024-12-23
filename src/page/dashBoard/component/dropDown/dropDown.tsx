import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import apiFunctions from "../../../api";
import useLocalStorage from "../../../../hooks/postBlog";

interface IOption {
  name: string;
  id: string;
}
interface DropDownProps {
  setChoose?: (value: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ setChoose }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: apiFunctions.getCategory,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const { saveToLocalStorage, getFromLocalStorage } = useLocalStorage();

  useEffect(() => {
    try {
      const storedData = getFromLocalStorage();
      if (storedData?.category?.category) {
        setSelected(storedData.category.category);
      }
    } catch (err) {
      console.error("Error getting data from local storage:", err);
    }
  }, [getFromLocalStorage]);

  useEffect(() => {
    try {
      if (selected) {
        setChoose?.(selected)
        saveToLocalStorage('category', selected, 'category');
      }
    } catch (err) {
      console.error("Error saving data to local storage:", err);
    }
  }, [selected, saveToLocalStorage, setChoose]);
  const handleOptionClick = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };
  

  return (
    <div className="relative inline-block w-full">
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="py-2 bg-transparent text-white flex justify-between w-full items-center border-b border-text-colour/50 h-14"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
      >
        <p className="text-text-colour">{selected || 'Category'}</p>
        <FaChevronDown className="ml-2 text-text-colour" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-[#191919] rounded-md shadow-lg z-10 mb-10">
          {isLoading ? (
            <div className="px-4 py-2 text-text-colour">Loading...</div>
          ) : (
            data?.categories?.map((option: IOption, index: number) => (
              <button
          key={index}
          onClick={() => handleOptionClick(option.name)}
          className="block w-full px-4 py-2 text-left hover:bg-[#0f0e0e] pb-4 text-text-colour"
              >
          {option.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DropDown;
