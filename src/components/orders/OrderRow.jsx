import { Eye, Loader2 } from "lucide-react";

import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";

const OrderRow = ({ order, onView, viewLoadingId }) => {

  const customerName =
    order.customer?.fullName || order.shippingName;

  const customerPhone =
    order.customer?.phone || order.shippingPhone;

  const avatar =
    customerName?.charAt(0).toUpperCase() || "?";

  const products = order.orderItems || [];

  return (
    <tr
      className="
        border-b
        border-slate-100
        dark:border-slate-800
        transition-all
        duration-200
        hover:bg-orange-50/40
        dark:hover:bg-[#111916]
      "
    >
      {/* Order ID */}

      <td className="whitespace-nowrap px-6 py-5">

        <p className="font-semibold text-slate-900 dark:text-white">

          {order.receipt || order.id}

        </p>

      </td>

      {/* Customer */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              bg-orange-100
              text-sm
              font-semibold
              text-orange-600
            "
          >
            {avatar}
          </div>

          <div>

            <p className="font-medium text-slate-900 dark:text-white">

              {customerName}

            </p>

            <p className="text-sm text-slate-500">

              {customerPhone}

            </p>

          </div>

        </div>

      </td>

      {/* Products */}

      <td className="px-6 py-5">

        <div className="space-y-1">

          {products.slice(0, 2).map((item) => (

            <p
              key={item.id}
              className="text-sm text-slate-700 dark:text-slate-300"
            >

              {item.product.name}

              <span className="ml-1 text-slate-500">

                × {item.quantity}

              </span>

            </p>

          ))}

          {products.length > 2 && (

            <p className="text-xs text-slate-400">

              +{products.length - 2} more

            </p>

          )}

        </div>

      </td>

      {/* Items */}

      <td className="px-6 py-5 text-center">

        <span className="font-medium text-slate-700 dark:text-slate-300">

          {products.reduce(
            (total, item) => total + item.quantity,
            0
          )}

        </span>

      </td>

      {/* Amount */}

      <td className="whitespace-nowrap px-6 py-5">

        <span className="font-semibold text-slate-900 dark:text-white">

          ₹{Number(order.total).toFixed(2)}

        </span>

      </td>

      {/* Payment */}

      <td className="px-6 py-5">

        <PaymentBadge
          payment={order.payment?.status || "PENDING"}
        />

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <StatusBadge status={order.status} />

      </td>

      {/* Ordered At */}

      <td className="whitespace-nowrap px-6 py-5">

        <p className="text-sm text-slate-600 dark:text-slate-300">

         {new Date(order.createdAt).toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})}

        </p>

      </td>

      {/* Action */}

      <td className="whitespace-nowrap px-6 py-5 text-right">

        <button
  onClick={() => onView(order)}
  disabled={viewLoadingId === order.id}
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
  {viewLoadingId === order.id ? (
   
     <Loader2
  size={18}
  className="animate-spin"
/>
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

export default OrderRow;