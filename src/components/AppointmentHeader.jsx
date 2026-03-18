const statusName = [
  "pending", "confirmed", "completed", "cancelled"
];

const statusConfig = {
  pending: { dot: "bg-yellow-400", text: "text-yellow-300" },
  confirmed: { dot: "bg-blue-400", text: "text-blue-300" },
  completed: { dot: "bg-green-400", text: "text-green-300" },
  cancelled: { dot: "bg-red-400", text: "text-red-300" },
};

const AppointmentHeader = ({ appointments }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-4xl">Appointments</h2>
        <p className="text-slate-400">Orchestrate the craftsman's schedule with precision.</p>
      </div>

      <div className="flex items-center">
        {statusName.map(s => (
          <div
            key={s}
            className="flex flex-col gap-1 px-6 py-3 border-l border-l-white/[0.07] bg-[#1a1f14] first:rounded-l-xl last:rounded-r-xl"
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[s].dot}`} />
              <p className={`text-[11px] font-bold tracking-widest uppercase ${statusConfig[s].text}`}>
                {s}
              </p>
            </div>
            <p className="text-2xl font-bold text-[#f0ede6]">
              {appointments?.[s] ?? 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentHeader;