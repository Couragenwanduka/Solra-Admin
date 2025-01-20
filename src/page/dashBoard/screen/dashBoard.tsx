import HeaderNav from "../component/nav/header";
import { BsBoxArrowUpRight } from "react-icons/bs";
import {  SiTeamviewer } from "react-icons/si";
import { TbFileLike } from "react-icons/tb";
import SimpleAreaChart from "../component/graph/graph";

const DashBoardScreen = () => {
  return (
    <main>
      <div>
        <HeaderNav />
      </div>

      <section className="flex flex-col md:flex-row justify-evenly mt-[1rem] pr-5 pl-5 gap-6 ml-[4.2rem] md:ml-52">
        <div className="md:w-[300px] w-[280px] h-[150px] bg-gradient-to-br bg-[#141414] backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-row-reverse  items-center justify-between">
          <p className=" w-10 h-10 flex justify-center items-center rounded-full"><BsBoxArrowUpRight className="text-2xl text-peach" /></p>
         <span>
            <p className="text-lg font-inter">Post</p>
            <p className="text-text-colour text-xl">100</p>
         </span>
        </div>

        <div className="md:w-[300px] w-[280px] h-[150px] bg-[#191919] shadow-lg rounded-lg p-6 flex flex-row-reverse  items-center justify-between border border-text-colour/50">
        <p> <SiTeamviewer className="text-2xl text-peach"  /></p>
        <span>
            <p className="text-lg font-inter">View</p>
            <p className="text-text-colour text-xl">100</p>
         </span>
        </div>

        <div className="md:w-[300px] w-[280px] h-[150px] bg-gradient-to-br bg-[#141414] backdrop-blur-md  shadow-lg rounded-lg p-6 flex flex-row-reverse  items-center justify-between">
        <p className="w-10 h-10 flex justify-center items-center rounded-full">< TbFileLike className="text-2xl text-peach" /></p>
        <span>
            <p className="text-lg font-inter">Likes</p>
            <p className="text-text-colour text-xl">100</p>
         </span>
        </div>
      </section>

      <section className="mt-16 pl-6 flex flex-col md:flex-row gap-8 md:w-[85%] pr-5 ml-[4.2rem] md:ml-48">
        <div className='hidden md:block'>
            <SimpleAreaChart/>
        </div>
        <div className="w-full">
             <p className="bg-peach w-full h-10 flex justify-center items-center text-black font-inter rounded-lg ">Lastest Post</p>
             <ul className="flex flex-col justify-center font-inter gap-4  mt-5">
                 <span>
                    <li>The Power Of Dream</li>
                    <p className="text-text-colour text-sm">28 June 2024</p>
                 </span>
                 <span>
                    <li>The Power Of Dream</li>
                    <p className="text-text-colour text-sm">28 June 2024</p>
                 </span>
                 <span>
                    <li>The Power Of Dream</li>
                    <p className="text-text-colour text-sm">28 June 2024</p>
                 </span>
                 <span>
                    <li>The Power Of Dream</li>
                    <p className="text-text-colour text-sm">28 June 2024</p>
                 </span>
             </ul>
        </div>
      </section>
    </main>
  );
};

export default DashBoardScreen;
