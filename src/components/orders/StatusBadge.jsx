import React from "react";

const statusStyles = {
  PENDING: {
    label: "Pending",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },

  PROCESSING: {
    label: "Processing",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },

  PACKED: {
    label: "Packed",
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
  },

  SHIPPED: {
    label: "Shipped",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
  },

  DELIVERED: {
    label: "Delivered",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },

  CANCELLED: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },

  RETURNED: {
    label: "Returned",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-300",
  },
};

const StatusBadge = ({ status }) => {

  const style =
    statusStyles[status] || {
      label: status,
      bg: "bg-gray-100",
      text: "text-gray-700",
      border: "border-gray-200",
    };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
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
      {style.label}
    </span>
  );
};

export default StatusBadge;