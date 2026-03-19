import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

const AddServiceModal = ({ onClose, onAdd, editData = null }) => {
  const [name, setName] = useState(editData?.name || "");
  const [price, setPrice] = useState(editData?.price || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(editData?.image || null);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!name || !price) return;
    const service = {id: editData?.id, name, price: parseFloat(price), image: image || editData?.image };
    if (onAdd) onAdd(service);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1f14] border border-white/[0.07] rounded-2xl w-full max-w-md shadow-[0_24px_64px_rgba(0,0,0,0.6)] p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#f0ede6] font-bold text-lg">{editData ? "Edit Service" : "Add New Service"}</p>
            <p className="text-gray-500 text-xs tracking-widest uppercase mt-0.5">Services</p>
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
            className="relative w-full h-80 rounded-xl border-2 border-dashed border-white/20 hover:border-[#86c559]/60 transition-all overflow-hidden group cursor-pointer"
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500 group-hover:text-[#86c559] transition-colors">
                <FiUpload size={24} />
                <span className="text-[10px] font-bold tracking-widest uppercase">Upload Image</span>
              </div>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07] mb-5" />

        {/* Name */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Service Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Fade, Buzz Cut"
            className="bg-[#1e241a] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-[#f0ede6] placeholder-gray-600 outline-none focus:border-[#86c559]/50 transition-colors"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Price</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-bold">PHP</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#1e241a] border border-white/[0.07] rounded-xl pl-14 pr-4 py-2.5 text-sm text-[#f0ede6] placeholder-gray-600 outline-none focus:border-[#86c559]/50 transition-colors"
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
            className="flex-1 py-2.5 rounded-xl bg-[#86c559] border border-[#86c559] text-black text-sm font-bold hover:bg-[#86c559]/80 transition-all cursor-pointer"
          >
            {editData ? "Save Changes" : "Add Service"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddServiceModal;