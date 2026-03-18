import Sidebar from "../../components/Sidebar";
import taloy from "../../assets/taloy.png"
import { GiMoneyStack } from "react-icons/gi";
import { HiUserAdd } from "react-icons/hi";
import AdminBarberCard from "../../components/AdminBarberCard";
import { useEffect, useRef, useState } from "react";
import { getBarbers, getTopPerformer, getTotalBarbers, updateBarberStatus } from "../../services/barberService";
import { FaPlusCircle } from "react-icons/fa";


const Barbers = () => {
  const [ barbers, setBarbers ] = useState([]);
  const [ error, setError ] = useState(null); 
  const [ barbersCount, setBarbersCount ] = useState(0)
  const [ topPerformer, setTopPerformer ] = useState([]);

  const fetchBarbersCount = async() => {
    try{
       const count = await getTotalBarbers();
       setBarbersCount(count);
    }catch(err){
      console.log(err)
    }
   

  }
  const fetchTopPerformer = async() => {
    try{
      const sorted = await getTopPerformer();
      setTopPerformer(sorted)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchBarbers = async() => {
      try{
        const  data  = await getBarbers();
        setBarbers(data)
      }catch(err){
        console.log(err)
        setError(err);
      }
      
    }
    fetchBarbers();
    fetchBarbersCount();
    fetchTopPerformer();
  },[])

  console.log("top performer:", topPerformer)
  const handleUpdateStatus = async(id, newStatus) => {
    try{
      await updateBarberStatus(id,newStatus )
      setBarbers(prev => prev.map(b => b.id === id ? {...b, status: newStatus} : b))
    }catch(err){
      console.log(err);
    }
   
  }
return(
  <div className="bg-[#0f1309] flex min-h-screen w-full"> {/* darker bg */}
    <Sidebar/>
    <div className="flex-1 p-8 flex flex-col gap-4">
      
      {/* Top Stats */}
      <div className="flex items-stretch gap-4">
        <div className="border border-white/[0.07] rounded-2xl p-8 flex items-center flex-1 bg-[#1a1f14] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col">
            <p className="uppercase text-gray-500 text-xs tracking-widest">top performer</p>
            <h2 className="text-5xl text-[#f0ede6] font-bold tracking-tight">{topPerformer[0]?.name}</h2>
            <div className="flex items-center gap-1 mt-1">
              <GiMoneyStack className="text-green-400"/>
              <p className="text-gray-400 text-sm">{topPerformer[0]?.count} Bookings</p>
            </div>
          </div>
          <div className="h-20 w-20 overflow-hidden rounded-xl ml-auto border-2 border-white/[0.07]">
            <img src={taloy} alt="" className="w-full h-full object-cover"/>
          </div>
        </div>

        <div className="border border-white/[0.07] rounded-2xl p-8 w-72 bg-[#1a1f14] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <p className="uppercase text-gray-500 text-xs tracking-widest">total barbers</p>
          <p className="text-[#f0ede6] text-6xl font-bold mt-2">{barbersCount}</p>
        </div>
      </div>

      {/* Barbers Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#f0ede6] text-lg font-semibold">Artisan Staff</p>
            <span className="text-sm text-gray-500">Manage and assign roles to your barbers</span>
          </div>
          <button className="inline-flex gap-2 items-center px-4 py-2 bg-[#1a1f14] rounded-xl border border-white/[0.07] text-gray-300 font-semibold text-sm hover:bg-white/[0.06] transition-colors">
            <HiUserAdd className="text-green-400"/>
            <span className="uppercase tracking-widest text-xs">add new barber</span>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {barbers.map(barber => (
            <AdminBarberCard key={barber.id} barber={barber} onStatusChange={handleUpdateStatus}/>
          ))}
          <div className="w-52 border border-gray-400 border-dashed h-full rounded-2xl flex items-center justify-center cursor-pointer group hover:bg-[#1a1f14]">
          
            <FaPlusCircle className="h-24 w-24 text-gray-600 group-hover:text-slate-500"/>
     
          </div>
        </div>
      </div>

    </div>
  </div>
);
}

export default Barbers;