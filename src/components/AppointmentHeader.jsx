const statusName = [
  "pending", "confirmed", "completed", "cancelled"
];

const statusConfig = {
  pending:   { dot: "bg-yellow-400", text: "text-yellow-300" },
  confirmed: { dot: "bg-blue-400",   text: "text-blue-300"   },
  completed: { dot: "bg-green-400",  text: "text-green-300"  },
  cancelled: { dot: "bg-red-400",    text: "text-red-300"    },
};

const AppointmentHeader = ({ appointments }) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* Title */}
      <div>
        <h2 className="text-2xl lg:text-4xl font-bold text-[#f0ede6]">Appointments</h2>
        <p className="text-slate-400 text-sm">Orchestrate the craftsman's schedule with precision.</p>
      </div>

      {/* Status Counts — 2x2 grid sa mobile, row sa desktop */}
      <div className="grid grid-cols-2 lg:flex lg:items-center rounded-xl overflow-hidden border border-white/[0.07]">
        {statusName.map(s => (
          <div
            key={s}
            className="flex flex-col gap-1 px-4 lg:px-6 py-3 bg-[#1a1f14]
              border-b border-r border-white/[0.07]
              last:border-r-0
              lg:border-b-0 lg:border-r lg:border-l lg:first:border-l-0"
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[s].dot}`} />
              <p className={`text-[10px] font-bold tracking-widest uppercase ${statusConfig[s].text}`}>
                {s}
              </p>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-[#f0ede6]">
              {appointments?.[s] ?? 0}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AppointmentHeader;