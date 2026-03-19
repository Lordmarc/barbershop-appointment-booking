import { MdStarOutline } from "react-icons/md";

const TopBarbers = ({ topThree }) => {
  return (
    <div className="border border-white/[0.07] p-5 rounded-2xl w-72 bg-[#1a1f14] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 bg-[#2a3a1a] rounded-lg">
          <MdStarOutline className="text-[#86c559] text-lg"/>
        </div>
        <p className="text-[#f0ede6] font-bold text-sm">Top Barbers</p>
      </div>

      <div className="h-px bg-white/[0.07] mb-4"/>

      <ul className="flex flex-col gap-3">
        {topThree.map((t, index) => (
          <li key={t.barber_id} className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-gray-600 w-4">{index + 1}</span>
            <img src={t.image} alt={t.name} className="h-9 w-9 rounded-xl object-cover border border-white/[0.07]"/>
            <div className="flex-1">
              <p className="text-[#f0ede6] text-sm font-semibold">{t.name}</p>
              <span className="text-[11px] text-gray-500">{t.count} completed</span>
            </div>
            {index === 0 && (
              <span className="text-[10px] font-bold tracking-widest text-[#c8a84b] uppercase">Top</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopBarbers;