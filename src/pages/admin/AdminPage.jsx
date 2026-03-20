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
import { supabase } from "../../lib/supabase";
import RevenueChart from "../../components/RevenueChart";

const AdminPage = () => {
  const [bookingStats, setBookingStats] = useState({ todayCount: 0, yesterdayCount: 0 });
  const [revenue, setRevenue] = useState({ thisMonthTotal: 0, lastMonthTotal: 0 });
  const [barber, setBarber] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [topBarbers, setTopBarbers] = useState([]);
  const itemsPerPage = 5;

useEffect(() => {
  const fetchAll = async () => {
    try {
      const [
        { data, count },
        statsData,
        revenueData,
        barbersCount,
        topBarbersData
      ] = await Promise.all([
        getTodayAppointments(currentPage, itemsPerPage),
        getBookingStats(),
        getRevenue(),
        getTotalBarbers(),
        getTopBarbers()
      ]);

      setTodayAppointments(data);
      setTotalCount(count);
      setBookingStats(statsData);
      setRevenue(revenueData);
      setBarber(barbersCount);
      setTopBarbers(topBarbersData);
    } catch(error) {
      console.error(error);
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
}, [currentPage]);

  const handleUpdateStatus = async (id, status) => {
    await updateStatus(id, status);
    setTodayAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status } : a)
    );
      const revenueData = await getRevenue();
      setRevenue(revenueData);

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
      <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 flex flex-col gap-4 lg:gap-6 overflow-x-hidden">

        {/* Greeting */}
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[#f0ede6]">Hello, Admin</h1>
          <p className="text-gray-500 text-sm">Here's what's happening at Negro Barbershop today.</p>
        </div>

        {/* Stats — 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <StatsCard total={totalBookings} icon={FaRegCalendarCheck} title="total bookings" percentage={bookingPercentage}/>
          <StatsCard total={(revenue.thisMonthTotal).toFixed(2)} icon={GiMoneyStack} title="monthly revenue" symbol="PHP" percentage={monthlyPercentage}/>
          <StatsCard total={barber} icon={FaIdBadge} title="barbers"/>
        </div>

        {/* Table — horizontal scroll sa mobile */}
        <div className="overflow-x-auto rounded-2xl">
          <Table
            appointments={todayAppointments}
            totalCount={totalCount}
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / itemsPerPage)}
            onChangePage={setCurrentPage}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
          />
        </div>

        {/* Bottom row — stacked sa mobile, side by side sa desktop */}
        <div className="flex flex-col md:flex-row  gap-4">
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