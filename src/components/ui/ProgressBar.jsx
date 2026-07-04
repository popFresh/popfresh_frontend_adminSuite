const ProgressBar = ({ value, color }) => {
  return (
    <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-[#24312D] overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;