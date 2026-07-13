import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialState = {
  partnerName: "",
  driverName: "",
  driverPhone: "",
  trackingNumber: "",
  notes: "",
};

const ManualShipmentModal = ({
  open,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (open) {
      setForm(initialState);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (
      !form.partnerName.trim() ||
      !form.driverName.trim() ||
      !form.driverPhone.trim()
    ) {
      return;
    }

    onSubmit(form);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-[101] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Create Manual Shipment
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fill delivery partner details.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Delivery Partner *
            </label>

            <input
              type="text"
              name="partnerName"
              value={form.partnerName}
              onChange={handleChange}
              placeholder="Porter / Rapido / Swiggy Genie"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Driver Name *
            </label>

            <input
              type="text"
              name="driverName"
              value={form.driverName}
              onChange={handleChange}
              placeholder="Driver name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Driver Phone *
            </label>

            <input
              type="text"
              name="driverPhone"
              value={form.driverPhone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Tracking Number
            </label>

            <input
              type="text"
              name="trackingNumber"
              value={form.trackingNumber}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Notes
            </label>

            <textarea
              rows={4}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Optional notes"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-2 font-medium hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            disabled={
              loading ||
              !form.partnerName ||
              !form.driverName ||
              !form.driverPhone
            }
            onClick={handleSubmit}
            className="rounded-xl bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Manual Shipment"}
          </button>

        </div>
      </div>
    </>
  );
};

export default ManualShipmentModal;