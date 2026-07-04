import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
const workflow = {
  PENDING: {
    title: "Start Processing",
    description:
      "Confirm that this order has been received and begin processing it.",
    nextStatus: "PROCESSING",
    button: "Start Processing",
    color: "orange",
  },

  PROCESSING: {
    title: "Mark as Packed",
    description:
      "The products have been packed and are ready for shipment.",
    nextStatus: "PACKED",
    button: "Mark as Packed",
    color: "amber",
  },

  PACKED: {
    title: "Mark as Shipped",
    description:
      "The shipment has been handed over to the courier partner.",
    nextStatus: "SHIPPED",
    button: "Mark as Shipped",
    color: "blue",
  },

  SHIPPED: {
    title: "Mark as Delivered",
    description:
      "Confirm that the customer has successfully received the order.",
    nextStatus: "DELIVERED",
    button: "Mark as Delivered",
    color: "green",
  },
};

const colorClasses = {
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "bg-orange-100 text-orange-600",
    button: "bg-orange-500 hover:bg-orange-600",
  },

  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "bg-amber-100 text-amber-600",
    button: "bg-amber-500 hover:bg-amber-600",
  },

  blue: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    icon: "bg-sky-100 text-sky-600",
    button: "bg-sky-600 hover:bg-sky-700",
  },

  green: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "bg-emerald-100 text-emerald-600",
    button: "bg-emerald-600 hover:bg-emerald-700",
  },
};



const OrderStatusForm = ({ order, onSave }) => {
  const current = workflow[order.status];

  if (!current) return null;

  const colors = colorClasses[current.color];

  const [saving, setSaving] = useState(false);

  const [cancelSaving, setCancelSaving] = useState(false);
const [form, setForm] = useState({
  courierName: "",
  trackingNumber: "",
  trackingUrl: "",
  internalNote: "",
  cancelReason: "",
});


useEffect(() => {
  setForm({
    courierName: order.courierName ?? "",
    trackingNumber: order.trackingNumber ?? "",
    trackingUrl: order.trackingUrl ?? "",
    internalNote: "",
    cancelReason: "",
  });
}, [order.id]);

const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleClick = async () => {

  if (
    order.status === "PACKED" &&
    (!form.courierName.trim() || !form.trackingNumber.trim())
  ) {
    toast.error(
      "Courier Name and Tracking Number are required."
    );
    return;
  }

  try {

    setSaving(true);

    await onSave({
      status: current.nextStatus,
      courierName: form.courierName,
      trackingNumber: form.trackingNumber,
      trackingUrl: form.trackingUrl,
      internalNote: form.internalNote,
    });
    

  } finally {

    setSaving(false);

  }
};


const handleCancel = async () => {

  if (!form.cancelReason.trim()) {
    toast.error("Cancellation reason is required.");
    return;
  }

  try {

    setCancelSaving(true);


    await onSave({
      status: "CANCELLED",
      cancelReason: form.cancelReason,
      internalNote: form.internalNote,
    });

    

  } finally {

    setCancelSaving(false);

  }
};

  return (
    <div
      className={`
        mt-6
        rounded-2xl
        border
        p-6
        ${colors.bg}
        ${colors.border}
      `}
    >
      <div className="flex items-start gap-4">

        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            ${colors.icon}
          `}
        >
          <CheckCircle2 size={22} />
        </div>

        <div className="flex-1">

          <h3 className="text-lg font-semibold text-slate-900">
            {current.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {current.description}
          </p>

        </div>

      </div>

{/* Dynamic Fields */}

<div className="mt-6 space-y-4">

  {/* Courier Details */}

  {order.status === "PACKED" && (
    <>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Courier Name <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          name="courierName"
          value={form.courierName}
          onChange={handleChange}
          placeholder="e.g. BlueDart"
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-orange-500
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Tracking Number <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          name="trackingNumber"
          value={form.trackingNumber}
          onChange={handleChange}
          placeholder="Enter tracking number"
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-orange-500
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Tracking URL
        </label>

        <input
          type="url"
          name="trackingUrl"
          value={form.trackingUrl}
          onChange={handleChange}
          placeholder="https://..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-orange-500
          "
        />
      </div>
    </>
  )}

  {/* Internal Note */}

  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      Internal Note
    </label>

    <textarea
      rows={4}
      name="internalNote"
      value={form.internalNote}
      onChange={handleChange}
      placeholder="Add an internal note..."
      className="
        w-full
        resize-none
        rounded-xl
        border
        border-slate-300
        px-4
        py-3
        text-sm
        outline-none
        transition
        focus:border-orange-500
      "
    />
  </div>

</div>

      <button
  onClick={handleClick}
  disabled={saving}
  className={`
    mt-6
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    py-3
    font-semibold
    text-white
    transition

    ${colors.button}

    ${
      saving
        ? "opacity-70 cursor-not-allowed"
        : ""
    }
  `}
>
  {saving ? (
    <>
      <Loader2
        size={18}
        className="animate-spin"
      />
      Updating...
    </>
  ) : (
    <>
      {current.button}
      <ArrowRight size={18} />
    </>
  )}
</button>

{["PENDING", "PROCESSING", "PACKED"].includes(order.status) && (
  <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">
    <h4 className="text-base font-semibold text-red-700">
      Cancel Order
    </h4>

    <p className="mt-1 text-sm text-red-600">
      Cancel this order if it cannot be fulfilled.
    </p>

    <div className="mt-4">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Cancellation Reason
      </label>

      <textarea
        rows={3}
        name="cancelReason"
        value={form.cancelReason}
        onChange={handleChange}
        placeholder="Why is this order being cancelled?"
        className="
          w-full
          resize-none
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          text-sm
          outline-none
          transition
          focus:border-red-500
        "
      />
    </div>
<button
  onClick={handleCancel}
  disabled={cancelSaving}
  className={`
    mt-5
    w-full
    rounded-xl
    py-3
    font-semibold
    text-white
    transition

    ${
      cancelSaving
        ? "cursor-not-allowed bg-red-400"
        : "bg-red-600 hover:bg-red-700"
    }
  `}
>
  {cancelSaving ? (
    <>
      <Loader2
        size={18}
        className="mr-2 inline animate-spin"
      />
      Cancelling...
    </>
  ) : (
    "Cancel Order"
  )}
</button>
  </div>
)}
    </div>
  );
};

export default OrderStatusForm;