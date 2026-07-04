import {
  CheckCircle2,
  Clock3,
  RotateCcw,
  XCircle,
} from "lucide-react";

const paymentStyles = {
  SUCCESS: {
    icon: CheckCircle2,
    label: "Paid",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },

  PENDING: {
    icon: Clock3,
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },

  FAILED: {
    icon: XCircle,
    label: "Failed",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },

  REFUNDED: {
    icon: RotateCcw,
    label: "Refunded",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
  },
};

const PaymentBadge = ({ payment }) => {

  const style =
    paymentStyles[payment] ||
    paymentStyles.PENDING;

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

      {style.label}

    </span>
  );

};

export default PaymentBadge;