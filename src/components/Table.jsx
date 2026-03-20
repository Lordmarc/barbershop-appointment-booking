import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { FaRegTrashAlt } from "react-icons/fa";
import { GrPrevious, GrNext } from "react-icons/gr";
dayjs.extend(localizedFormat)

export const statusColor = {
  pending:   { dot: "bg-yellow-400", text: "text-yellow-300", border: "border-yellow-400/30", bg: "bg-yellow-400/10" },
  confirmed: { dot: "bg-blue-400",   text: "text-blue-300",   border: "border-blue-400/30",   bg: "bg-blue-400/10"   },
  completed: { dot: "bg-green-400",  text: "text-green-300",  border: "border-green-400/30",  bg: "bg-green-400/10"  },
  cancelled: { dot: "bg-red-400",    text: "text-red-300",    border: "border-red-400/30",    bg: "bg-red-400/10"    },
};

const Table = ({ appointments = [], totalCount, currentPage, totalPages, onChangePage, onDelete, onUpdateStatus }) => {
  const startItem = (currentPage - 1) * 5 + 1;
  const endItem = Math.min(currentPage * 5, totalCount);

  const Pagination = () => (
    <div className="flex items-center justify-end gap-2 p-3 border-t border-white/[0.07]">
      <p className="text-xs text-gray-500 mr-2">Showing {startItem} of {endItem}</p>
      <button
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 bg-[#1e241a] border border-white/[0.07] rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#2a3a1a] disabled:opacity-30 transition-all"
      >
        <GrPrevious size={11}/>
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onChangePage(page)}
          className={`w-8 h-8 rounded-lg text-sm border transition-all
            ${currentPage === page
              ? 'bg-[#86c559] border-[#86c559] text-black font-bold'
              : 'bg-[#1e241a] border-white/[0.07] text-gray-400 hover:bg-[#2a3a1a]'
            }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 bg-[#1e241a] border border-white/[0.07] rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#2a3a1a] disabled:opacity-30 transition-all"
      >
        <GrNext size={11}/>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col bg-[#1a1f14] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

      {/* Header */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-white/[0.07]">
        <p className="text-[#f0ede6] font-bold">Today's Appointments</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-white/[0.07] bg-[#1e241a]">
              {["Customer", "Date & Time", "Service", "Barbers", "Status", "Actions"].map(col => (
                <th key={col} className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase text-gray-500">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => {
              const sc = statusColor[a.status] || statusColor.pending;
              return (
                <tr key={a.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-[#f0ede6] font-semibold">{a.customer_name}</p>
                    <span className="text-xs text-gray-500">{a.profiles?.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#f0ede6] font-semibold">{dayjs(a.date).format('ll')}</p>
                    <span className="text-xs text-[#86c559]">{a.time_slot}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#d4cfc6]">{a.services?.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={a.barbers?.image} alt="barber" className="w-8 h-8 rounded-full object-cover border border-white/10"/>
                      <p className="text-[#d4cfc6]">{a.barbers?.name ?? "N/A"}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative inline-block">
                      <select
                        value={a.status}
                        onChange={(e) => onUpdateStatus(a.id, e.target.value)}
                        className={`focus:outline-none pl-6 pr-7 py-1 rounded-full cursor-pointer border appearance-none text-xs font-bold tracking-widest ${sc.border} ${sc.bg} ${sc.text}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <span className={`absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none ${sc.dot}`}/>
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onDelete(a.id)}
                      className="w-8 h-8 bg-[#1e241a] border border-white/10 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-500/20 hover:text-red-400 hover:border-red-400/30 transition-all cursor-pointer"
                    >
                      <FaRegTrashAlt size={12}/>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden flex flex-col divide-y divide-white/[0.04]">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-600 text-sm py-8">No appointments today</p>
        ) : (
          appointments.map(a => {
            const sc = statusColor[a.status] || statusColor.pending;
            return (
              <div key={a.id} className="p-4 flex flex-col gap-3">

                {/* Top row — customer + delete */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#f0ede6] font-semibold">{a.customer_name}</p>
                    <span className="text-xs text-gray-500">{a.profiles?.email}</span>
                  </div>
                  <button
                    onClick={() => onDelete(a.id)}
                    className="w-8 h-8 bg-[#1e241a] border border-white/10 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-500/20 hover:text-red-400 transition-all cursor-pointer shrink-0"
                  >
                    <FaRegTrashAlt size={12}/>
                  </button>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#1e241a] rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Date & Time</p>
                    <p className="text-[#f0ede6] text-sm font-semibold">{dayjs(a.date).format('ll')}</p>
                    <p className="text-[#86c559] text-xs">{a.time_slot}</p>
                  </div>
                  <div className="bg-[#1e241a] rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Service</p>
                    <p className="text-[#f0ede6] text-sm font-semibold">{a.services?.name}</p>
                  </div>
                </div>

                {/* Barber + Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={a.barbers?.image} alt="barber" className="w-8 h-8 rounded-full object-cover border border-white/10"/>
                    <p className="text-[#d4cfc6] text-sm">{a.barbers?.name ?? "N/A"}</p>
                  </div>

                  <div className="relative inline-block">
                    <select
                      value={a.status}
                      onChange={(e) => onUpdateStatus(a.id, e.target.value)}
                      className={`focus:outline-none pl-6 pr-7 py-1 rounded-full cursor-pointer border appearance-none text-xs font-bold tracking-widest ${sc.border} ${sc.bg} ${sc.text}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <span className={`absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none ${sc.dot}`}/>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</span>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default Table;