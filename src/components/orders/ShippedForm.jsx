import { useState } from "react";
import { Truck, Hash, CalendarDays, Bell } from "lucide-react";

const courierPartners = [
  "Shiprocket",
  "Delhivery",
  "Blue Dart",
  "DTDC",
  "XpressBees",
  "India Post",
  "Other",
];

const ShippedForm = ({ order, onSave }) => {
  const [formData, setFormData] = useState({
    courier: "",
    trackingId: "",
    awbNumber: "",
    expectedDelivery: "",
    notifyCustomer: true,
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
      status: "Shipped",
      shipping: formData,
    });
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">

      <h3 className="text-lg font-semibold text-slate-900">
        Ship Order
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Enter courier and tracking details before marking this order as shipped.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >

        {/* Courier */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Courier Partner
          </label>

          <div className="relative">
            <Truck
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              name="courier"
              value={formData.courier}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
            >
              <option value="">Select Courier</option>

              {courierPartners.map((partner) => (
                <option
                  key={partner}
                  value={partner}
                >
                  {partner}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tracking */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Tracking ID
          </label>

          <div className="relative">
            <Hash
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="trackingId"
              value={formData.trackingId}
              onChange={handleChange}
              required
              placeholder="TRK123456789"
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
            />
          </div>
        </div>

        {/* AWB */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            AWB Number
          </label>

          <input
            type="text"
            name="awbNumber"
            value={formData.awbNumber}
            onChange={handleChange}
            placeholder="AWB987654321"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
          />
        </div>

        {/* Expected Delivery */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Expected Delivery
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              name="expectedDelivery"
              value={formData.expectedDelivery}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
            />
          </div>
        </div>

        {/* Notify */}

        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <Bell
            size={18}
            className="text-orange-500"
          />

          <span className="flex-1 text-sm font-medium text-slate-700">
            Notify customer via Email & WhatsApp
          </span>

          <input
            type="checkbox"
            name="notifyCustomer"
            checked={formData.notifyCustomer}
            onChange={handleChange}
            className="h-5 w-5 accent-orange-500"
          />
        </label>

        {/* Buttons */}

        <div className="flex justify-end gap-3 pt-2">

          <button
            type="reset"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Reset
          </button>

          <button
            type="submit"
            className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
          >
            Mark as Shipped
          </button>

        </div>

      </form>
    </div>
  );
};

export default ShippedForm;