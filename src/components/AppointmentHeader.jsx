 const statusName = [
  "pending", "confirmed", "completed", "cancelled"
];

const AppointmentHeader = ({ appointments }) => {

  return(
      <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl">Appointments</h2>
            <p className="text-slate-400">Orchestrate the craftsman's schedule with precision.</p>
          </div>
          <div className="flex items-center">
            {statusName.map(s => (
              <div key={s} className="border-l border-l-primary/50 flex flex-col  p-4">
                <p className="text-sm text-primary">{s.charAt(0).toUpperCase() + s.slice(1)}</p>
                <p className="text-lg">{appointments?.[s] ?? 0}</p>
              </div>
            ))}
          </div>
        </div>
  );
}

export default AppointmentHeader;