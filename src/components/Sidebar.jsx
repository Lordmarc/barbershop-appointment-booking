import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import Logo from "../assets/Logo.jpg";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { RxScissors } from "react-icons/rx";
import { TbRazorElectric } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { supabase } from "../lib/supabase";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const handleActiveTab = () => {
    setIsActive(true);
  } 
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const activeTab = (path) => location.pathname === path ? 'text-black bg-primary ' : 'hover:bg-slate-500 hover:text-neutral-dark text-slate-500 transition-all';
  return(
    <div className="p-4 flex flex-col min-w-72 border-r border-neutral-border">
        <div className="flex items-center gap-2 mb-4">
          <img
            src={Logo}
            alt="Barbershop_logo"
            className="h-10 w-10 rounded-md"
          />
          <div className="uppercase flex flex-col justify-center">
            <p className="leading-none tracking-wildest">Negro</p>
            <span className="leading-none ">Barbershop</span>
          </div>

        </div>

        <div className="flex flex-col gap-2">
          <Link to="/admin" className={`flex items-center gap-1 p-2 rounded-md ${ activeTab('/admin')}`}>
          <MdDashboard/>
            <p>Dashboard</p>
          </Link>

          <Link to="/admin/appointments" className={`flex items-center gap-1 p-2 rounded-md ${ activeTab('/appointments')}`}>
          <FaRegCalendar/>
            <p>Appointments</p>
          </Link>

          <Link to="/admin/barbers" className={`flex items-center gap-1 p-2 rounded-md ${ activeTab('/barbers')}`}>
          <RxScissors/>
            <p>Barbers</p>
          </Link>

          <Link to="/services" className={`flex items-center gap-1 p-2 rounded-md ${ activeTab('/services')}`}>
          <TbRazorElectric/>
            <p>Service</p>
          </Link>

          <Link to="/customers" className={`flex items-center gap-1 p-2 rounded-md ${ activeTab('/barberss')}`}>
          <FaUserFriends/>
            <p>Customer</p>
          </Link> 
        </div>

        <div 
          className="mt-auto border-t border-neutral-border py-2"
          onClick={handleLogout}>
            <button>Logout</button>
        </div>
      </div>

  )
}

export default Sidebar;