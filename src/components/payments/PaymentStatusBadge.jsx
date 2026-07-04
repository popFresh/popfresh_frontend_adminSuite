import {
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
} from "lucide-react";

const statusStyles = {
  SUCCESS: {
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },

  PENDING: {
    icon: Clock3,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },

  FAILED: {
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },

  REFUNDED: {
    icon: RotateCcw,
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-300",
  },
};

const PaymentStatusBadge = ({ status }) => {
  const style = statusStyles[status] || {
    icon: Clock3,
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
  };

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
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};

export default PaymentStatusBadge;