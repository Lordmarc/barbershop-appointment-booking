import { IoIosCalendar } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRef } from "react";
const statusTitle = [
  {name: 'Pending'},
  {name: 'Confirmed'},
  {name: 'Completed'},
  {name: 'Cancelled'}
];

const Filter = ({ statusFilter,  startDate, onUpdateStartDate, onUpdateEndDate, endDate, onUpdateStatusFilter, onChangeBarber, barbers }) => {
const startDateRef = useRef(null);
const endDateRef = useRef(null);
  return(
  <div className="border border-neutral-border rounded-md p-4 flex items-stretch gap-4">
  
  {/* Date Range */}
  <div className="flex flex-col gap-2">
    <p className="uppercase text-xs text-slate-200">date range</p>
    <div className="flex items-center relative border border-neutral-border p-2 text-sm gap-2">
      <IoIosCalendar className="text-primary"/>
      <input type="date" ref={startDateRef} value={startDate} onChange={(e) => onUpdateStartDate(e.target.value)} onClick={() => startDateRef.current.showPicker() } className="[&::-webkit-calendar-picker-indicator]:hidden bg-transparent text-sm"/>
      <span>-</span>
      <input type="date" ref={endDateRef} value={endDate} onChange={(e) => onUpdateEndDate(e.target.value)} onClick={() => endDateRef.current.showPicker() }  className="[&::-webkit-calendar-picker-indicator]:hidden bg-transparent text-sm"/>
    </div>
  </div>

  {/* Barbers */}
  <div className="flex flex-col gap-2">
    <p className="uppercase text-xs text-slate-200">barbers</p>
    <div className="relative border border-neutral-border p-2 ">
      <select className="bg-neutral-dark pr-8 appearance-none text-sm outline-none" onChange={(e) => onChangeBarber(e.target.value)}>
        <option value="all">All Barbers</option>
        {barbers.map(b => (
          <option key={b.id} value={b.name} >{b.name}</option>
        ))}
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2">
        <MdOutlineKeyboardArrowDown/>
      </span>
    </div>
  </div>

    <div className="flex flex-col gap-2">
    <p className="uppercase text-xs text-slate-200">status</p>
    <div className="relative flex items-center gap-1 ">
      <div className={`p-2 font-semibold border  ${statusFilter !== "all" ? ' border-neutral-border bg-primary/10 text-slate-500 ': 'bg-primary border-neutral-border text-black font-semibold'}`} onClick={() => onUpdateStatusFilter("all")}>All</div>
     {statusTitle.map(status => (
        <div key={status.name} className={`p-2 font-semibold border ${statusFilter === status.name.toLowerCase() ? 'bg-primary  border-neutral-border text-black font-semibold': ' border-neutral-border bg-primary/10 text-slate-500 '}`} onClick={() => onUpdateStatusFilter(status.name.toLowerCase())}>{status.name}</div>
     ))}
    </div>
  </div>

</div>
  );
}

export default Filter;