import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const CouponDrawer = ({
  open,
  coupon,
  onClose,
  onSave,
}) => {


  const [form, setForm] = useState({
    id: "",
    code: "",
    description: "",

    discountType: "PERCENTAGE",

    discountValue: "",

    minimumOrder: "",

    maximumDiscount: "",

    usageLimit: "",

    expiryDate: "",

    isActive: true,

    usedCount: 0,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (coupon) {
      setForm({
  ...coupon,

  expiryDate: coupon.expiryDate
    ? coupon.expiryDate.slice(0, 10)
    : "",
});
    } else {
      setForm({
        id: "",

        code: "",

        description: "",

        discountType: "PERCENTAGE",

        discountValue: "",

        minimumOrder: "",

        maximumDiscount: "",

        usageLimit: "",

        expiryDate: "",

        isActive: true,

        usedCount: 0,
      });
    }
  }, [coupon]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSaving(true);

    await onSave({
      code: form.code,
      description: form.description,

      discountType: form.discountType,

      discountValue: Number(form.discountValue),

      minimumOrder: Number(form.minimumOrder),

      maximumDiscount: form.maximumDiscount
        ? Number(form.maximumDiscount)
        : null,

      usageLimit: form.usageLimit
        ? Number(form.usageLimit)
        : null,

      expiryDate: form.expiryDate
        ? new Date(form.expiryDate).toISOString()
        : null,

isActive: form.isActive,
    });

    toast.success(
      coupon
        ? "Coupon updated successfully."
        : "Coupon created successfully."
    );

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Something went wrong."
    );

  } finally {

    setSaving(false);

  }
};

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-2xl flex-col bg-white shadow-2xl dark:bg-[#18211D]">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {coupon
                ? "Edit Coupon"
                : "Create Coupon"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure your promotional coupon.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-y-auto"
        >

          <div className="space-y-6 p-6">
                      {/* Coupon Code */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Coupon Code
            </label>

            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="WELCOME10"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
              required
            />

          </div>

          {/* Description */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Description
            </label>

            <textarea
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="10% OFF on first order"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            />

          </div>

          {/* Discount */}

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Discount Type
              </label>

              <select
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
              >
               <option value="PERCENTAGE">
  Percentage
</option>

<option value="FLAT">
  Flat Amount
</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Discount Value
              </label>

              <input
                type="number"
                name="discountValue"
                value={form.discountValue}
                onChange={handleChange}
                placeholder={
  form.discountType === "FLAT"
    ? "10 (₹)"
    : "10 (%)"}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
              />

            </div>

          </div>

          {/* Order Conditions */}

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Minimum Order (₹)
              </label>

              <input
                type="number"
                name="minimumOrder"
                value={form.minimumOrder}
                onChange={handleChange}
                placeholder="499"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Maximum Discount (₹)
              </label>

              <input
                type="number"
                name="maximumDiscount"
                value={form.maximumDiscount}
                onChange={handleChange}
                placeholder="200"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
              />

            </div>

          </div>

          {/* Usage */}

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Usage Limit
              </label>

              <input
                type="number"
                name="usageLimit"
                value={form.usageLimit}
                onChange={handleChange}
                placeholder="1000"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Expiry Date
              </label>

              <input
                type="date"
               name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
              />

            </div>

          </div>

          {/* Status */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Status
            </label>

            {/* <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-[#111916] dark:text-white"
            >
             <option value={true}>
  Active
</option>

<option value={false}>
  Inactive
</option>
            </select> */}

            <div className="flex items-center gap-3">

<input
  type="checkbox"
  checked={form.isActive}
  onChange={(e) =>
    setForm({
      ...form,
      isActive: e.target.checked,
    })
  }
/>

<label className="font-medium text-slate-700 dark:text-slate-300">
    Active Coupon
  </label>

</div>
          </div>

                    </div>

          {/* Footer */}

          <div className="sticky bottom-0 border-t border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#18211D]">

            <div className="flex gap-4">

              <button
                type="button"
                onClick={onClose}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-slate-300
                  py-3
                  font-medium
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  dark:border-slate-700
                  dark:text-white
                  dark:hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <button
  type="submit"
  disabled={saving}
  className="
    flex-1
    rounded-xl
    bg-orange-500
    py-3
    font-semibold
    text-white
    transition
    hover:bg-orange-600
    disabled:opacity-70
    disabled:cursor-not-allowed
  "
>
                {saving ? (
  <span className="flex items-center justify-center gap-2">

    <div
      className="
        h-5
        w-5
        rounded-full
        border-2
        border-white/40
        border-t-white
        animate-spin
      "
    />

    {coupon ? "Updating..." : "Creating..."}

  </span>
) : (
  coupon
    ? "Update Coupon"
    : "Create Coupon"
)}
              </button>

            </div>

          </div>

        </form>

      </div>

    </>
  );
};

export default CouponDrawer;