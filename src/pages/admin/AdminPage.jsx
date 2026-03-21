import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBookingStats,
  getPercentageChange,
  getRevenue,
  getTodayAppointments,
  updateStatus,
  deleteAppointment,
} from "../../services/appointmentService";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import { FaRegCalendarCheck } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FaIdBadge } from "react-icons/fa6";
import { getTopBarbers, getTotalBarbers } from "../../services/barberService";
import Table from "../../components/Table";
import TopBarbers from "../../components/TopBarbers";
import RevenueChart from "../../components/RevenueChart";
import { supabase } from "../../lib/supabase";
import { useState } from "react";

const AdminPage = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ─── Queries ───────────────────────────────────────────────
  const { data: appointmentsData } = useQuery({
    queryKey: ['today-appointments', currentPage],
    queryFn: () => getTodayAppointments(currentPage, itemsPerPage),
  });

  const { data: bookingStats = { todayCount: 0, yesterdayCount: 0 } } = useQuery({
    queryKey: ['booking-stats'],
    queryFn: getBookingStats,
  });

  const { data: revenue = { thisMonthTotal: 0, lastMonthTotal: 0 } } = useQuery({
    queryKey: ['revenue'],
    queryFn: getRevenue,
  });

  const { data: barbersCount = 0 } = useQuery({
    queryKey: ['barbers-count'],
    queryFn: getTotalBarbers,
  });

  const { data: topBarbers = [] } = useQuery({
    queryKey: ['top-barbers'],
    queryFn: getTopBarbers,
  });

  // ─── Realtime ──────────────────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel('admin-dashboard')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        () => {
          
          queryClient.invalidateQueries({ queryKey: ['today-appointments'] });
          queryClient.invalidateQueries({ queryKey: ['booking-stats'] });
          queryClient.invalidateQueries({ queryKey: ['revenue'] });
          queryClient.invalidateQueries({ queryKey: ['top-barbers'] });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient]);

  // ─── Handlers ──────────────────────────────────────────────
  const handleUpdateStatus = async (id, status) => {
    await updateStatus(id, status);

    queryClient.invalidateQueries({ queryKey: ['today-appointments'] });
    queryClient.invalidateQueries({ queryKey: ['revenue'] });
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    queryClient.invalidateQueries({ queryKey: ['today-appointments'] });
  };

  // ─── Derived values ────────────────────────────────────────
  const todayAppointments = appointmentsData?.data ?? [];
  const totalCount = appointmentsData?.count ?? 0;
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

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <StatsCard total={todayAppointments.length} icon={FaRegCalendarCheck} title="total bookings" percentage={bookingPercentage}/>
          <StatsCard total={revenue.thisMonthTotal.toFixed(2)} icon={GiMoneyStack} title="monthly revenue" symbol="PHP" percentage={monthlyPercentage}/>
          <StatsCard total={barbersCount} icon={FaIdBadge} title="barbers"/>
        </div>

        {/* Table */}
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

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row gap-4">
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