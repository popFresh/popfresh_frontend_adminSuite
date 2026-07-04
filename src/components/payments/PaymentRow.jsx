import { Eye, Loader2 } from "lucide-react";
import PaymentStatusBadge from "./PaymentStatusBadge";

const PaymentRow = ({
  payment,
  onView,
  viewLoadingId,
}) => {

    const isLoading =
    viewLoadingId === payment.id;

  return (
    <tr
      className="
        transition-all
        duration-200
        hover:bg-slate-50
        dark:hover:bg-[#111916]
      "
    >
      {/* Transaction */}

      <td className="px-6 py-5">

        <div>

          <p className="font-semibold text-slate-900 dark:text-white">
            {payment.receipt}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {payment.razorpayPaymentId}
          </p>

        </div>

      </td>

      {/* Customer */}

      <td className="px-6 py-5">

        <div>

          <p className="font-medium text-slate-900 dark:text-white">
            {payment.customer.name}
          </p>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {payment.customer.phone}
          </p>

        </div>

      </td>

      {/* Linked Order */}

      <td className="px-6 py-5">

        <span className="font-medium text-slate-700 dark:text-slate-300">
          {payment.order.receipt}
        </span>

      </td>

      {/* Amount */}

      <td className="px-6 py-5">

        <span className="font-semibold text-slate-900 dark:text-white">

          ₹{Number(payment.amount).toLocaleString()}

        </span>

      </td>

      {/* Method */}

      <td className="px-6 py-5">

        <span className="font-medium text-slate-800 dark:text-white">
          {payment.paymentMethod}
        </span>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <PaymentStatusBadge
          status={payment.status}
        />

      </td>

      {/* Paid On */}

      <td className="px-6 py-5">

        <span className="text-sm text-slate-600 dark:text-slate-300">

          {payment.paidAt
            ? new Date(payment.paidAt).toLocaleDateString("en-IN")
            : "-"}

        </span>

      </td>

      {/* Action */}

      <td className="px-6 py-5 text-right">

        <button
          onClick={() => onView(payment.id)}
          disabled={isLoading}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-[#18211D]
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-700
            dark:text-white
            transition-all
            duration-300
            hover:border-orange-300
            hover:bg-orange-50
            dark:hover:bg-[#111916]
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >


            {isLoading ? (
  <>
    <Loader2
      size={16}
      className="animate-spin"
    />
    View
  </>
) : (
  <>
    <Eye size={16} />
    View
  </>
)}
                 </button>

      </td>

    </tr>
  );
};

export default PaymentRow;