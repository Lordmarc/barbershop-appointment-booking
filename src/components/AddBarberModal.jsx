import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FiPlus, FiUpload } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

const AddBarberModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [specialties, setSpecialties] = useState([""]);
  const [shiftStart, setShiftStart] = useState("");
  const [shiftEnd, setShiftEnd] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAddSpecialty = () => {
    setSpecialties([...specialties, ""]);
  };

  const handleSpecialtyChange = (index, value) => {
    const updated = [...specialties];
    updated[index] = value;
    setSpecialties(updated);
  }; 

  const handleRemoveSpecialty = (index) => {
    setSpecialties(specialties.filter((_, i) => i !== index));
  };

 const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
};

const handleSubmit = () => {
  const filtered = specialties.filter(s => s.trim() !== "");
  const barber = {
    name,
    specialty: filtered.join(', '),
    shift: `${formatTime(shiftStart)} - ${formatTime(shiftEnd)}`, // ✅
    image,
  };
  if (onAdd) onAdd(barber);
  onClose();
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1f14] border border-white/[0.07] rounded-2xl w-full max-w-md shadow-[0_24px_64px_rgba(0,0,0,0.6)] p-6 relative">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#f0ede6] font-bold text-lg">Add New Barber</p>
            <p className="text-gray-500 text-xs tracking-widest uppercase mt-0.5">Artisan Staff</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-500/20 hover:text-red-400 hover:border-red-400/30 transition-all cursor-pointer"
          >
            <IoClose size={16} />
          </button>
        </div>

        {/* Image Upload */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => fileRef.current.click()}
            className="relative w-24 h-24 rounded-2xl border-2 border-dashed border-white/20 hover:border-primary/60 transition-all overflow-hidden group cursor-pointer"
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-1 text-gray-500 group-hover:text-primary transition-colors">
                <FiUpload size={20} />
                <span className="text-[10px] font-bold tracking-widest uppercase">Photo</span>
              </div>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07] mb-5" />

        {/* Name */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Marcus Thorne"
            className="bg-[#1e241a] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-[#f0ede6] placeholder-gray-600 outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Specialty */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Specialty</label>
          <div className="flex flex-col gap-2">
            {specialties.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={s}
                  onChange={(e) => handleSpecialtyChange(i, e.target.value)}
                  placeholder={`e.g. Fade, Buzz Cut`}
                  className="flex-1 bg-[#1e241a] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-[#f0ede6] placeholder-gray-600 outline-none focus:border-primary/50 transition-colors"
                />
                {specialties.length > 1 && (
                  <button
                    onClick={() => handleRemoveSpecialty(i)}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-gray-500 hover:bg-red-500/20 hover:text-red-400 transition-all cursor-pointer"
                  >
                    <IoTrashOutline size={14} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleAddSpecialty}
              className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-primary/70 hover:text-primary transition-colors w-fit cursor-pointer"
            >
              <FiPlus size={13} />
              Add Specialty
            </button>
          </div>
        </div>

        {/* Shift */}
        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Shift</label>
          <div className="flex items-center gap-3">
            <input
              type="time"
              value={shiftStart}
              onChange={(e) => setShiftStart(e.target.value)}
              className="flex-1 bg-[#1e241a] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-[#f0ede6] outline-none focus:border-primary/50 transition-colors"
            />
            <span className="text-gray-600 text-sm">—</span>
            <input
              type="time"
              value={shiftEnd}
              onChange={(e) => setShiftEnd(e.target.value)}
              className="flex-1 bg-[#1e241a] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-[#f0ede6] outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07] mb-5" />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-sm text-gray-400 font-semibold hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl bg-primary border border-primary text-black text-sm font-bold hover:bg-primary/80 transition-all cursor-pointer"
          >
            Add Barber
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddBarberModal;