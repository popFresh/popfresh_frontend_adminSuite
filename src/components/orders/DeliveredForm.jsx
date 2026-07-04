import { useState } from "react";
import {
  CheckCircle2,
  CalendarDays,
  User,
  ClipboardCheck,
} from "lucide-react";

const DeliveredForm = ({ order, onSave }) => {
  const [formData, setFormData] = useState({
    deliveredOn: new Date().toISOString().split("T")[0],
    receivedBy: "",
    deliveryNotes: "",
    customerConfirmed: true,
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
      status: "Delivered",
      delivery: formData,
    });
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-full bg-emerald-100 p-3">
          <CheckCircle2
            size={20}
            className="text-emerald-600"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Delivery Confirmation
          </h3>

          <p className="text-sm text-slate-500">
            Complete the delivery details before closing this order.
          </p>
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >

        {/* Delivery Date */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Delivery Date
          </label>

          <div className="relative">

            <CalendarDays
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              name="deliveredOn"
              value={formData.deliveredOn}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
            />

          </div>

        </div>

        {/* Received By */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Received By
          </label>

          <div className="relative">

            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="receivedBy"
              value={formData.receivedBy}
              onChange={handleChange}
              placeholder="Customer / Family Member"
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
            />

          </div>

        </div>

        {/* Notes */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Delivery Notes
          </label>

          <textarea
            rows={4}
            name="deliveryNotes"
            value={formData.deliveryNotes}
            onChange={handleChange}
            placeholder="Any delivery remarks..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
          />

        </div>

        {/* Customer Confirmation */}

        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">

          <ClipboardCheck
            size={18}
            className="text-emerald-600"
          />

          <span className="flex-1 text-sm font-medium text-slate-700">
            Customer confirmed successful delivery
          </span>

          <input
            type="checkbox"
            name="customerConfirmed"
            checked={formData.customerConfirmed}
            onChange={handleChange}
            className="h-5 w-5 accent-orange-500"
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
            className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
          >
            Mark as Delivered
          </button>

        </div>

      </form>

    </div>
  );
};

export default DeliveredForm;