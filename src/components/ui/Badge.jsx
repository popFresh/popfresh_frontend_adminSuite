const variants = {
  delivered:
    "bg-green-100 text-green-700",

  shipped:
    "bg-orange-100 text-orange-700",

    packed:
    "bg-[#F5F3FF] text-[#7107E7]",

  processing:
    "bg-blue-100 text-blue-700",

  pending:
    "bg-yellow-100 text-yellow-700",

  cancelled:
    "bg-red-100 text-red-700",
};

export default function Badge({
  children,
  variant,
}) {
  return (
    <span
      className={`
      px-3 py-1
      rounded-full
      text-xs
      font-medium
      ${variants[variant]}
    `}
    >
      {children}
    </span>
  );
}