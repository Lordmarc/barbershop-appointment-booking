import { IoFilterSharp } from "react-icons/io5";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { updateStatus } from "../services/appointmentService";
dayjs.extend(localizedFormat)

const statusColor = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  completed: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
}

const Table = ({ appointments =[], currentPage, totalPages, onPageChange, dispatch }) => {
  console.log(appointments)

  const handleUpdateStatus = async(id, status) => {
    try{
      await updateStatus(id,status);
      dispatch({ type: 'UPDATE_STATUS',
        payload: { id, status  }
       })
    }catch(err){
      console.error(err.message)
    }
  }
  return(
    <div classNameName="bg-primary/10 rounded-lg">
      <div classNameName="flex items-center justify-between p-2">
        <p>Today's Appointments</p>
        <div>
          <IoFilterSharp/>
        </div>
      </div>
      
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-neutral-border">
        <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr classNameName="text-slate-500">
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
            <tbody>
                {appointments.map(a => (
                  <tr key={a.id} className="bg-neutral-primary border-b border-default">
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
                    <td className="px-6 py-4 flex items-center">
                        <img src={a.barbers.image} alt="barbers_picture" className="w-12 h-12 rounded-full" />
                        <p className="text-xl">{a.barbers.name}</p>
                    </td>
                    <td className="px-6 py-4">
                        <select 
                          className="bg-neutral-dark border border-neutral-border rounded p-1 text-sm"
                          value={a.status}
                          onChange={(e) => handleUpdateStatus(a.id, e.target.value)}>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                    </td>
                </tr>

                ))}
                
                  

              
               
            </tbody>
        </table>
      </div>

    </div>
  )
}

export default Table;