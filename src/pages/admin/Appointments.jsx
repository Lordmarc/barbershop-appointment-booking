import { useEffect, useState } from "react";
import AppointmentHeader from "../../components/AppointmentHeader";
import Sidebar from "../../components/Sidebar";
import { useAppointments } from "../../store/AppointmentContext";
import { getAppointmentStatusCount } from "../../services/appointmentService";
import Filter from "../../components/Filter";

const Appointments = () => {
  const { state, dispatch } = useAppointments();
  
  useEffect(() => {
    const fetchAppointments = async() => {
      try{
        const data = await getAppointmentStatusCount();
        dispatch({ type: "SET_APPOINTMENTS", payload: data })
      }catch(err){
        console.err(err)
      }
    }
    fetchAppointments();
  },[])
  console.log("state", state )
  return(
    <div className="bg-neutral-dark flex min-h-screen w-full">
      <Sidebar/>
      <div className="flex-1 p-8 flex flex-col gap-2 p-8">
        <AppointmentHeader appointments={state.appointments.statusCount}/>
        <Filter/>
      </div>
    </div>
  );
}

export default Appointments;