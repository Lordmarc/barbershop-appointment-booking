const CustomInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  rightElement,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full text-[#f0ede6] ${className}`}>
      {label && (
        <label className="text-sm uppercase tracking-widest font-semibold">
          {label}
        </label>
      )}
      <div className="relative flex  items-center w-full">
        {Icon && (
          <Icon className="absolute left-3 text-[#d4cfc6] text-xl pointer-events-none" />
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={
            `w-full bg-neutral-dark border border-white/[0.07] p-3 rounded-md
            text-background-light transition-all focus:outline-none focus:border-white/50
            focus:ring-1 focus:ring-primary/30 placeholder:text-slate-600 
            ${Icon ? "pl-11" : "pl-4"} ${rightElement ? "pr-11" : "pr-4"}
            `}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 cursor-pointer hover:text-primary transition-colors">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;