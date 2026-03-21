import { FaCalendarCheck, FaRegCalendar, FaRegClock } from "react-icons/fa6";
import placeholder from "../assets/placeholder.png";
import { useEffect, useState } from "react";
import { useAuthContext } from "../store/AuthContext";
import { getCustomerAppointment,  } from "../services/appointmentService";
import dayjs from "dayjs";
import { supabase } from "../lib/supabase";

const AppointmentCard = () => {
  const { user } = useAuthContext();
  const [appointment, setAppointment] = useState(null);

useEffect(() => {
  if (!user) return;

  const fetchCustomerAppointment = async() => {
    try {
      const data = await getCustomerAppointment(user.id);
      setAppointment(data);
    } catch (err) {
      console.log(err);
      setAppointment(null); // ← i-set null kapag walang pending
    }
  };

  fetchCustomerAppointment();

  const channel = supabase
    .channel('appointment-card')
    .on('postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'appointments',
        filter: `user_id=eq.${user.id}`
      },
      () => fetchCustomerAppointment()
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, [user]);
  console.log(appointment)
  if (!appointment) {
    return <p className="text-gray-400">No upcoming appointment</p>;
  }

  return (
    <div className="rounded-lg border-l-4 border-l-[#86c559] bg-[#1a1f14] p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between text-[#86c559]">
        <span>UPCOMING VISIT</span>
        <FaCalendarCheck />
      </div>

      <div className="border-b border-b-slate-500 pb-4">
        <p className="text-2xl font-semibold text-[#f0ede6]">
          {appointment.services?.name}
        </p>

        <div className="flex items-center">
          <div className="flex items-center gap-1 flex-1 text-[#d4cfc6]">
            <FaRegCalendar />
            <span>
              {dayjs(appointment.date).format("MMM D YYYY")}
            </span>
          </div>

          <div className="flex items-center gap-1 flex-1">
            <FaRegClock />
            <span>{appointment.time_slot}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-lg overflow-hidden">
          <img
            src={appointment.barbers?.image || placeholder}
            alt=""
            className="w-full h-full "
          />
        </div>

        <p>Barber:</p>
        <span className="font-semibold">
          {appointment.barbers?.name}
        </span>
      </div>
    </div>
  );
};

export default AppointmentCard;