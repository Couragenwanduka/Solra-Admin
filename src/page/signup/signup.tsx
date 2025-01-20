import RightPanel from "./component/rightPanel";
import LeftPanel from "./component/leftPanel";
const Signup = () => {
  return (
    <main className="flex bg-[#141414]">
      <section className="w-[50%] p-5 hidden md:block">
        <RightPanel />
      </section>
      <section className="md:w-[50%] md:p-5 p-3 h-screen md:h-full">
        <LeftPanel />
      </section>
    
    </main>
  )
}

export default Signup
