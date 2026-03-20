import { useState } from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { useAuthContext } from "../store/AuthContext";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthContext();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="fixed top-0 z-30 w-full bg-[#0f1309]/95 backdrop-blur-sm border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img src={Logo} alt="logo" className="w-8 h-8 rounded-xl border border-white/[0.07]"/>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-[#86c559]">Negro</p>
              <p className="text-xs font-bold tracking-widest uppercase text-[#f0ede6]">Barbershop</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-all ${isActive('/') ? 'text-[#86c559]' : 'text-[#d4cfc6] hover:text-[#86c559]'}`}
            >
              Home
            </Link>
            <Link 
              to="/booking" 
              className={`text-sm font-medium transition-all ${isActive('/booking') ? 'text-[#86c559]' : 'text-[#d4cfc6] hover:text-[#86c559]'}`}
            >
              Book
            </Link>
            {!user ? (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-[#d4cfc6] hover:text-[#86c559] transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-[#86c559] text-[#0f1309] px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-[#86c559]/80 transition-all"
                >
                  Register
                </Link>
              </div>
            ) : (
              <Link 
                to="/profile" 
                className={`flex items-center gap-2 text-sm font-medium transition-all ${isActive('/profile') ? 'text-[#86c559]' : 'text-[#d4cfc6] hover:text-[#86c559]'}`}
              >
                <FaUser size={13}/>
                <span>Profile</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden w-9 h-9 border border-white/[0.07] rounded-md p-1 cursor-pointer text-[#d4cfc6] hover:bg-white/[0.06] transition-all"
          >
            <IoIosMenu className="w-full h-full"/>
          </button>

        </div>
      </div>

      <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    </>
  );
};

export default Navbar;