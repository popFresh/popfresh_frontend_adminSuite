const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-[24px]
        border
        border-[#E6E0D5]
        dark:border-[#2A3933]
        bg-white
        dark:bg-[#1A2420]
        p-6
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        dark:shadow-none
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;