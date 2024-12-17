import { useState } from "react"
import { FaChevronDown } from "react-icons/fa";

const DropDown = () => {
    const [isOpen , setIsOpen] = useState(false)

    const options = ["Option 1", "Option 2", "Option 3"];

    const handleOptionClick = (options:string) => {
       console.log(options)
       setIsOpen(false)
    }
    return (
        <div className="relative inline-block w-full">
          {/* Dropdown Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="py-2 bg-transparent text-white  flex justify-between w-full items-center border-b  border-text-colour/50 h-14"
          >
            <p className="text-text-colour">Category </p>
            <p><FaChevronDown className="ml-2 text-text-colour" /></p>
          </button>
    
          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute mt-2 w-full bg-[#191919] rounded-md shadow-lg z-10">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="block w-full px-4 py-2 text-left hover:bg-[#141414]"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      );
}

export default DropDown