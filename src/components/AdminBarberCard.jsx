import tools from "../assets/tools.jpg";
import taloy from "../assets/taloy.png"
import { useState, useRef, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

const statusConfig = {
  active: {
    label: "ACTIVE",
    dot: "bg-green-400 shadow-[0_0_6px_#86c559]",
    text: "text-green-300",
    border: "border-green-400/40",
  },
  on_leave: {
    label: "ON LEAVE",
    dot: "bg-yellow-400 shadow-[0_0_6px_#facc15]",
    text: "text-yellow-300",
    border: "border-yellow-400/40",
  },
  inactive: {
    label: "INACTIVE",
    dot: "bg-red-400",
    text: "text-red-300",
    border: "border-red-400/40",
  },
};

const AdminBarberCard = ({ barber, onDelete, onStatusChange }) => {
  const [status, setStatus] = useState(barber?.status || "active");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const current = statusConfig[status];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleStatusChange = (newStatus) => {
  setStatus(newStatus);        // ← update local state (para mag-update yung badge agad)
  setDropdownOpen(false);
  if (onStatusChange) onStatusChange(barber.id, newStatus); // ← i-notify yung parent
};
  return (
    <div className="relative rounded-2xl overflow-hidden flex flex-col w-56 bg-[#1a1f14] border border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

      {/* Background Image Area */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={tools}
          alt="background"
          className="w-full h-full object-cover brightness-[0.65] saturate-[0.8] hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1f14]/90" />

        {/* Status Badge Dropdown */}
        <div className="absolute top-3 right-3" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={`flex items-center gap-1.5 bg-[#14180e]/75 border ${current.border} rounded-full px-2.5 py-1 cursor-pointer transition-all hover:brightness-125`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
            <span className={`text-[10px] font-bold tracking-widest ${current.text}`}>
              {current.label}
            </span>
            <span className={`text-[9px] ${current.text} opacity-70`}>▼</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-8 bg-[#1e241a] border border-white/10 rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.6)] z-50 min-w-[130px]">
              {Object.entries(statusConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => handleStatusChange(key)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/[0.06] transition-colors ${
                    status === key ? "bg-white/[0.04]" : ""
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                  <span className={`text-[11px] font-bold tracking-widest ${config.text}`}>
                    {config.label}
                  </span>
                  {status === key && (
                    <span className="ml-auto text-white/30 text-[10px]">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Image + Actions */}
      <div className="flex items-end justify-between px-4 -mt-7 relative z-10">
        <img
          src={barber.image}
          alt="barber"
          className="w-14 h-14 rounded-xl object-cover border-2 border-[#2a3020] shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        />
        <div className="flex gap-2 pb-1">
          <button
            onClick=""
            className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 text-gray-400 flex items-center justify-center hover:bg-white/[0.12] transition-colors cursor-pointer"
          >
            <FiEdit2 size={13} />
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 text-gray-400 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
          >
            <FaRegTrashAlt size={13} />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 pt-2.5 pb-5">
        <p className="text-[#f0ede6] font-bold text-lg tracking-tight leading-tight">
          {barber.name}
        </p>
    
        <div className="h-px bg-white/[0.07] mb-3" />

        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2">
            <span className="text-[11px] text-gray-500 w-14 shrink-0">Specialty</span>
            <span className="text-[12px] text-[#d4cfc6] font-semibold">{barber.specialty}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[11px] text-gray-500 w-14 shrink-0">Shift</span>
            <span className="text-[12px] text-[#d4cfc6] font-semibold">{barber.shift}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminBarberCard;