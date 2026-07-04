import { useState, useEffect } from "react";

import {
  Truck,
  Save,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  getShippingRule,
  updateShippingRule,
} from "../../api/shippingRule.api";

const ShippingSettings = () => {

  const [form, setForm] = useState({
    freeShippingThreshold: "",
    shippingCharge: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  //////////////////////////////////////////////////////
  // FETCH SHIPPING RULE
  //////////////////////////////////////////////////////

  const fetchShippingRule = async () => {
    try {

      setLoading(true);

      const data =
        await getShippingRule();

      setForm({
        freeShippingThreshold:
          data.freeShippingThreshold,

        shippingCharge:
          data.shippingCharge,

        isActive:
          data.isActive,
      });

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ??
        "Failed to load shipping settings."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchShippingRule();
  }, []);

  //////////////////////////////////////////////////////
  // HANDLE CHANGE
  //////////////////////////////////////////////////////

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  //////////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////////

  const handleSave = async () => {

    try {

      setSaving(true);

      await updateShippingRule({
        ...form,

        freeShippingThreshold: Number(
          form.freeShippingThreshold
        ),

        shippingCharge: Number(
          form.shippingCharge
        ),
      });

      toast.success(
        "Shipping settings updated successfully."
      );

      await fetchShippingRule();

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ??
        "Failed to update shipping settings."
      );

    } finally {

      setSaving(false);

    }
  };

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading shipping settings...
      </div>
    );
  }

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <div className="space-y-8">

      {/* Shipping Configuration */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">

            <Truck size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Shipping Configuration
            </h2>

            <p className="text-sm text-slate-500">
              Configure delivery charges for your store.
            </p>

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Free Shipping Threshold */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Free Shipping Threshold (₹)
            </label>

            <input
              type="number"
              name="freeShippingThreshold"
              value={form.freeShippingThreshold}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-orange-500
                dark:border-slate-700
                dark:bg-[#111916]
                dark:text-white
              "
            />

            <p className="mt-2 text-sm text-slate-500">
              Orders above this amount qualify for free shipping.
            </p>

          </div>

          {/* Shipping Charge */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Shipping Charge (₹)
            </label>

            <input
              type="number"
              name="shippingCharge"
              value={form.shippingCharge}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-orange-500
                dark:border-slate-700
                dark:bg-[#111916]
                dark:text-white
              "
            />

            <p className="mt-2 text-sm text-slate-500">
              Applied when the order value is below the free shipping threshold.
            </p>

          </div>

          {/* Active */}

          <div className="md:col-span-2">

            <div className="md:col-span-2">

  <div className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 p-5">

    <div>

     <div className="flex items-center gap-3">

  <h3 className="font-semibold text-slate-900 dark:text-white">
    Enable Shipping Rules
  </h3>

  <span
    className={`rounded-full px-2 py-1 text-xs font-semibold ${
      form.isActive
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {form.isActive ? "Active" : "Inactive"}
  </span>

</div>

      <p className="mt-1 text-sm text-slate-500">
        Enable or disable shipping charges across the store.
      </p>

    </div>

    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          isActive: !prev.isActive,
        }))
      }
      className={`
        relative
        h-8
        w-14
        rounded-full
        transition-all
        duration-300
        ${
          form.isActive
            ? "bg-orange-500"
            : "bg-slate-300 dark:bg-slate-600"
        }
      `}
    >

      <span
        className={`
          absolute
          top-1
          h-6
          w-6
          rounded-full
          bg-white
          shadow-md
          transition-all
          duration-300
          ${
            form.isActive
              ? "left-7"
              : "left-1"
          }
        `}
      />

    </button>

  </div>

</div>

          </div>

        </div>

      </div>
            {/* Current Policy */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">

            <CheckCircle2 size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Current Shipping Policy
            </h2>

            <p className="text-sm text-slate-500">
              Live preview of your current shipping configuration.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div className="flex items-center justify-between">

            <span className="text-slate-500">
              Free Shipping
            </span>

            <span className="font-semibold text-slate-900 dark:text-white">
              Above ₹{form.freeShippingThreshold || 0}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-slate-500">
              Shipping Charge
            </span>

            <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">

              <IndianRupee size={16} />

              {form.shippingCharge || 0}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-slate-500">
              Status
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                form.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {form.isActive
                ? "Active"
                : "Inactive"}
            </span>

          </div>

        </div>

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <button
          onClick={handleSave}
          disabled={saving}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-orange-500
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-orange-600
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          {saving ? (

            <>
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

              Saving...

            </>

          ) : (

            <>
              <Save size={18} />

              Save Changes
            </>

          )}

        </button>

      </div>

    </div>

  );
};

export default ShippingSettings;