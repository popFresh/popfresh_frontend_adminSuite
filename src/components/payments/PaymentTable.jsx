import PaymentRow from "./PaymentRow";
import Pagination from "../Pagination";

const PaymentTable = ({
  payments = [],
  loading = false,
  pagination,
  page,
  onPageChange,
  onView,
  viewLoadingId,
}) => {

  if (loading) {
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
        "
      >
        <p className="text-slate-500 dark:text-slate-400">
          Loading payments...
        </p>
      </div>
    );
  }

  if (!loading && payments.length === 0) {
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
        "
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          No Payments Found
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          No payment records match your current filters.
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

          <thead className="bg-slate-50 dark:bg-[#111916]">

            <tr className="border-b border-slate-200 dark:border-slate-800">

              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Transaction
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Order
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Method
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Paid On
              </th>

              <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Action
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

            {payments.map((payment) => (

              <PaymentRow
                key={payment.id}
                payment={payment}
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
          flex-col
          gap-4
          border-t
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-[#18211D]
          px-6
          py-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <p className="text-sm text-slate-500 dark:text-slate-400">

          Showing{" "}

          <span className="font-semibold text-slate-900 dark:text-white">

            {payments.length}

          </span>{" "}

          of{" "}

          <span className="font-semibold text-slate-900 dark:text-white">

            {pagination?.totalPayments || 0}

          </span>{" "}

          payments

        </p>

        <div className="flex items-center gap-3">

            {/* WILL ADD EXPORT FUNCTIONALITY LATER */}
{/* 
          <button
            disabled
            className="
              cursor-not-allowed
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
              text-slate-400
            "
          >
            Export
          </button> */}

          <Pagination
            pagination={pagination}
            page={page}
            onPageChange={onPageChange}
          />

        </div>

      </div>

    </div>
  );
};

export default PaymentTable;