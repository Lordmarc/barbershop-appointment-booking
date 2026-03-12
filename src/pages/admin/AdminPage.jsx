import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  cancelAppointment,
  getAppointments,
  getBookingStats,
  getPercentageChange,
  getRevenue,
} from "../../services/appointmentService";
import { useAppointments } from "../../store/AppointmentContext";
import Logo from "../../assets/Logo.jpg";
import { MdDashboard } from "react-icons/md";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import { FaRegCalendarCheck } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { useAuthContext } from "../../store/AuthContext";
import { getCustomers } from "../../services/authService";
import { FaIdBadge } from "react-icons/fa6";
import { getBarbers, getTotalBarbers } from "../../services/barberService";


const AdminPage = () => {
  const { user } = useAuthContext();
  const { state, dispatch } = useAppointments();
  const [ bookingStats, setBookingStats] = useState({ todayCount:0, yesterdayCount: 0 });
  const [ revenue, setRevenue ] = useState({ thisMonthTotal: 0, lastMonthTotal: 0});
  const [ barber, setBarber ] = useState(0);
  const navigate = useNavigate();

  const fetchBookingStats = async() => {
    const data = await getBookingStats();

    setBookingStats(data);
  }

  const fetchTotalRevenue = async() => {
    const data = await getRevenue();
    setRevenue(data);
  }

  const fetchBarbers = async() => {
    const data = await getTotalBarbers();
    setBarber(data);
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        dispatch({ type: "SET_LOADING" });
        const data = await getAppointments();
        dispatch({ type: "SET_APPOINTMENTS", payload: data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    fetchAppointments();
    fetchBookingStats();
    fetchTotalRevenue();
    fetchBarbers();
  }, []);

  const totalBookings = state.appointments.length;
  const bookingPercentage = getPercentageChange(bookingStats.todayCount, bookingStats.yesterdayCount);
  const monthlyPercentage = getPercentageChange(revenue.thisMonthTotal, revenue.lastMonthTotal);
  const totalBarbers = barber.length;
  console.log("Barber", totalBarbers)
  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      dispatch({ type: "CANCEL_APPOINTMENT", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };


  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Error: {state.error}</p>;
  return (
    <div className="bg-neutral-dark flex min-h-screen w-full">
      <Sidebar/>
      <div className="flex-1 p-8">
        <div>
          <h1>Hello, Admin</h1>
          <p className="text-slate-400">Here's what's happening at Negro Barbershop today.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatsCard total={totalBookings} icon={FaRegCalendarCheck} title="total bookings" percentage={bookingPercentage}/>
          <StatsCard total={(revenue.thisMonthTotal).toFixed(2)} icon={GiMoneyStack} title="monthly revenue" symbol="PHP" percentage={monthlyPercentage}/>
          <StatsCard total={barber} icon={FaIdBadge} title=" barbers"/>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
