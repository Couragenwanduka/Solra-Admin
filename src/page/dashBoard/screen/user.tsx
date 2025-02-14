import HeaderNav from "../component/nav/header";
import { useQuery } from "@tanstack/react-query";
import RoleDropDown from "../component/dropDown/roleDropDown";
import apiFunctions from "../../api";
import { useState } from "react";
import BooleanDropDown from "../component/dropDown/verifyDropDown";

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

const User = () => {
    const [activeTab, setActiveTab] = useState(0);
    const { data: userData, isLoading, isError } = useQuery(
        {
            queryKey: ["userData"], 
            queryFn:apiFunctions.getAllUser
        }
    );

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      console.error("Error fetching user data:", isError);
      return <div>Error fetching user data.</div>;
    }
  return (
   <main className="h-screen overflow-scroll ml-56 bg-[#191919]">
     <div>
       <HeaderNav />
     </div>
     <div className="pl-3">
        <button onClick={() => setActiveTab(0)} className={`px-4 py-2 rounded-md ${ activeTab === 0 ? "text-peach underline" : "text-text-colour"}`}>
         All
        </button>
        <button onClick={() => setActiveTab(1)} className={`px-4 py-2 rounded-md ${ activeTab === 1 ? "text-peach underline" : "text-text-colour"}`}>
          New
        </button>
      </div>

      {/* Render blogs based on activeTab */}
      {activeTab === 0 && (
        <div className="grid grid-rows-3 grid-cols-3 gap-3 pl-7">
        {userData?.users.map((user:User, index:number) => {
            return (
            <div  key={index}>
                  <img src={user.picture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACUCAMAAACz6atrAAAAY1BMVEX///9NTU9JSUv7+/txcXJGRkg9PT9AQEKbm5yrq6xDQ0VYWFrW1tYxMTTR0dGKiovs7Ozk5OR3d3i3t7d9fX6Tk5Q2NjlSUlNiYmOEhIXz8/Pe3t7Ly8vCwsKjo6NqamsfHyKh9lZxAAAEXElEQVR4nO2b2ZaiMBCGJSEJBIJsAqJAv/9TjugwardKFqroOYfvkqv/VFILlardbmNjY2PjfyU9nbsiDMOiO5/StcU8kvV5E0l+Q0ZN3mdrS7pxCpgShHh3CBGKBae1he3i0uPeK7hXxqsqyxrFXiobYapZ8WgP7L2yqzp2WElZEomPykZElKwhrRCfjfbXdKJAV0aD1y7wEx5QZG37SlOa51V7VGX0MH/V7ogDpuUCfatdLRfgSet079oE77CkxWRezTcIVo5odILHM6zBkaYdPR7hKFcuqy2keV6NkVv3JuHjjkCIcqmykuZ5Cr4c3ktLbRLccGlkKc3zImjDFXa3bQS6IqGl7ZFeDrWETautvdkuhmtBtSW2XjqiYGvgwMlusLlhME/zd8gAqs0+goxEkNJSu1w6UUNGuJOTNM+D7EMkjtogHTVxcYWLM2zafp+23+wLlvX4BGgMoY6xF7QQaZxyFuyPoHVFPgJclZ/NGiHPVGdQbdZ/WSPAf1o0N+83TLAcuNUV2jQcbvAQVtruZB/havDXEOtDZTm0tF1s3XNAaMHldiFOwpvNuhYBrUH+YdQjnxA4r0e0suj3Vkht/LP5jZOw6eqBg3EPH/E9MDe7cgLDRyfSweRY5YA6XdAO+pYTA/JDYOprv1H6+DMZmr18jN79T0IxH+eIgC6M3pA18rM6ItebdKCF9+n/ofIK7OfwR9KQydcF3eV7uPZgEi1KWX2XxypZrmqzCZoVA+dCshtScD4U2W9Q9pdT1x/2x+Nxf+i79aekNjY2NtyhbZvGt/HZO0V3jtO2XTP8tkkRlBFXqqr4M1WlFI/KoEhgn3NfQ7PQbzwh2PsqiTAhvMYPcdMXPfe14np/0ISruj9jyaP9IDWFTfLk0GOoi49Koxb/IU+oI3SPKy6Z9VwNAx2Ujv0PY9DzMOVDqWsD6fLycbWdDCCCCu24q7KrOt4t7hVpad+8f4aXC//idPUSRrsh6yWnVmlv0ap8D6mWi3apYbttHpEvdK6Zxi6AsbhokWZEXLvEtHeweoFQl6glr9od4j5xlhAYaeM2kqO4+AtI2ciX07E6zlzM4TIrnRqVaeYQbh1KWh/CQx9hvm3qPy4f174jjnbSCpd5C10qq4Fkx5ktXWwiCbXY7rCBNeZ532q7wwbzjZAES9pFnGEIbh3mZ0xhuVkgQfHRCUNfXa4C10GaSHMaaTfHZAg+jXBi2wQxWFfp8Zz0Bu+1tWFLu4jTlYbqpDd0XZX6uLdthPh6mQspyX8Tp5fy0TLpI3pZlYL9WX2CEJ1DtR4MdENrrPCAm68mpMY4FXUaGbeHaNSYDkOybmiM2DosSrqhsWaJXII8aJuNInTAK3ifYbOjaO06Xjoi50rzbJ3oNqLmOjcdfg0yUc21zx12AFyZ3SFwWohxY3adBryt9R7mz2hzW8ByY2519hdrc1xcc9T2OfjSmpG1YPWMttxfj7kdKbomn6VtbGxsbCDwB1LQSPCiqHnAAAAAAElFTkSuQmCC'}  alt="User Picture" className="w-72 h-72 rounded-t-md"/>
                  <div className="bg-[#141414] w-72 border border-text-colour/50 h-36 p-2 rounded-b-md font-inter">
                     <span className="flex justify-between">
                        <h2 className="text-text-colour">Name:</h2>
                        <h2 className=" w-48 text-start">{user.firstName} {user.lastName}</h2>
                     </span>
                     <span className="flex justify-between mt-3">
                        <h2 className="text-text-colour">Email:</h2>
                        <div className="relative group w-48">
                            <h2 className="text-start truncate">{user.email}</h2>
                            <div className="absolute top-0 left-0 w-full bg-white p-2 text-text-colour rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                {user.email}
                            </div>
                        </div>
                     </span>
                     {user.phoneNumber && (
                        <span className="flex justify-between mt-3">
                            <h2 className="text-text-colour">Phone:</h2>
                            <h2 className=" w-48 text-start">{user.phoneNumber}</h2>
                        </span>
                    )}
                     <span className="flex justify-between items-center mt-3">
                        <h2 className="text-text-colour">Role:</h2>
                        {/* <h2 className=" w-48 text-start">{user.role}</h2> */}
                        <RoleDropDown role={user.role || ''}  id={user._id}/>
                     </span>    
                  </div>
         </div>
            )
        })}
     </div>
      )}
     {activeTab === 1 && (
  <div className="grid grid-rows-3 grid-cols-3 gap-3 pl-7">
    {userData?.users.filter((user:User ) => !user.isVerified).length > 0 ? (
      userData?.users.map((user: User, index: number) => {
        if (user.isVerified === false) {
          return (
            <div key={index}>
              <img
                src={user.picture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACUCAMAAACz6atrAAAAY1BMVEX///9NTU9JSUv7+/txcXJGRkg9PT9AQEKbm5yrq6xDQ0VYWFrW1tYxMTTR0dGKiovs7Ozk5OR3d3i3t7d9fX6Tk5Q2NjlSUlNiYmOEhIXz8/Pe3t7Ly8vCwsKjo6NqamsfHyKh9lZxAAAEXElEQVR4nO2b2ZaiMBCGJSEJBIJsAqJAv/9TjugwardKFqroOYfvkqv/VFILlardbmNjY2PjfyU9nbsiDMOiO5/StcU8kvV5E0l+Q0ZN3mdrS7pxCpgShHh3CBGKBae1he3i0uPeK7hXxqsqyxrFXiobYapZ8WgP7L2yqzp2WElZEomPykZElKwhrRCfjfbXdKJAV0aD1y7wEx5QZG37SlOa51V7VGX0MH/V7ogDpuUCfatdLRfgSet079oE77CkxWRezTcIVo5odILHM6zBkaYdPR7hKFcuqy2keV6NkVv3JuHjjkCIcqmykuZ5Cr4c3ktLbRLccGlkKc3zImjDFXa3bQS6IqGl7ZFeDrWETautvdkuhmtBtSW2XjqiYGvgwMlusLlhME/zd8gAqs0+goxEkNJSu1w6UUNGuJOTNM+D7EMkjtogHTVxcYWLM2zafp+23+wLlvX4BGgMoY6xF7QQaZxyFuyPoHVFPgJclZ/NGiHPVGdQbdZ/WSPAf1o0N+83TLAcuNUV2jQcbvAQVtruZB/havDXEOtDZTm0tF1s3XNAaMHldiFOwpvNuhYBrUH+YdQjnxA4r0e0suj3Vkht/LP5jZOw6eqBg3EPH/E9MDe7cgLDRyfSweRY5YA6XdAO+pYTA/JDYOprv1H6+DMZmr18jN79T0IxH+eIgC6M3pA18rM6ItebdKCF9+n/ofIK7OfwR9KQydcF3eV7uPZgEi1KWX2XxypZrmqzCZoVA+dCshtScD4U2W9Q9pdT1x/2x+Nxf+i79aekNjY2NtyhbZvGt/HZO0V3jtO2XTP8tkkRlBFXqqr4M1WlFI/KoEhgn3NfQ7PQbzwh2PsqiTAhvMYPcdMXPfe14np/0ISruj9jyaP9IDWFTfLk0GOoi49Koxb/IU+oI3SPKy6Z9VwNAx2Ujv0PY9DzMOVDqWsD6fLycbWdDCCCCu24q7KrOt4t7hVpad+8f4aXC//idPUSRrsh6yWnVmlv0ap8D6mWi3apYbttHpEvdK6Zxi6AsbhokWZEXLvEtHeweoFQl6glr9od4j5xlhAYaeM2kqO4+AtI2ciX07E6zlzM4TIrnRqVaeYQbh1KWh/CQx9hvm3qPy4f174jjnbSCpd5C10qq4Fkx5ktXWwiCbXY7rCBNeZ532q7wwbzjZAES9pFnGEIbh3mZ0xhuVkgQfHRCUNfXa4C10GaSHMaaTfHZAg+jXBi2wQxWFfp8Zz0Bu+1tWFLu4jTlYbqpDd0XZX6uLdthPh6mQspyX8Tp5fy0TLpI3pZlYL9WX2CEJ1DtR4MdENrrPCAm68mpMY4FXUaGbeHaNSYDkOybmiM2DosSrqhsWaJXII8aJuNInTAK3ifYbOjaO06Xjoi50rzbJ3oNqLmOjcdfg0yUc21zx12AFyZ3SFwWohxY3adBryt9R7mz2hzW8ByY2519hdrc1xcc9T2OfjSmpG1YPWMttxfj7kdKbomn6VtbGxsbCDwB1LQSPCiqHnAAAAAAElFTkSuQmCC'}
                alt="User Picture"
                className="w-72 h-72 rounded-t-md"
              />
              <div className="bg-[#141414] w-72 border border-text-colour/50 h-36 p-2 rounded-b-md font-inter">
                <span className="flex justify-between">
                  <h2 className="text-text-colour">Name:</h2>
                  <h2 className="w-48 text-start">
                    {user.firstName} {user.lastName}
                  </h2>
                </span>
                <span className="flex justify-between mt-3">
                  <h2 className="text-text-colour">Email:</h2>
                  <div className="relative group w-48">
                    <h2 className="text-start truncate">{user.email}</h2>
                    <div className="absolute top-0 left-0 w-full bg-white p-2 text-text-colour rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {user.email}
                    </div>
                  </div>
                </span>
                {user.phoneNumber && (
                  <span className="flex justify-between mt-3">
                    <h2 className="text-text-colour">Phone:</h2>
                    <h2 className="w-48 text-start">{user.phoneNumber}</h2>
                  </span>
                )}
                <span className="flex justify-between items-center mt-3">
                  <h2 className="text-text-colour">Role:</h2>
                  <BooleanDropDown value={user.isVerified} id={user._id} />
                </span>
              </div>
            </div>
          );
        }
        return null;
      })
    ) : (
      <h1 className="text-center text-gray-500 mt-10">No new user found</h1>
    )}
  </div>
)}


     
   </main>
  )
}

export default User