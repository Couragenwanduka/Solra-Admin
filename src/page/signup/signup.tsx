import RightPanel from "./component/rightPanel";
import LeftPanel from "./component/leftPanel";
const Signup = () => {
  return (
    <main className="flex bg-[#141414]">
      <section className="w-[50%] p-5">
        <RightPanel />
      </section>
      <section className="w-[50%] p-5">
        <LeftPanel />
      </section>
    
    </main>
  )
}

export default Signup
