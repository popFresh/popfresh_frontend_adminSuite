import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const statusStyles = {
  Healthy: {
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },

  "Low Stock": {
    icon: AlertTriangle,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },

  "Out of Stock": {
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
};

const InventoryStatusBadge = ({
  stock,
  reorderLevel,
}) => {

  let status = "Healthy";

  if (stock === 0) {
    status = "Out of Stock";
  } else if (stock <= reorderLevel) {
    status = "Low Stock";
  }

  const style = statusStyles[status];

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

export default InventoryStatusBadge;