import {
  Tag,
  Percent,
  IndianRupee,
  Users,
  CalendarDays,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";

const CouponCard = ({
  coupon,
  onEdit,
  onToggleStatus,
}) => {
  const usagePercentage = coupon.usageLimit
  ? Math.round(
      (coupon.usedCount / coupon.usageLimit) * 100
    )
  : 0;

  return (
    <div
  className="
    flex
    h-full
    flex-col
    rounded-3xl
    border
    border-slate-200
    dark:border-slate-800
    bg-white
    dark:bg-[#18211D]
    p-6
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl
  "
>
      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <Tag size={22} />
            </div>

            <div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {coupon.code}
              </h3>

              <p
  className="
    min-h-[48px]
    text-sm
    text-slate-500
    line-clamp-2
  "
>
  {coupon.description}
</p>

            </div>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            coupon.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {coupon.isActive ? "Active" : "Inactive"}
        </span>

      </div>

      {/* Discount */}

      <div className="mt-6 rounded-2xl bg-orange-50 dark:bg-orange-900/20 p-5">

        <p className="text-sm text-slate-500">
          Discount
        </p>

        <div className="mt-2 flex items-center gap-2">

          {coupon.discountType === "PERCENTAGE" ? (
            <>
              <Percent
                size={20}
                className="text-orange-600"
              />

              <span className="text-3xl font-bold text-slate-900 dark:text-white">
                {coupon.discountValue}%
              </span>
            </>
          ) : (
            <>
              <IndianRupee
                size={20}
                className="text-orange-600"
              />

              <span className="text-3xl font-bold text-slate-900 dark:text-white">
                {coupon.discountValue}
              </span>
            </>
          )}

        </div>

      </div>

      {/* Details */}

      <div className="mt-6 space-y-4">

        <div className="flex items-center justify-between">

          <span className="text-slate-500">
            Minimum Order
          </span>

          <span className="font-semibold text-slate-900 dark:text-white">
            ₹{coupon.minimumOrder}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-slate-500">
            Maximum Discount
          </span>

          <span className="font-semibold text-slate-900 dark:text-white">
            {coupon.maximumDiscount
              ? `₹${coupon.maximumDiscount}`
              : "-"}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Users
              size={17}
              className="text-orange-500"
            />

            <span className="text-slate-500">
              Used
            </span>

          </div>

          <span className="font-semibold text-slate-900 dark:text-white">
            {coupon.usedCount} / {coupon.usageLimit ?? "∞"}
          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

          <div
            className="h-full rounded-full bg-orange-500"
            style={{
              width: `${usagePercentage}%`,
            }}
          />

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <CalendarDays
              size={17}
              className="text-orange-500"
            />

            <span className="text-slate-500">
              Expires
            </span>

          </div>

          <span className="font-semibold text-slate-900 dark:text-white">
            {coupon.expiryDate
  ? new Date(
      coupon.expiryDate
    ).toLocaleDateString("en-IN")
  : "-"}
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-auto pt-8 flex gap-3">

        <button
          onClick={() => onEdit(coupon)}
          className="
            flex-1
            rounded-xl
            border
            border-slate-200
            py-3
            text-sm
            font-semibold
            text-slate-700
            dark:text-white
            transition
            hover:border-orange-300
            hover:bg-orange-50
            hover:text-orange-600
          "
        >
          <span className="flex items-center justify-center gap-2">
            <Pencil size={16} />
            Edit
          </span>
        </button>

        <button
  onClick={() => onToggleStatus(coupon)}
  className={`
    flex-1
    rounded-xl
    py-3
    text-sm
    font-semibold
    transition

    ${
      coupon.isActive
        ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
        : "border border-green-200 bg-green-50 text-green-600 hover:bg-green-100"
    }
  `}
>
  <span className="flex items-center justify-center gap-2">
    {coupon.isActive ? (
      <>
        <Trash2 size={16} />
        Deactivate
      </>
    ) : (
      <>
        <CheckCircle2 size={16} />
        Activate
      </>
    )}
  </span>
</button>

      </div>

    </div>
  );
};

export default CouponCard;