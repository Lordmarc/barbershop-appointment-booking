import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import Logo from "../assets/Logo.jpg";
import { FaRegCalendar } from "react-icons/fa6";
import { RxScissors } from "react-icons/rx";
import { TbRazorElectric } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { supabase } from "../lib/supabase";

const navItems = [
  { to: "/admin",              icon: MdDashboard,     label: "Dashboard"    },
  { to: "/admin/appointments", icon: FaRegCalendar,   label: "Appointments" },
  { to: "/admin/barbers",      icon: RxScissors,      label: "Barbers"      },
  { to: "/admin/services",           icon: TbRazorElectric, label: "Service"      },
  { to: "/admin/customers",          icon: FaUserFriends,   label: "Customer"     },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-w-64 min-h-screen bg-[#0f1309] border-r border-white/[0.07] p-4">

      {/* Logo */}
      <div className="flex items-center gap-3 px-2 py-3 mb-6">
        <img
          src={Logo}
          alt="Barbershop_logo"
          className="h-10 w-10 rounded-xl object-cover border border-white/[0.07]"
        />
        <div className="flex flex-col">
          <p className="text-[#f0ede6] text-sm font-bold tracking-widest uppercase leading-tight">Negro</p>
          <span className="text-[#c8a84b] text-[10px] tracking-widest uppercase leading-tight">Barbershop</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.07] mb-4" />

      {/* Nav label */}
      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-600 px-2 mb-2">Menu</p>

      {/* Nav Items */}
      <div className="flex flex-col gap-1">
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
            {isActive(to) && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#86c559]/50" />
            )}
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-auto">
        <div className="h-px bg-white/[0.07] mb-4" />
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
        >
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;