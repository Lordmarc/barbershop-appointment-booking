import { useEffect, useState } from "react";
import {
  getBookingStats,
  getPercentageChange,
  getRevenue,
  getTodayAppointments,
  updateStatus,
} from "../../services/appointmentService";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import { FaRegCalendarCheck } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FaIdBadge } from "react-icons/fa6";
import { getTopBarbers, getTotalBarbers } from "../../services/barberService";
import Table from "../../components/Table";
import TopBarbers from "../../components/TopBarbers";
import WeeklyChart from "../../components/RevenueChart";

const AdminPage = () => {
  const [bookingStats, setBookingStats] = useState({ todayCount: 0, yesterdayCount: 0 });
  const [revenue, setRevenue] = useState({ thisMonthTotal: 0, lastMonthTotal: 0 });
  const [barber, setBarber] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [topBarbers, setTopBarbers] = useState([]);
  const itemsPerPage = 5;

  const fetchBookingStats = async () => {
    const data = await getBookingStats();
    setBookingStats(data);
  };

  const fetchTotalRevenue = async () => {
    const data = await getRevenue();
    setRevenue(data);
  };

  const fetchBarbers = async () => {
    const data = await getTotalBarbers();
    setBarber(data);
  };

  const fetchTopBarbers = async () => {
    const data = await getTopBarbers();
    setTopBarbers(data);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data, count } = await getTodayAppointments(currentPage, itemsPerPage);
        setTodayAppointments(data);
        setTotalCount(count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
    fetchBookingStats();
    fetchTotalRevenue();
    fetchBarbers();
    fetchTopBarbers();
  }, [currentPage]);

  const handleUpdateStatus = async(id, status) => {
    await updateStatus(id,status)
    setTodayAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status } : a)
    );
  };

  const handleDelete = (id) => {
    setTodayAppointments(prev => prev.filter(a => a.id !== id));
  };

  const totalBookings = todayAppointments.length;
  const bookingPercentage = getPercentageChange(bookingStats.todayCount, bookingStats.yesterdayCount);
  const monthlyPercentage = getPercentageChange(revenue.thisMonthTotal, revenue.lastMonthTotal);

  return (
    <div className="bg-[#0f1309] flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 p-8 flex flex-col gap-6">

        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-[#f0ede6]">Hello, Admin</h1>
          <p className="text-gray-500 text-sm">Here's what's happening at Negro Barbershop today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatsCard total={totalBookings} icon={FaRegCalendarCheck} title="total bookings" percentage={bookingPercentage}/>
          <StatsCard total={(revenue.thisMonthTotal).toFixed(2)} icon={GiMoneyStack} title="monthly revenue" symbol="PHP" percentage={monthlyPercentage}/>
          <StatsCard total={barber} icon={FaIdBadge} title="barbers"/>
        </div>

        {/* Table */}
        <Table
          appointments={todayAppointments}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / itemsPerPage)}
          onChangePage={setCurrentPage}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />

        {/* Bottom row */}
        <div className="flex gap-4">
          <TopBarbers topThree={topBarbers}/>
          <div className="flex-1">
            <WeeklyChart/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPage;