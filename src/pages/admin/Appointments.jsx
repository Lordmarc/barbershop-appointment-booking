import { useEffect, useState } from "react";
import AppointmentHeader from "../../components/AppointmentHeader";
import Sidebar from "../../components/Sidebar";
import { useAppointments } from "../../store/AppointmentContext";
import { deleteAppointment, getAppointments, getAppointmentStatusCount } from "../../services/appointmentService";
import Filter from "../../components/Filter";
import AppointmentTable from "../../components/AppointmentTable";
import { getBarbers } from "../../services/barberService";
import { supabase } from "../../lib/supabase";

const Appointments = () => {
  const { state, dispatch } = useAppointments();
  const [ statusCount, setStatusCount ] = useState(null);
  const [ startDate, setStartDate ] = useState("");
  const [ endDate, setEndDate ] = useState("");
  const [ statusFilter, setStatusFilter ] = useState("all");

  const [ barber, setBarber ] = useState("all");
  const [ barbers, setBarbers] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalCount, setTotalCount ] = useState(0);
  const itemPerPage = 5; 

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  }

useEffect(() => {
  const fetchAll = async () => {
    try {
      const [{ data, count }, { statusCount }, barbersData] = await Promise.all([
        getAppointments(currentPage, itemPerPage, statusFilter, startDate, endDate, barber),
        getAppointmentStatusCount(),
        getBarbers(),
      ]);

      dispatch({ type: "SET_APPOINTMENTS", payload: data });
      setTotalCount(count);
      setStatusCount(statusCount);
      setBarbers(barbersData);
    } catch (err) {
      console.error(err);
    }
  };
  fetchAll();

    const subscription = supabase
      .channel('appointments-channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        () => fetchAll()
      )
      .subscribe();
  
    return () => supabase.removeChannel(subscription);
}, [currentPage, startDate, endDate, statusFilter, barber]);
  const handleDelete = async(id) => {
    try{
      await deleteAppointment(id);
      dispatch({ type: 'DELETE_APPOINTMENT', payload: id });

    }catch(err){
      console.error(err.message);
    }
  }


  return(
    <div className="bg-neutral-dark flex min-h-screen w-full">
      <Sidebar/>
      <div className="flex-1 flex flex-col gap-2 p-8">
        <AppointmentHeader appointments={statusCount}/>
        <Filter state={state} onUpdateStatusFilter={handleStatusFilter} statusFilter={statusFilter} onChangeBarber={setBarber} barbers={barbers} startDate={startDate} endDate={endDate} onUpdateStartDate={setStartDate} onUpdateEndDate={setEndDate}/>

        <AppointmentTable state={state.appointments ?? []} status={statusFilter} barber={barber} totalCount={totalCount}  currentPage={currentPage} totalPages={Math.ceil(totalCount/itemPerPage)} onChangePage={setCurrentPage} onDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default Appointments;