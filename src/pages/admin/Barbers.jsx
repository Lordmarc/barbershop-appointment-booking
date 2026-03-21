import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Sidebar from "../../components/Sidebar";
import { GiMoneyStack } from "react-icons/gi";
import { HiUserAdd } from "react-icons/hi";
import AdminBarberCard from "../../components/AdminBarberCard";
import { addNewBarber, deleteBarber, getBarbers, getTopPerformer, getTotalBarbers, updateBarber, updateBarberStatus } from "../../services/barberService";
import { FaPlusCircle } from "react-icons/fa";
import AddBarberModal from "../../components/AddBarberModal";
import EditBarberModal from "../../components/EditBarberModal";
import toast from "react-hot-toast";
import placeholder from "../../assets/placeholder.png";
import { supabase } from "../../lib/supabase";

const Barbers = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [isShowProfile, setIsShowProfile] = useState(false);

  // ─── Queries ───────────────────────────────────────────────
  const { data: barbers = [] } = useQuery({
    queryKey: ['barbers'],
    queryFn: getBarbers,
  });

  const { data: barbersCount = 0 } = useQuery({
    queryKey: ['barbers-count'],
    queryFn: getTotalBarbers,
  });

  const { data: topPerformer = [] } = useQuery({
    queryKey: ['top-performer'],
    queryFn: getTopPerformer,
  });

  // ─── Realtime ──────────────────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel('barbers-realtime')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'barbers' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['barbers'] });
          queryClient.invalidateQueries({ queryKey: ['barbers-count'] });
          queryClient.invalidateQueries({ queryKey: ['top-performer'] });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient]);

  // ─── Handlers ──────────────────────────────────────────────
  const handleEditProfile = (barber) => {
    setSelectedBarber(barber);
    setIsShowProfile(true);
  };

  const handleAddBarber = async (barberData) => {
    try {
      await addNewBarber(barberData);
      queryClient.invalidateQueries({ queryKey: ['barbers'] });
      queryClient.invalidateQueries({ queryKey: ['barbers-count'] });
      toast.success("Barber Added Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add new barber!");
    }
  };

  const handleUpdateBarber = async (id, barberData) => {
    try {
      await updateBarber(id, barberData);
      queryClient.invalidateQueries({ queryKey: ['barbers'] });
      setIsShowProfile(false);
      setSelectedBarber(null);
      toast.success("Barber Updated Successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update barber!");
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateBarberStatus(id, newStatus);
      queryClient.invalidateQueries({ queryKey: ['barbers'] });
      toast.success("Barber Updated Successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update barber!");
    }
  };

  const handleDeleteBarber = async (id) => {
    try {
      await deleteBarber(id);
      queryClient.invalidateQueries({ queryKey: ['barbers'] });
      queryClient.invalidateQueries({ queryKey: ['barbers-count'] });
      toast.success("Barber Deleted Successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete barber!");
    }
  };

  return (
    <div className="bg-[#0f1309] flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 flex flex-col gap-4">

        {/* Top Stats */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4">

          {/* Top Performer */}
          <div className="border border-white/[0.07] rounded-2xl p-6 lg:p-8 flex items-center flex-1 bg-[#1a1f14] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col">
              <p className="uppercase text-gray-500 text-xs tracking-widest">top performer</p>
              <h2 className="text-3xl lg:text-5xl text-[#f0ede6] font-bold tracking-tight">
                {topPerformer[0] ? topPerformer[0]?.name : 'No Top Performer yet'}
              </h2>
              <div className="flex items-center gap-1 mt-1">
                <GiMoneyStack className="text-green-400"/>
                <p className="text-gray-400 text-sm">{topPerformer[0]?.count} Bookings</p>
              </div>
            </div>
            <div className="h-16 w-16 lg:h-20 lg:w-20 overflow-hidden rounded-xl ml-auto border-2 border-white/[0.07] shrink-0">
              <img src={topPerformer[0]?.image || placeholder} alt="" className="w-full h-full object-cover"/>
            </div>
          </div>

          {/* Total Barbers */}
          <div className="border border-white/[0.07] rounded-2xl p-6 lg:p-8 lg:w-72 bg-[#1a1f14] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <p className="uppercase text-gray-500 text-xs tracking-widest">total barbers</p>
            <p className="text-[#f0ede6] text-5xl lg:text-6xl font-bold mt-2">{barbersCount}</p>
          </div>
        </div>

        {/* Barbers Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p className="text-[#f0ede6] text-lg font-semibold">Artisan Staff</p>
              <span className="text-sm text-gray-500">Manage and assign roles to your barbers</span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex gap-2 items-center px-4 py-2 bg-[#1a1f14] rounded-xl border border-white/[0.07] text-gray-300 font-semibold text-sm hover:bg-white/[0.06] transition-colors w-fit"
            >
              <HiUserAdd className="text-green-400"/>
              <span className="uppercase tracking-widest text-xs">add new barber</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {barbers.map(barber => (
              <AdminBarberCard
                key={barber.id}
                barber={barber}
                onStatusChange={handleUpdateStatus}
                onEditProfile={handleEditProfile}
                onDelete={handleDeleteBarber}
              />
            ))}
            <div
              className="border border-gray-400 border-dashed rounded-2xl flex items-center justify-center cursor-pointer group hover:bg-[#1a1f14] min-h-[180px] lg:min-h-[320px]"
              onClick={() => setShowModal(true)}
            >
              <FaPlusCircle className="h-16 w-16 lg:h-24 lg:w-24 text-gray-600 group-hover:text-slate-500"/>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AddBarberModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddBarber}
        />
      )}
      {isShowProfile && (
        <EditBarberModal
          barber={selectedBarber}
          onClose={() => { setIsShowProfile(false); setSelectedBarber(null); }}
          onUpdate={handleUpdateBarber}
        />
      )}
    </div>
  );
};

export default Barbers;