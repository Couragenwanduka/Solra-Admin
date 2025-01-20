import LeftPanel from "./component/leftPanel";
import RightPanel from "./component/rightPanel";

const Login = () => {
  return (
   <main className="flex bg-[#141414] justify-center items-center">
       <section  className="md:w-[50%] md:p-5 p-1 h-screen md:h-full mt-16 md:mt-0">
           <RightPanel/>
       </section>
       <section className="w-[50%] p-5 hidden md:block ">
           <LeftPanel/>
       </section>
   </main>
  )
}

export default Login