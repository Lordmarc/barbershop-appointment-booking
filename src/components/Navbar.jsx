import { useState } from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { useAuthContext } from "../store/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthContext();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => (location.pathname === path ? "text-primary" : "");

  return (
    <div className="navbar">
      <div
        className="border h-10 w-10 border-gray-300 rounded-md p-1 shadow-sm shadow-white"
        onClick={toggle}
      >
        <IoIosMenu className="w-full h-full" />
      </div>

      <p className="text-xl">NEGRO BARBERSHOP</p>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" />

          <div className="fixed h-full bg-neutral-dark max-w-56 w-full top-0 left-0 z-50 flex flex-col ">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-8 border-b border-neutral-border p-4">
              <img
                src={Logo}
                alt="Negro Logo"
                className="w-14 h-14 rounded-md"
              />
              <div
                className="border h-8 w-8 border-gray-300 rounded-md p-1 shadow-sm shadow-white"
                onClick={toggle}
              >
                <IoClose className=" cursor-pointer w-full h-full" />
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-4 p-4">
              <Link
                to="/"
                className={`flex gap-1 items-center text-xl cursor-pointer hover:text-primary transition-all ${isActive("/")}`}
              >
                <GoHomeFill />
                <span>Home</span>
              </Link>

              <Link
                to="/booking"
                className={`flex gap-1 items-center text-xl cursor-pointer hover:text-primary transition-all ${isActive("/booking")}`}
              >
                <FaCalendarAlt />
                <span>Book</span>
              </Link>
              { !user ? (
                <>
                  <Link to="/login" className="bg-slate-800/75 p-2 rounded-lg font-semibold">Login</Link>
                  <Link to="/register" className="bg-primary rounded-lg p-2 text-neutral-dark font-semibold">Register</Link>
                </>
                
              ) : (
              <Link
                to="/profile"
                className={`flex gap-1 items-center text-xl cursor-pointer hover:text-primary transition-all ${isActive("/profile")}`}
              >
                <FaUser />
                <span>Profile</span>
              </Link>
              )

              }
             
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
