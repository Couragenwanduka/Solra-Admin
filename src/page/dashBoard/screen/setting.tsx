import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiFunctions from "../../api";
import { useUser } from "../../../hooks/userDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Setting = () => {
  const { user, setUser } = useUser();
  const [profilePic, setProfilePic] = useState<string | undefined>(user?.picture);
  const [file, setFile] = useState<File>();
 
  const mutation = useMutation<{ update: User }, Error, File>({
    mutationFn: async (picture: File) => {
      const response = await apiFunctions.updateProfilePicture(user?._id,picture);
      if (!response) {
        throw new Error("Failed to update user profile picture");
      }
      return response;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser.update); // Update user state with new profile picture
      setProfilePic(updatedUser.update.picture); // Update state with new profile picture
      toast.success("Profile picture updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating user profile picture:", error);
    },
  })


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file); // Update state with selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
   if(file){
    mutation.mutate(file)
   }
  };

  return (
    <div className="min-h-screen bg-[#191919] text-text-colour p-6  justify-center flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <ToastContainer autoClose={5000} />

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-8 ">
        <div className="relative w-32 h-32">
          <img
            src={profilePic ||'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACUCAMAAACz6atrAAAAY1BMVEX///9NTU9JSUv7+/txcXJGRkg9PT9AQEKbm5yrq6xDQ0VYWFrW1tYxMTTR0dGKiovs7Ozk5OR3d3i3t7d9fX6Tk5Q2NjlSUlNiYmOEhIXz8/Pe3t7Ly8vCwsKjo6NqamsfHyKh9lZxAAAEXElEQVR4nO2b2ZaiMBCGJSEJBIJsAqJAv/9TjugwardKFqroOYfvkqv/VFILlardbmNjY2PjfyU9nbsiDMOiO5/StcU8kvV5E0l+Q0ZN3mdrS7pxCpgShHh3CBGKBae1he3i0uPeK7hXxqsqyxrFXiobYapZ8WgP7L2yqzp2WElZEomPykZElKwhrRCfjfbXdKJAV0aD1y7wEx5QZG37SlOa51V7VGX0MH/V7ogDpuUCfatdLRfgSet079oE77CkxWRezTcIVo5odILHM6zBkaYdPR7hKFcuqy2keV6NkVv3JuHjjkCIcqmykuZ5Cr4c3ktLbRLccGlkKc3zImjDFXa3bQS6IqGl7ZFeDrWETautvdkuhmtBtSW2XjqiYGvgwMlusLlhME/zd8gAqs0+goxEkNJSu1w6UUNGuJOTNM+D7EMkjtogHTVxcYWLM2zafp+23+wLlvX4BGgMoY6xF7QQaZxyFuyPoHVFPgJclZ/NGiHPVGdQbdZ/WSPAf1o0N+83TLAcuNUV2jQcbvAQVtruZB/havDXEOtDZTm0tF1s3XNAaMHldiFOwpvNuhYBrUH+YdQjnxA4r0e0suj3Vkht/LP5jZOw6eqBg3EPH/E9MDe7cgLDRyfSweRY5YA6XdAO+pYTA/JDYOprv1H6+DMZmr18jN79T0IxH+eIgC6M3pA18rM6ItebdKCF9+n/ofIK7OfwR9KQydcF3eV7uPZgEi1KWX2XxypZrmqzCZoVA+dCshtScD4U2W9Q9pdT1x/2x+Nxf+i79aekNjY2NtyhbZvGt/HZO0V3jtO2XTP8tkkRlBFXqqr4M1WlFI/KoEhgn3NfQ7PQbzwh2PsqiTAhvMYPcdMXPfe14np/0ISruj9jyaP9IDWFTfLk0GOoi49Koxb/IU+oI3SPKy6Z9VwNAx2Ujv0PY9DzMOVDqWsD6fLycbWdDCCCCu24q7KrOt4t7hVpad+8f4aXC//idPUSRrsh6yWnVmlv0ap8D6mWi3apYbttHpEvdK6Zxi6AsbhokWZEXLvEtHeweoFQl6glr9od4j5xlhAYaeM2kqO4+AtI2ciX07E6zlzM4TIrnRqVaeYQbh1KWh/CQx9hvm3qPy4f174jjnbSCpd5C10qq4Fkx5ktXWwiCbXY7rCBNeZ532q7wwbzjZAES9pFnGEIbh3mZ0xhuVkgQfHRCUNfXa4C10GaSHMaaTfHZAg+jXBi2wQxWFfp8Zz0Bu+1tWFLu4jTlYbqpDd0XZX6uLdthPh6mQspyX8Tp5fy0TLpI3pZlYL9WX2CEJ1DtR4MdENrrPCAm68mpMY4FXUaGbeHaNSYDkOybmiM2DosSrqhsWaJXII8aJuNInTAK3ifYbOjaO06Xjoi50rzbJ3oNqLmOjcdfg0yUc21zx12AFyZ3SFwWohxY3adBryt9R7mz2hzW8ByY2519hdrc1xcc9T2OfjSmpG1YPWMttxfj7kdKbomn6VtbGxsbCDwB1LQSPCiqHnAAAAAAElFTkSuQmCC' }
            alt="Profile"
            className="w-full h-full rounded-full object-cover border border-[#303030]"
          />
          <label
            htmlFor="profile-pic"
            className="absolute bottom-0 right-0 bg-[#303030] p-2 rounded-full cursor-pointer hover:bg-[#404040]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-text-colour"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 9l-.464 6M9.232 9l.464 6m5.784-2.293a2 2 0 01-2.232 2.293 2 2 0 01-2.232-2.293M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
              />
            </svg>
          </label>
          <input
            id="profile-pic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <h2 className="mt-4">Profile Picture</h2>
      </div>

      {/* Other Settings Section */}
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-between items-center">
          <span>Name</span>
          <input
            type="text"
            className="bg-[#303030] p-2 rounded-md text-text-colour w-1/2 focus:outline-none focus:ring-2 focus:ring-[#505050]"
            placeholder="Enter username"
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Email</span>
          <input
            type="email"
            className="bg-[#303030] p-2 rounded-md text-text-colour w-1/2 focus:outline-none focus:ring-2 focus:ring-[#505050]"
            placeholder="Enter email"
          />
        </div>
        <button className="w-full mt-4 bg-[#303030] py-2 rounded-md hover:bg-[#404040] text-text-colour disabled:bg-transparent" disabled={!file} onClick={(e) => handleSubmit(e)}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Setting;
