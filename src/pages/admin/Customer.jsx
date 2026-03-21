import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaUserFriends } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { getCustomers } from "../../services/authService";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { supabase } from "../../lib/supabase";
dayjs.extend(localizedFormat);

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();

      const subscription = supabase
        .channel('customers-channel')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'profiles' },
          () => fetchCustomers()
        )
        .subscribe();
    
      return () => supabase.removeChannel(subscription);
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data } = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getLastAppointment = (appointments) => {
    if (!appointments || appointments.length === 0) return null;
    return appointments.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date;
  };

  const isActive = (appointments) => {
    if (!appointments || appointments.length === 0) return false;
    const last = getLastAppointment(appointments);
    return dayjs().diff(dayjs(last), "day") <= 30;
  };

  const filteredCustomers = customers?.filter(c =>
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone_number?.includes(search)
  ) ?? [];

  const StatusBadge = ({ active }) => active ? (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-400/30 bg-green-400/10">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#86c559]" />
      <span className="text-[10px] font-bold tracking-widest uppercase text-green-300">Active</span>
    </div>
  ) : (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04]">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Inactive</span>
    </div>
  );

  const Avatar = ({ customer }) => customer.avatar_url ? (
    <img src={customer.avatar_url} alt={customer.full_name} className="w-9 h-9 rounded-xl object-cover border border-white/10 shrink-0"/>
  ) : (
    <div className="w-9 h-9 rounded-xl bg-[#2a3a1a] border border-[#86c559]/20 flex items-center justify-center shrink-0">
      <span className="text-[11px] font-bold text-[#86c559]">{getInitials(customer.full_name)}</span>
    </div>
  );

  return (
    <div className="bg-[#0f1309] flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 flex flex-col gap-4 lg:gap-6">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#2a3a1a] border border-white/[0.07] rounded-xl">
              <FaUserFriends className="text-[#86c559] text-xl" />
            </div>
            <div>
              <h2 className="text-[#f0ede6] text-xl lg:text-2xl font-bold">Customers</h2>
              <p className="text-gray-500 text-sm">{customers.length} registered customers</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone..."
              className="w-full sm:w-72 bg-[#1a1f14] border border-white/[0.07] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#d4cfc6] placeholder-gray-600 outline-none focus:border-[#86c559]/50 transition-colors"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07]" />

        {/* Table */}
        <div className="flex flex-col bg-[#1a1f14] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/[0.07] bg-[#1e241a]">
                  {["Customer", "Email", "Phone", "Total Appointments", "Last Appointment", "Status"].map(col => (
                    <th key={col} className="px-6 py-3 text-[10px] font-bold tracking-widest uppercase text-gray-500">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-600 text-sm">Loading...</td></tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-600 text-sm">No customers found</td></tr>
                ) : filteredCustomers.map(c => {
                  const lastAppt = getLastAppointment(c.appointments);
                  const active = isActive(c.appointments);
                  return (
                    <tr key={c.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Avatar customer={c} />
                          <p className="text-[#f0ede6] font-semibold">{c.full_name ?? "—"}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4"><p className="text-gray-400 text-xs">{c.email ?? "—"}</p></td>
                      <td className="px-6 py-4"><p className="text-[#d4cfc6] text-sm">{c.phone_number ?? "—"}</p></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[#f0ede6] font-bold text-lg">{c.appointments?.length ?? 0}</span>
                          <span className="text-gray-600 text-xs">appts</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><p className="text-[#d4cfc6] text-sm">{lastAppt ? dayjs(lastAppt).format("ll") : "—"}</p></td>
                      <td className="px-6 py-4"><StatusBadge active={active} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="lg:hidden flex flex-col divide-y divide-white/[0.04]">
            {loading ? (
              <p className="text-center text-gray-600 text-sm py-8">Loading...</p>
            ) : filteredCustomers.length === 0 ? (
              <p className="text-center text-gray-600 text-sm py-8">No customers found</p>
            ) : filteredCustomers.map(c => {
              const lastAppt = getLastAppointment(c.appointments);
              const active = isActive(c.appointments);
              return (
                <div key={c.id} className="p-4 flex flex-col gap-3">

                  {/* Top — avatar + name + status */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar customer={c} />
                      <div>
                        <p className="text-[#f0ede6] font-semibold">{c.full_name ?? "—"}</p>
                        <p className="text-xs text-gray-500">{c.email ?? "—"}</p>
                      </div>
                    </div>
                    <StatusBadge active={active} />
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#1e241a] rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Phone</p>
                      <p className="text-[#d4cfc6] text-sm">{c.phone_number ?? "—"}</p>
                    </div>
                    <div className="bg-[#1e241a] rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Last Visit</p>
                      <p className="text-[#d4cfc6] text-sm">{lastAppt ? dayjs(lastAppt).format("ll") : "—"}</p>
                    </div>
                  </div>

                  {/* Total appointments */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#86c559] font-bold text-lg">{c.appointments?.length ?? 0}</span>
                    <span className="text-gray-500 text-xs">total appointments</span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Customers;