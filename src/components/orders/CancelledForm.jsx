import { useState } from "react";
import {
  XCircle,
  RotateCcw,
  Package,
  FileText,
} from "lucide-react";

const cancellationReasons = [
  "Customer Requested",
  "Payment Failed",
  "Out of Stock",
  "Duplicate Order",
  "Invalid Address",
  "Fraud Suspected",
  "Courier Unavailable",
  "Other",
];

const CancelledForm = ({ order, onSave }) => {
  const [formData, setFormData] = useState({
    reason: "",
    notes: "",
    refundPayment: true,
    restockInventory: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...order,
      status: "Cancelled",
      cancellation: {
        ...formData,
        cancelledAt: new Date().toISOString(),
      },
    });
  };

  return (
    <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-full bg-red-100 p-3">
          <XCircle
            size={20}
            className="text-red-600"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Cancel Order
          </h3>

          <p className="text-sm text-slate-500">
            This action will stop the fulfilment process for this order.
          </p>
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >

        {/* Reason */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Cancellation Reason
          </label>

          <select
            required
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-500"
          >
            <option value="">
              Select a reason
            </option>

            {cancellationReasons.map((reason) => (
              <option
                key={reason}
                value={reason}
              >
                {reason}
              </option>
            ))}

          </select>

        </div>

        {/* Notes */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">

            <FileText size={16} />

            Additional Notes

          </label>

          <textarea
            rows={4}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Provide additional information..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-500"
          />

        </div>

        {/* Refund */}

        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">

          <RotateCcw
            size={18}
            className="text-red-500"
          />

          <div className="flex-1">

            <p className="font-medium text-slate-800">
              Refund Payment
            </p>

            <p className="text-sm text-slate-500">
              Initiate refund after cancellation.
            </p>

          </div>

          <input
            type="checkbox"
            name="refundPayment"
            checked={formData.refundPayment}
            onChange={handleChange}
            className="h-5 w-5 accent-red-500"
          />

        </label>

        {/* Restock */}

        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">

          <Package
            size={18}
            className="text-red-500"
          />

          <div className="flex-1">

            <p className="font-medium text-slate-800">
              Restock Inventory
            </p>

            <p className="text-sm text-slate-500">
              Return ordered products back to inventory.
            </p>

          </div>

          <input
            type="checkbox"
            name="restockInventory"
            checked={formData.restockInventory}
            onChange={handleChange}
            className="h-5 w-5 accent-red-500"
          />

        </label>

        {/* Footer */}

        <div className="flex justify-end gap-3">

          <button
            type="reset"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Reset
          </button>

          <button
            type="submit"
            className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
          >
            Cancel Order
          </button>

        </div>

      </form>

    </div>
  );
};

export default CancelledForm;