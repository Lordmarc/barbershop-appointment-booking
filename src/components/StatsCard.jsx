import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";


const StatsCard = ({ total, icon: Icon, title, percentage, symbol = "" }) => {
  return (
    <div className="rounded-md border border-primary/10 bg-primary/5 p-4">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-primary/15 rounded-md">
          <Icon className="text-primary text-xl"/>
        </div>
       
        <div className={`flex items-center  ${percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          <span>{percentage >= 0 ? '+' : '-'}</span>
          {Math.abs(percentage)}%{percentage >= 0 ? <FaArrowTrendUp/> : <FaArrowTrendDown/> } 
          </div>
      </div>
      <div>
        <span className="text-slate-400 text-sm uppercase">{title}</span>
        <p className="text-xl font-semibold">{symbol} {total}</p>
      </div>
    </div>
  );
}

export default StatsCard;