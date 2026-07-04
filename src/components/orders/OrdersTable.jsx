import OrderRow from "./OrderRow";

const OrdersTable = ({ orders = [], onView,viewLoadingId }) => {
  if (orders.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-[#18211D]
          p-12
          text-center
          shadow-sm
        "
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          No Orders Found
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          There are no orders matching your current filters.
        </p>

      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-[#18211D]
        shadow-sm
      "
    >

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111916]">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Order ID
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Products
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Items
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Payment
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Ordered At
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onView={onView}
                viewLoadingId={viewLoadingId}
              />
            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-[#18211D]
          px-6
          py-4
        "
      >

        <p className="text-sm text-slate-500 dark:text-slate-400">

          Showing{" "}

          <span className="font-semibold text-slate-900 dark:text-white">
            {orders.length}
          </span>{" "}

          orders

        </p>

        <button
          className="
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
            hover:text-orange-600
          "
        >
          View All
        </button>

      </div>

    </div>
  );
};

export default OrdersTable;