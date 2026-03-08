import { useEffect } from "react";
import { useAppointments } from "../store/AppointmentContext"
import { cancelAppointment, getAppointments } from "../services/appointmentService";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { state, dispatch } = useAppointments(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments =  async() => {
      try{
        dispatch({ type: 'SET_LOADING' })
        const data = await getAppointments();
        dispatch({ type: 'SET_APPOINTMENTS', payload: data })
      }catch(error){
        dispatch({ type: 'SET_ERROR', payload: error.message })
      }
    }

    fetchAppointments();
  },[])

  const handleCancel = async(id) => {
    try{
      await cancelAppointment(id);
      dispatch({ type: 'CANCEL_APPOINTMENT', payload: id })
    }catch(error){
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const handleLogout = async() => {
    await supabase.auth.signOut();
    navigate('/login');
  }

  if (state.loading) return <p>Loading...</p>
  if (state.error) return <p>Error: {state.error}</p>
  return(
    <div>
      <h1>Admin Page</h1>
      {state.appointments.length === 0
      ? <p>Wala pang appointments.</p>
      : state.appointments.map(a => (
        <div key={a.id}>
          <p>{a.customer_name}</p>
          <button onClick={() => handleCancel(a.id)}>Cancel</button>
        </div>
      ))}

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminPage;