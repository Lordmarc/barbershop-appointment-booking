import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { useAuthContext } from "../store/AuthContext";

const MobileSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuthContext();

  const isActive = (path) => location.pathname === path;

  if(!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed h-full w-72 bg-[#1a1f14] border-r border-white/[0.07] top-0 left-0 z-[70] flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="logo" className="w-10 h-10 rounded-xl border border-white/[0.07]"/>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-[#86c559]">Negro</p>
              <p className="text-xs font-bold tracking-widest uppercase text-[#f0ede6]">Barbershop</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-500/20 hover:text-red-400 hover:border-red-400/30 transition-all cursor-pointer"
          >
            <IoClose size={16}/>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 p-4">
          <Link 
            to="/" 
            onClick={onClose}
            className={`flex gap-3 items-center px-3 py-2.5 rounded-xl transition-all
              ${isActive('/') 
                ? 'bg-[#86c559]/10 text-[#86c559] border border-[#86c559]/20' 
                : 'text-[#d4cfc6] hover:bg-white/[0.06] border border-transparent'
              }`}
          >
            <GoHomeFill className="text-[#86c559]" size={15}/>
            <span className="text-sm font-semibold tracking-wide">Home</span>
          </Link>

          <Link 
            to="/booking" 
            onClick={onClose}
            className={`flex gap-3 items-center px-3 py-2.5 rounded-xl transition-all
              ${isActive('/booking') 
                ? 'bg-[#86c559]/10 text-[#86c559] border border-[#86c559]/20' 
                : 'text-[#d4cfc6] hover:bg-white/[0.06] border border-transparent'
              }`}
          >
            <FaCalendarAlt className="text-[#86c559]" size={14}/>
            <span className="text-sm font-semibold tracking-wide">Book</span>
          </Link>

          {!user ? (
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/[0.07]">
              <Link 
                to="/login" 
                onClick={onClose}
                className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-[#d4cfc6] text-sm font-semibold hover:bg-white/[0.08] transition-all"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={onClose}
                className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-[#86c559] text-[#0f1309] text-sm font-bold hover:bg-[#86c559]/80 transition-all"
              >
                Register
              </Link>
            </div>
          ) : (
            <Link 
              to="/profile" 
              onClick={onClose}
              className={`flex gap-3 items-center px-3 py-2.5 rounded-xl transition-all
                ${isActive('/profile') 
                  ? 'bg-[#86c559]/10 text-[#86c559] border border-[#86c559]/20' 
                  : 'text-[#d4cfc6] hover:bg-white/[0.06] border border-transparent'
                }`}
            >
              <FaUser className="text-[#86c559]" size={14}/>
              <span className="text-sm font-semibold tracking-wide">Profile</span>
            </Link>
          )}
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-white/[0.07]">
          <p className="text-[10px] text-gray-600 tracking-widest uppercase text-center">
            Negro Barbershop © 2026
          </p>
        </div>

      </div>
    </>
  );
};

export default MobileSidebar;