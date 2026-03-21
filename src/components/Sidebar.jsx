import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import Logo from "../assets/Logo.jpg";
import { FaRegCalendar } from "react-icons/fa6";
import { RxScissors } from "react-icons/rx";
import { TbRazorElectric } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { supabase } from "../lib/supabase";
import { useAuthContext } from "../store/AuthContext";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import placeholder from "../assets/placeholder.png";

const navItems = [
  { to: "/admin",              icon: MdDashboard,     label: "Dashboard"    },
  { to: "/admin/appointments", icon: FaRegCalendar,   label: "Appointments" },
  { to: "/admin/barbers",      icon: RxScissors,      label: "Barbers"      },
  { to: "/admin/services",     icon: TbRazorElectric, label: "Service"      },
  { to: "/admin/customers",    icon: FaUserFriends,   label: "Customer"     },
];

const SidebarContent = ({ isActive, handleLogout, profile }) => (
  <div className="flex flex-col h-full min-h-0">

    {/* Logo */}
    <div className="flex items-center gap-3 px-2 py-3 mb-6 shrink-0">
      <img src={Logo} alt="Barbershop_logo" className="h-10 w-10 rounded-xl object-cover border border-white/[0.07]"/>
      <div className="flex flex-col">
        <p className="text-[#f0ede6] text-sm font-bold tracking-widest uppercase leading-tight">Negro</p>
        <span className="text-[#c8a84b] text-[10px] tracking-widest uppercase leading-tight">Barbershop</span>
      </div>
    </div>

    <div className="h-px bg-white/[0.07] mb-4 shrink-0" />
    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-600 px-2 mb-2 shrink-0">Menu</p>

    {/* Nav Items — scrollable */}
    <div className="flex flex-col gap-1 overflow-y-auto flex-1">
      {navItems.map(({ to, icon: Icon, label }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
            ${isActive(to)
              ? "bg-[#2a3a1a] text-[#86c559] border-l-2 border-[#86c559]"
              : "text-gray-500 hover:bg-white/[0.04] hover:text-[#f0ede6] border-l-2 border-transparent"
            }`}
        >
          <Icon size={15} />
          <span>{label}</span>
          {isActive(to) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#86c559]/50" />}
        </Link>
      ))}
    </div>

    {/* Profile + Logout — always visible at bottom */}
    <div className="mt-4 shrink-0">
      <div className="flex items-center gap-2 p-4 bg-[#1a1f14] border border-white/[0.07] rounded-lg">
        <img
          src={profile?.avatar_url || placeholder}
          alt="admin_photo"
          className="h-12 w-12 rounded-md object-cover shrink-0"
        />
        <div className="min-w-0">
          <p className="leading-tight tracking-widest text-[#f0ede6] text-sm font-semibold truncate">{profile?.full_name}</p>
          <span className="text-slate-500 text-xs leading-tight tracking-widest">{profile?.role}</span>
        </div>
      </div>
      <div className="h-px bg-white/[0.07] my-4" />
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
      >
        <span>Logout</span>
      </button>
    </div>

  </div>
);

const Sidebar = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const fetchProfile = async () => {
    try {
      const data = await getCurrentUser();
      setProfile(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col min-w-64 min-h-screen bg-[#0f1309] border-r border-white/[0.07] p-4">
        <SidebarContent isActive={isActive} handleLogout={handleLogout} profile={profile} />
      </div>

      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0f1309] border-b border-white/[0.07]">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="h-8 w-8 rounded-lg object-cover border border-white/[0.07]"/>
          <p className="text-[#f0ede6] text-sm font-bold tracking-widest uppercase">Negro Barbershop</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1a1f14] border border-white/[0.07] text-gray-400 hover:text-[#86c559] transition-colors"
        >
          <HiMenu size={20} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-[#0f1309] border-r border-white/[0.07] flex flex-col transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 shrink-0">
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1a1f14] border border-white/[0.07] text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 min-h-0 px-4 pb-4">
          <SidebarContent isActive={isActive} handleLogout={handleLogout} profile={profile} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;