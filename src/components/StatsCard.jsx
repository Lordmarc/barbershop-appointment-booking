import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const StatsCard = ({ total, icon: Icon, title, percentage, symbol = "" }) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#1a1f14] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 bg-[#2a3a1a] border border-white/[0.07] rounded-xl">
          <Icon className="text-[#86c559] text-xl"/>
        </div>
        {percentage !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg
            ${percentage >= 0 ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
            <span>{percentage >= 0 ? '+' : ''}{Math.abs(percentage)}%</span>
            {percentage >= 0 ? <FaArrowTrendUp size={11}/> : <FaArrowTrendDown size={11}/>}
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-[#f0ede6]">{symbol && <span className="text-lg text-gray-500 mr-1">{symbol}</span>}{total}</p>
      </div>
    </div>
  );
};

export default StatsCard;