import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrPrevious, GrNext } from "react-icons/gr";
dayjs.extend(localizedFormat)

const statusConfig = {
  pending:   { dot: "bg-yellow-400", text: "text-yellow-300", border: "border-yellow-400/30", bg: "bg-yellow-400/10" },
  confirmed: { dot: "bg-blue-400",   text: "text-blue-300",   border: "border-blue-400/30",   bg: "bg-blue-400/10"   },
  completed: { dot: "bg-green-400",  text: "text-green-300",  border: "border-green-400/30",  bg: "bg-green-400/10"  },
  cancelled: { dot: "bg-red-400",    text: "text-red-300",    border: "border-red-400/30",    bg: "bg-red-400/10"    },
};

const AppointmentTable = ({ state, status, barber, totalCount, onChangePage, currentPage, totalPages, onDelete }) => {
  const startItem = (currentPage - 1) * 5 + 1;
  const endItem = Math.min(currentPage * 5, totalCount);

  const filteredAppointments = state
    .filter(item => status === "all" || item.status === status)
    .filter(item => barber === "all" || item.barbers.name === barber);

  return (
    <div className="flex flex-col bg-[#1a1f14] border border-white/[0.07] rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">

        {/* Header */}
        <thead>
          <tr className="border-b border-white/[0.07] bg-[#1e241a]">
            {["Customer", "Date & Time", "Service", "Barbers", "Status", "Actions"].map(col => (
              <th key={col} className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase text-gray-500">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {filteredAppointments.map(a => {
            const sc = statusConfig[a.status] || statusConfig.pending;
            return (
              <tr key={a.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">

                {/* Customer */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-[#f0ede6] font-semibold">{a.customer_name}</p>
                  <span className="text-xs text-gray-500">{a.profiles.email}</span>
                </td>

                {/* Date & Time */}
                <td className="px-6 py-4">
                  <p className="text-[#f0ede6] font-semibold">{dayjs(a.date).format('ll')}</p>
                  <span className="text-xs text-primary">{a.time_slot}</span>
                </td>

                {/* Service */}
                <td className="px-6 py-4">
                  <p className="text-[#d4cfc6]">{a.services.name}</p>
                </td>

                {/* Barber */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={a.barbers.image}
                      alt="barber"
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <p className="text-[#d4cfc6]">{a.barbers.name}</p>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${sc.border} ${sc.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${sc.text}`}>
                      {a.status}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDelete(a.id)}
                    className="w-8 h-8 bg-[#1e241a] border border-white/10 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-500/20 hover:text-red-400 hover:border-red-400/30 transition-all cursor-pointer"
                  >
                    <FaRegTrashAlt size={12} />
                  </button>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-auto flex items-center justify-end gap-2 p-3 border-t border-white/[0.07]">
        <p className="text-xs text-gray-500 mr-2">Showing {startItem} of {endItem}</p>

        <button
          onClick={() => onChangePage(currentPage === 1 ? totalPages : currentPage - 1)}
          className="w-8 h-8 bg-[#1e241a] border border-white/[0.07] rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary/20 transition-all"
        >
          <GrPrevious size={11} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onChangePage(page)}
            className={`w-8 h-8 rounded-lg text-sm border transition-all
              ${currentPage === page
                ? 'bg-primary border-primary text-black font-bold'
                : 'bg-[#1e241a] border-white/[0.07] text-gray-400 hover:bg-primary/20'
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onChangePage(currentPage === totalPages ? 1 : currentPage + 1)}
          className="w-8 h-8 bg-[#1e241a] border border-white/[0.07] rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary/20 transition-all"
        >
          <GrNext size={11} />
        </button>
      </div>
    </div>
  );
};

export default AppointmentTable;