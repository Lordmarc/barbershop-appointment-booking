import { useEffect, useState } from "react";
import AppointmentHeader from "../../components/AppointmentHeader";
import Sidebar from "../../components/Sidebar";
import { useAppointments } from "../../store/AppointmentContext";
import { deleteAppointment, getAppointments, getAppointmentStatusCount } from "../../services/appointmentService";
import Filter from "../../components/Filter";
import AppointmentTable from "../../components/AppointmentTable";
import { getBarbers } from "../../services/barberService";

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

  const fetchBarbers = async() => {
    const data = await getBarbers();
    setBarbers(data);
  }

  const fetchStatusCount = async() => {
    const { data, statusCount } = await getAppointmentStatusCount();
    setStatusCount(statusCount); 
  }

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  }

  useEffect(() => {
    const fetchAppointments = async() => {
      try{
        const { data, count } = await getAppointments(currentPage, itemPerPage, statusFilter, startDate, endDate, barber);
        dispatch({ type: "SET_APPOINTMENTS", payload: data })
        setTotalCount(count)
      }catch(err){
        console.error(err)
      }
    }
    fetchAppointments();
  
  },[currentPage, startDate, endDate, statusFilter,barber])
    useEffect(() => {
      fetchStatusCount();
      fetchBarbers();
    }, []);
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