import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  cancelAppointment,
  getAppointments,
  getBookingStats,
  getPercentageChange,
  getRevenue,
  getTodayAppointments,
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
import { getBarbers, getTopBarbers, getTotalBarbers } from "../../services/barberService";
import Table from "../../components/Table";
import TopBarbers from "../../components/TopBarbers";
import BarChart from "../../components/RevenueChart";
import RevenueChart from "../../components/RevenueChart";

const AdminPage = () => {
  const { user } = useAuthContext();
  const [ bookingStats, setBookingStats] = useState({ todayCount:0, yesterdayCount: 0 });
  const [ revenue, setRevenue ] = useState({ thisMonthTotal: 0, lastMonthTotal: 0});
  const [ barber, setBarber ] = useState(0);
  const [ todayAppointments, setTodayAppointments ] = useState([]);
  const [ currentPage, setCurrentPage] = useState(1);
  const [ totalCount, setTotalCount ] = useState(0);
  const [ topBarbers, setTopBarbers ] = useState([]);
  const itemsPerPage = 5;
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

  const fetchTopBarbers = async() => {
    const data = await getTopBarbers();
    setTopBarbers(data);
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
   
        const { data,count } = await getTodayAppointments(currentPage, itemsPerPage);
        console.log(data)
        setTodayAppointments(data)
        setTotalCount(count);
        
      } catch (error) {
        console.error(error)
      }
    };

    fetchAppointments();
    fetchBookingStats();
    fetchTotalRevenue();
    fetchBarbers();
    fetchTopBarbers();
  }, [currentPage]);


    const handleUpdateStatus = (id, status) => {
      setTodayAppointments(prev => 
        prev.map(a => a.id === id ? {...a, status} : a)
      );
    }

    const handleDelete = (id) => {
      setTodayAppointments(prev => prev.filter(a => a.id !== id));
    }
  console.log("appointment",todayAppointments)
  const totalBookings = todayAppointments.length;
  const bookingPercentage = getPercentageChange(bookingStats.todayCount, bookingStats.yesterdayCount);
  const monthlyPercentage = getPercentageChange(revenue.thisMonthTotal, revenue.lastMonthTotal);

  console.log("top", topBarbers)




  // if (state.error) return <p>Error: {state.error}</p>;
  return (
    <div className="bg-neutral-dark flex min-h-screen w-full">
      <Sidebar/>
      <div className="flex-1 p-8 flex flex-col gap-4">
        <div>
          <h1>Hello, Admin</h1>
          <p className="text-slate-400">Here's what's happening at Negro Barbershop today.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatsCard total={totalBookings} icon={FaRegCalendarCheck} title="total bookings" percentage={bookingPercentage}/>
          <StatsCard total={(revenue.thisMonthTotal).toFixed(2)} icon={GiMoneyStack} title="monthly revenue" symbol="PHP" percentage={monthlyPercentage}/>
          <StatsCard total={barber} icon={FaIdBadge} title=" barbers"/>
        </div>

        <Table appointments={todayAppointments} totalCount={totalCount} currentPage={currentPage} totalPages={Math.ceil(totalCount/itemsPerPage)} onChangePage={setCurrentPage} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete}/>
        <div className="flex gap-4">
          <TopBarbers topThree={topBarbers}/>
          <div className="flex-1">
            <RevenueChart/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
