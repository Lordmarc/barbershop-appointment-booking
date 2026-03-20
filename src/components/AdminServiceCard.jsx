import { FiEdit2 } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

const AdminServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden flex flex-col bg-[#1a1f14] border border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

      {/* Image */}
      <div className="relative h-40 sm:h-44 lg:h-52 overflow-hidden">
        <img
          src={service.image || "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80"}
          alt={service.name}
          className="w-full h-full object-cover brightness-[0.7] hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1f14]/90" />

        {/* Price Badge */}
        <div className="absolute top-3 left-3 bg-[#14180e]/80 border border-[#c8a84b]/40 rounded-full px-2.5 py-1">
          <span className="text-[10px] lg:text-[11px] font-bold tracking-widest text-[#c8a84b]">
            PHP {service.price}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 lg:p-4 flex items-center justify-between gap-2">
        <p className="text-[#f0ede6] font-bold text-sm lg:text-base truncate">{service.name}</p>

        {/* Actions */}
        <div className="flex gap-1.5 lg:gap-2 shrink-0">
          <button
            onClick={() => onEdit(service)}
            className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/[0.12] transition-all cursor-pointer"
          >
            <FiEdit2 size={12} />
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-500/20 hover:text-red-400 hover:border-red-400/30 transition-all cursor-pointer"
          >
            <IoTrashOutline size={13} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminServiceCard;