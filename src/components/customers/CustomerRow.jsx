import { Eye,Loader2 } from "lucide-react";
import CustomerStatusBadge from "./CustomerStatusBadge";

const CustomerRow = ({ customer, onView, loadingCustomerId,}) => {
  return (
    <tr
      className="
        transition-all
        duration-200
        hover:bg-orange-50/40
        dark:hover:bg-[#111916]
      "
    >
      {/* Customer */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-orange-100
              dark:bg-orange-900/20
              font-semibold
              text-orange-500
              dark:text-orange-300
            "
          >
            {customer.avatar}
          </div>

          <div>

            <h4 className="font-semibold text-slate-900 dark:text-white">
              {customer.name}
            </h4>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {customer.email || "-"}
            </p>

          </div>

        </div>

      </td>

      {/* Phone */}

      <td className="px-6 py-5">

        <span className="text-sm text-slate-700 dark:text-slate-300">
          {customer.phone}
        </span>

      </td>

      {/* Orders */}

      <td className="px-6 py-5 text-center">

        <span className="font-semibold text-slate-900 dark:text-white">
          {customer.totalOrders}
        </span>

      </td>

      {/* Total Spent */}

      <td className="px-6 py-5">

        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          ₹{Number(customer.totalSpent).toLocaleString()}
        </span>

      </td>

      {/* Last Order */}

      <td className="px-6 py-5">

        <span className="text-sm text-slate-500 dark:text-slate-400">

          {customer.lastOrder
            ? new Date(
                customer.lastOrder.createdAt
              ).toLocaleDateString("en-IN")
            : "-"}

        </span>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <CustomerStatusBadge
          status={customer.status}
        />

      </td>

      {/* Action */}

      <td className="px-6 py-5 text-right">

<button
  onClick={() => onView(customer.id)}
  disabled={loadingCustomerId === customer.id}
  className="
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-gray-200
    dark:border-gray-500
    dark:bg-[#18211D]
    px-4
    py-2
    text-sm
    font-semibold
    text-slate-800
    dark:text-white
    transition-all
    duration-300
    hover:bg-orange-100
    dark:hover:bg-[#18211D]
    dark:hover:border-orange-300
    disabled:cursor-not-allowed
    disabled:opacity-70
    min-w-[90px]
  "
>
  {loadingCustomerId === customer.id ? (
    <>
      <Loader2
        size={15}
        className="animate-spin"
      />
      Loading
    </>
  ) : (
    <>
      <Eye size={15} />
      View
    </>
  )}
</button>
      </td>

    </tr>
  );
};

export default CustomerRow;