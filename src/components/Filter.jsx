import { IoIosCalendar } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRef } from "react";

const statusTitle = [
  { name: 'Pending' },
  { name: 'Confirmed' },
  { name: 'Completed' },
  { name: 'Cancelled' }
];

const Filter = ({ statusFilter, startDate, onUpdateStartDate, onUpdateEndDate, endDate, onUpdateStatusFilter, onChangeBarber, barbers }) => {
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  return (
    <div className="bg-[#1a1f14] border border-white/[0.07] rounded-xl p-4 flex items-stretch gap-6">

      {/* Date Range */}
      <div className="flex flex-col gap-2">
        <p className="uppercase text-[10px] font-bold tracking-widest text-gray-500">date range</p>
        <div className="flex items-center border border-white/[0.07] bg-[#1e241a] rounded-lg px-3 py-2 gap-2 text-sm">
          <IoIosCalendar className="text-primary" />
          <input
            type="date"
            ref={startDateRef}
            value={startDate}
            onChange={(e) => onUpdateStartDate(e.target.value)}
            onClick={() => startDateRef.current.showPicker()}
            className="[&::-webkit-calendar-picker-indicator]:hidden bg-transparent text-sm text-[#d4cfc6] outline-none"
          />
          <span className="text-gray-600">—</span>
          <input
            type="date"
            ref={endDateRef}
            value={endDate}
            onChange={(e) => onUpdateEndDate(e.target.value)}
            onClick={() => endDateRef.current.showPicker()}
            className="[&::-webkit-calendar-picker-indicator]:hidden bg-transparent text-sm text-[#d4cfc6] outline-none"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-white/[0.07]" />

      {/* Barbers */}
      <div className="flex flex-col gap-2">
        <p className="uppercase text-[10px] font-bold tracking-widest text-gray-500">barbers</p>
        <div className="relative border border-white/[0.07] bg-[#1e241a] rounded-lg px-3 py-2">
          <select
            className="bg-transparent appearance-none text-sm text-[#d4cfc6] outline-none pr-6"
            onChange={(e) => onChangeBarber(e.target.value)}
          >
            <option value="all" className="bg-[#1e241a]">All Barbers</option>
            {barbers.map(b => (
              <option key={b.id} value={b.name} className="bg-[#1e241a]">{b.name}</option>
            ))}
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
            <MdOutlineKeyboardArrowDown />
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-white/[0.07]" />

      {/* Status */}
      <div className="flex flex-col gap-2">
        <p className="uppercase text-[10px] font-bold tracking-widest text-gray-500">status</p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onUpdateStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-widest uppercase border transition-all
              ${statusFilter === "all"
                ? "bg-primary border-primary text-black"
                : "bg-[#1e241a] border-white/[0.07] text-gray-500 hover:border-primary/40"
              }`}
          >
            All
          </button>
          {statusTitle.map(status => (
            <button
              key={status.name}
              onClick={() => onUpdateStatusFilter(status.name.toLowerCase())}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-widest uppercase border transition-all
                ${statusFilter === status.name.toLowerCase()
                  ? "bg-primary border-primary text-black"
                  : "bg-[#1e241a] border-white/[0.07] text-gray-500 hover:border-primary/40"
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