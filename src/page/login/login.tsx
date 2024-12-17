import LeftPanel from "./component/leftPanel";
import RightPanel from "./component/rightPanel";

const Login = () => {
  return (
   <main className="flex bg-[#141414] justify-center items-center">
       <section className="w-[50%] p-5">
           <RightPanel/>
       </section>
       <section className="w-[50%] p-5">
           <LeftPanel/>
       </section>
   </main>
  )
}

export default Login