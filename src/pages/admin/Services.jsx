import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AdminServiceCard from "../../components/AdminServiceCard";
import AddServiceModal from "../../components/AddServiceModal";
import { TbRazorElectric } from "react-icons/tb";
import { HiPlus } from "react-icons/hi";
import { addNewService, deleteService, getServices, updateService } from "../../services/barberService";
import toast from "react-hot-toast";

const Services = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async (serviceData) => {
    try {
      const data = await addNewService(serviceData);
      setServices(prev => [data, ...prev]);
      toast.success("Added Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add new service!");
    }
  };

  const handleEdit = async (serviceData) => {
    try {
      const data = await updateService(serviceData);
      setServices(prev => prev.map(s => s.id === serviceData.id ? data : s));
      setEditData(null);
      toast.success("Updated Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      setServices(prev => prev.filter(s => s.id !== id));
      toast.success("Deleted Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete!");
    }
  };

  const handleOpenEdit = (service) => {
    setEditData(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  return (
    <div className="bg-[#0f1309] flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 flex flex-col gap-4 lg:gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 lg:p-2.5 bg-[#2a3a1a] border border-white/[0.07] rounded-xl">
              <TbRazorElectric className="text-[#86c559] text-lg lg:text-xl" />
            </div>
            <div>
              <h2 className="text-[#f0ede6] text-xl lg:text-2xl font-bold">Services</h2>
              <p className="text-gray-500 text-xs lg:text-sm">Manage your barbershop services</p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-[#2a3a1a] rounded-xl border border-[#86c559]/30 text-[#86c559] font-bold text-xs lg:text-sm hover:bg-[#86c559]/20 transition-all cursor-pointer"
          >
            <HiPlus size={14} />
            <span className="uppercase tracking-widest text-[10px] lg:text-xs">Add Service</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07]" />

        {/* Services Grid — 1 col mobile, 2 tablet, 3 large, 4 desktop */}
        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-3 text-gray-600">
            <TbRazorElectric size={40} />
            <p className="text-sm font-bold tracking-widest uppercase">No services yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map(service => (
              <AdminServiceCard
                key={service.id}
                service={service}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>

      {showModal && (
        <AddServiceModal
          onClose={handleCloseModal}
          onAdd={editData ? handleEdit : handleAdd}
          editData={editData}
        />
      )}
    </div>
  );
};

export default Services;