import { useMemo, useState,useEffect } from "react";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
} from "../../api/coupon.api";
import {
  Plus,
  TicketPercent,
  CheckCircle2,
  XCircle,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";
// import couponsData from "../../data/couponData";
import CouponCard from "./CouponCard";
import CouponDrawer from "./CouponDrawer";

const CouponSettings = () => {
  // const [coupons, setCoupons] = useState(couponsData);
  const [coupons, setCoupons] = useState([]);

  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const stats = useMemo(() => {
    return {
      total: coupons.length,

      active: coupons.filter(
  (coupon) => coupon.isActive
).length,

      expired: coupons.filter((coupon) => {
  if (!coupon.expiryDate) return false;

  return new Date(coupon.expiryDate) < new Date();
}).length,
      totalUsed: coupons.reduce(
        (total, coupon) => total + coupon.usedCount,
        0
      ),
    };
  }, [coupons]);

  const handleCreateCoupon = () => {
    setSelectedCoupon(null);
    setDrawerOpen(true);
  };

  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setDrawerOpen(true);
  };

const handleToggleCoupon = async (coupon) => {

  const action = coupon.isActive
    ? "Deactivate"
    : "Activate";

  const confirmAction = window.confirm(
    `${action} "${coupon.code}"?`
  );

  if (!confirmAction) return;

  try {

  await updateCoupon(coupon.id, {
    isActive: !coupon.isActive,
  });
  

  

  toast.success(
  coupon.isActive
    ? "Coupon deactivated successfully."
    : "Coupon activated successfully."
);

await fetchCoupons();

} catch (err) {

  console.error(err);

  toast.error(
    err.response?.data?.message ??
    "Failed to update coupon."
  );

}

};

const handleSaveCoupon = async (couponData) => {
  try {
    if (selectedCoupon) {

      await updateCoupon(
        selectedCoupon.id,
        couponData
      );

      toast.success(
        "Coupon updated successfully."
      );

    } else {

      await createCoupon(couponData);

      toast.success(
        "Coupon created successfully."
      );

    }

    await fetchCoupons();

    setDrawerOpen(false);
    setSelectedCoupon(null);

  } catch (err) {

    console.error(err);

    toast.error(
      err.response?.data?.message ??
      "Failed to save coupon."
    );

  }
};
const fetchCoupons = async () => {
  try {
    setLoading(true);

    const data = await getCoupons();

    setCoupons(data);

  } catch (err) {

    console.error(err);

    toast.error(
      err.response?.data?.message ??
      "Failed to load coupons."
    );

  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchCoupons();
}, []);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Coupons
          </h2>

          <p className="mt-2 text-slate-500">
            Create and manage promotional coupons.
          </p>

        </div>

        <button
          onClick={handleCreateCoupon}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-orange-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-orange-600
          "
        >
          <Plus size={18} />

          Create Coupon

        </button>

      </div>

      {/* KPI */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Coupons
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {stats.total}
              </h3>

            </div>

            <TicketPercent className="text-orange-500" />

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Active
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {stats.active}
              </h3>

            </div>

            <CheckCircle2 className="text-green-500" />

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Expired
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {stats.expired}
              </h3>

            </div>

            <XCircle className="text-red-500" />

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#18211D]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Uses
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {stats.totalUsed}
              </h3>

            </div>

            <Users className="text-blue-500" />

          </div>

        </div>

      </div>

  
      {/* Coupons */}

{loading ? (

  <div className="py-20 text-center text-slate-500">
    Loading coupons...
  </div>

) : coupons.length === 0 ? (

  <div
    className="
      rounded-3xl
      border
      border-dashed
      border-slate-300
      dark:border-slate-700
      bg-white
      dark:bg-[#18211D]
      py-20
      text-center
    "
  >
    <TicketPercent
      size={54}
      className="mx-auto text-orange-500"
    />

    <h3
      className="
        mt-6
        text-2xl
        font-bold
        text-slate-900
        dark:text-white
      "
    >
      No coupons created yet
    </h3>

    <p
      className="
        mt-3
        text-slate-500
      "
    >
      Click <span className="font-semibold">Create Coupon</span> to add your first coupon.
    </p>
  </div>

) : (

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

    {coupons.map((coupon) => (
      <CouponCard
        key={coupon.id}
        coupon={coupon}
        onEdit={handleEditCoupon}
        onToggleStatus={handleToggleCoupon}
      />
    ))}

  </div>

)}

      {/* Drawer */}

      <CouponDrawer
        open={drawerOpen}
        coupon={selectedCoupon}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedCoupon(null);
        }}
        onSave={handleSaveCoupon}
      />

    </div>
  );
};

export default CouponSettings;