import { IoFilterSharp } from "react-icons/io5";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { deleteAppointment, updateStatus } from "../services/appointmentService";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrPrevious, GrNext } from "react-icons/gr";



dayjs.extend(localizedFormat)

const statusColor = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  completed: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
}

const Table = ({ appointments =[], totalCount, currentPage, totalPages, onChangePage, onDelete, onUpdateStatus }) => {
  const startItem = (currentPage - 1) * 5 + 1;
  const endItem = Math.min(currentPage * 5, totalCount);
  console.log(appointments)
  console.log(totalPages)

  return(
    <div className="bg-primary/10 rounded-lg h-full flex-1 flex flex-col overflow-hidden border border-neutral-border">
      <div className="flex items-center justify-between p-2 bg-primary/10 text-xl">
        <p>Today's Appointments</p>
        <div>
          <IoFilterSharp/>
        </div>
      </div>
      
      <div className="h-full flex flex-col relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-neutral-border">
        <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-primary/10 border-b border-b-primary/25 rounded-base border-default">
                <tr className="text-slate-500">
                    <th scope="col" className="px-6 py-3 font-medium uppercase">
                        customer
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium uppercase">
                        date & time
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium uppercase">
                        service
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium uppercase">
                        barbers
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium uppercase">
                        status
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium uppercase">
                      actions
                    </th>
                </tr>
            </thead>
            <tbody className="">
                {appointments.map(a => (
                  <tr key={a.id} className="bg-primary-/5 border-b border-neutral-border">
                    <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                       <p className="text-xl">{a.customer_name}</p>
                       <span className="text-slate-500">{a.profiles.email}</span>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-xl">{dayjs(a.date).format('ll')}</p>
                       <span className="text-primary">{a.time_slot}</span>
                    </td>
                    <td className="px-6 py-4">
                        <p className="text-xl">{a.services.name}</p>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="flex items-center gap-2">
                        <img src={a.barbers.image} alt="barbers_picture" className="w-10 h-10 rounded-full" />
                        <p className="text-xl">{a.barbers.name}</p>
                      </div>
                       
                    </td>
                    <td className="px-6 py-4 relative">
                      <div className="relative inline-block">
                        <select
                          value={a.status}
                          onChange={(e) => onUpdateStatus(a.id, e.target.value)}
                                className={`focus:outline-none px-2 py-1 pr-5 rounded-full cursor-pointer border border-neutral-border  appearance-none  text-xs ${statusColor[a.status]}`}
                        >
                          <option value="pending" className={statusColor.pending}>Pending</option>
                          <option value="confirmed" className={statusColor.confirmed}>Confirmed</option>
                          <option value="completed" className={statusColor.completed}>Completed</option>
                          <option value="cancelled" className={statusColor.cancelled}>Cancelled</option>
                        </select>

                        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs">▼</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="h-8 w-8 bg-primary rounded-md p-1 flex items-center justify-center shadow-primary/50 shadow group hover:bg-primary/25 cursor-pointer transition-all" onClick={() => onDelete(a.id)}>
                        <button className="text-neutral-dark group-hover:text-white"><FaRegTrashAlt/></button>
                      </div>
                    </td>
                </tr>

                ))}
           
            </tbody>
        </table>
        <div className="mt-auto w-full  flex p-2 justify-end gap-2 border-t border-t-primary/20">
        <div>
          <p>Showing {startItem} of {endItem}</p>
        </div>
          <button className="bg-neutral-dark border border-neutral-border p-2 rounded-md text-sm" onClick={() => onChangePage(currentPage - 1)}><GrPrevious/></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => onChangePage(page)}
              className={`w-8 h-8 rounded-md text-sm border border-neutral-border
                ${currentPage === page 
                  ? 'bg-primary text-black font-semibold' 
                  : 'bg-neutral-dark hover:bg-primary/20'
                }`}
            >
              {page}
            </button>
          ))}
          <button className="bg-neutral-dark border border-neutral-border p-2 rounded-md text-sm" onClick={() => onChangePage(currentPage + 1)}><GrNext/></button>
        </div>
      </div>

    </div>
  )
}

export default Table;