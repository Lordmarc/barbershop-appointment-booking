import Sidebar from "../../components/Sidebar";
import taloy from "../../assets/taloy.png"
import { GiMoneyStack } from "react-icons/gi";
const Barbers = () => {

  return(
    <div className="bg-neutral-dark flex min-h-screen w-full">
      <Sidebar/>
      <div className="flex-1 p-8 flex flex-col gap-4">
        <div className="flex items-stretch gap-4">
          <div className="border border-primary/15 rounded-md p-4 flex items-center flex-1 bg-primary/5">
          <div className="flex flex-col">
            <p className="uppercase text-slate-400 text-xs">top performer</p>
            <h2 className="text-3xl text-primary">Marcus "Blade" Thorne</h2>
            <div className="flex items-center gap-1 ">
              <GiMoneyStack className="text-primary"/>
              <p className="text-slate-300">123 Bookings</p>
            </div>
          </div>

          <div className="h-16 w-16 overflow-hidden rounded-md ml-auto">
            <img src={taloy} alt="" />
          </div>
          </div>
          <div className="border border-primary/15 rounded-md p-4 w-52 bg-primary/5">
            <p>total barbers</p>
            <p>12</p> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Barbers;