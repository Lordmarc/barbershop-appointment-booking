import { IoIosCalendar } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRef } from "react";

const statusTitle = [
  { name: 'Pending',   color: 'text-yellow-300 border-yellow-400/30 bg-yellow-400/10 hover:bg-yellow-400/20'   },
  { name: 'Confirmed', color: 'text-blue-300   border-blue-400/30   bg-blue-400/10   hover:bg-blue-400/20'     },
  { name: 'Completed', color: 'text-green-300  border-green-400/30  bg-green-400/10  hover:bg-green-400/20'   },
  { name: 'Cancelled', color: 'text-red-300    border-red-400/30    bg-red-400/10    hover:bg-red-400/20'     },
];

const activeColor = {
  Pending:   'bg-yellow-400/20 border-yellow-400/50 text-yellow-300',
  Confirmed: 'bg-blue-400/20   border-blue-400/50   text-blue-300',
  Completed: 'bg-green-400/20  border-green-400/50  text-green-300',
  Cancelled: 'bg-red-400/20    border-red-400/50    text-red-300',
};

const Filter = ({ statusFilter, startDate, onUpdateStartDate, onUpdateEndDate, endDate, onUpdateStatusFilter, onChangeBarber, barbers }) => {
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  return (
    <div className="bg-[#1a1f14] border border-white/[0.07] rounded-2xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)]
      flex flex-col gap-4
      lg:flex-row lg:items-stretch lg:gap-6">

      {/* Date Range */}
      <div className="flex flex-col gap-2">
        <p className="uppercase text-[10px] font-bold tracking-widest text-gray-600">date range</p>
        <div className="flex items-center bg-[#1e241a] border border-white/[0.07] rounded-xl px-3 py-2 gap-2 hover:border-white/20 transition-colors">
          <IoIosCalendar className="text-[#86c559] text-base shrink-0" />
          <input
            type="date"
            ref={startDateRef}
            value={startDate}
            onChange={(e) => onUpdateStartDate(e.target.value)}
            onClick={() => startDateRef.current.showPicker()}
            className="[&::-webkit-calendar-picker-indicator]:hidden bg-transparent text-xs text-[#d4cfc6] outline-none flex-1 min-w-0"
          />
          <span className="text-gray-600 text-xs">—</span>
          <input
            type="date"
            ref={endDateRef}
            value={endDate}
            onChange={(e) => onUpdateEndDate(e.target.value)}
            onClick={() => endDateRef.current.showPicker()}
            className="[&::-webkit-calendar-picker-indicator]:hidden bg-transparent text-xs text-[#d4cfc6] outline-none flex-1 min-w-0"
          />
        </div>
      </div>

      {/* Divider — hidden sa mobile, visible sa desktop */}
      <div className="hidden lg:block w-px bg-white/[0.07] self-stretch" />
      <div className="lg:hidden h-px bg-white/[0.07]" />

      {/* Barbers */}
      <div className="flex flex-col gap-2">
        <p className="uppercase text-[10px] font-bold tracking-widest text-gray-600">barbers</p>
        <div className="relative bg-[#1e241a] border border-white/[0.07] rounded-xl px-3 py-2 hover:border-white/20 transition-colors">
          <select
            className="bg-transparent appearance-none text-xs text-[#d4cfc6] outline-none pr-5 cursor-pointer w-full"
            onChange={(e) => onChangeBarber(e.target.value)}
          >
            <option value="all" className="bg-[#1e241a]">All Barbers</option>
            {barbers.map(b => (
              <option key={b.id} value={b.id} className="bg-[#1e241a]">{b.name}</option>
            ))}
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <MdOutlineKeyboardArrowDown size={14}/>
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px bg-white/[0.07] self-stretch" />
      <div className="lg:hidden h-px bg-white/[0.07]" />

      {/* Status */}
      <div className="flex flex-col gap-2">
        <p className="uppercase text-[10px] font-bold tracking-widest text-gray-600">status</p>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onUpdateStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase border transition-all
              ${statusFilter === "all"
                ? "bg-[#2a3a1a] border-[#86c559]/50 text-[#86c559]"
                : "bg-[#1e241a] border-white/[0.07] text-gray-600 hover:bg-white/[0.04] hover:text-gray-400"
              }`}
          >
            All
          </button>

          {statusTitle.map(status => (
            <button
              key={status.name}
              onClick={() => onUpdateStatusFilter(status.name.toLowerCase())}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase border transition-all
                ${statusFilter === status.name.toLowerCase()
                  ? activeColor[status.name]
                  : `bg-[#1e241a] border-white/[0.07] text-gray-600 hover:${status.color}`
                }`}
            >
              {status.name}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Filter;