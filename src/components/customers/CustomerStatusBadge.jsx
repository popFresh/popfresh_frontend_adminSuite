import {
  Sparkles,
  UserCheck,
  Award,
} from "lucide-react";

const statusStyles = {
  New: {
    icon: Sparkles,
    bg: "bg-blue-50 ",
    text: "text-blue-700",
    border: "border-blue-200 dark:border-blue-800",
  },

  Active: {
    icon: UserCheck,
    bg: "bg-emerald-50",
    text: "text-emerald-700 ",
    border: "border-emerald-200",
  },

  Loyal: {
    icon: Award,
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
};

const defaultStyle = {
  icon: UserCheck,
  bg: "bg-slate-100 dark:bg-slate-800",
  text: "text-slate-700 dark:text-slate-300",
  border: "border-slate-200 dark:border-slate-700",
};

const CustomerStatusBadge = ({ status }) => {
  const style = statusStyles[status] || defaultStyle;

  const Icon = style.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold
        ${style.bg}
        ${style.text}
        ${style.border}
      `}
    >
      <Icon size={13} />
      {status}
    </span>
  );
};

export default CustomerStatusBadge;