import { FaCalendarCheck } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import taloy from "../assets/taloy.png"

const AppointmentCard = () => {
  
  return(
    <div className="rounded-lg border-l-4 border-l-primary bg-slate-800/75  p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between text-primary">
        <span>UPCOMING VISIT</span>
        <FaCalendarCheck className=""/>
      </div>

      <div className="border-b border-b-slate-500 pb-4">
        <p className="text-2xl font-semibold">Fade</p>
        <div className="flex items-center ">
          <div className="flex items-center gap-1 flex-1">
            <FaRegCalendar/>
            <span>Mar 13 2026</span>
          </div>
          
          <div className="flex items-center gap-1 flex-1">
            <FaRegClock/>
            <span>9:00 AM</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full overflow-hidden ">
          <img src={taloy} alt="" className="w-full h-full rounded-full"/>
        </div>


          <p>Barber:</p>
          <span className="font-semibold">Jeric C.</span>
      
      </div>
    </div>
  );
}

export default AppointmentCard;