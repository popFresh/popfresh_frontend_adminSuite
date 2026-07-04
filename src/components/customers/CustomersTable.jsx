import CustomerRow from "./CustomerRow";
import Pagination from "../Pagination";

const CustomersTable = ({
  customers = [],
  loading = false,
  pagination,
  
  onPageChange,
  onView,
  onExport,
  loadingCustomerId
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
          Loading customers...
        </p>
      </div>
    );
  }

  if (!loading && customers.length === 0) {
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
          No Customers Found
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          No customers match your current search.
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
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Phone
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Orders
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Total Spent
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Last Order
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

            {customers.map((customer) => (

              <CustomerRow
                key={customer.id}
                customer={customer}
                onView={onView}
                loadingCustomerId={loadingCustomerId}
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
        <p className="text-sm text-slate-500 dark:text-slate-400 ">

          Showing{" "}

<span className="font-semibold text-slate-900 dark:text-white ">

  {(pagination.page - 1) * pagination.limit + 1}
{" "}
</span>

-
{" "}
<span className="font-semibold text-slate-900 dark:text-white">

  {Math.min(
    pagination.page * pagination.limit,
    pagination.totalCustomers
  )}

</span>
{" "}
of
{" "}
<span className="font-semibold text-slate-900 dark:text-white">

  {pagination.totalCustomers}

</span>
{" "}
customers

        </p>

        <div className="flex items-center gap-3">

          {/* EXPORT BUTTON WILL ADD LATER  */}
{/* 
          <button
            onClick={onExport}
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
              hover:border-orange-300
              hover:bg-orange-50
              dark:hover:bg-[#111916]
            "
          >
            Export
          </button> */}

        {pagination?.totalPages > 1 && (

  <Pagination
    pagination={pagination}
    onPageChange={onPageChange}
  />

)}

        </div>

      </div>

    </div>
  );

};

export default CustomersTable;


// import CustomerRow from "./CustomerRow";

// const CustomersTable = ({
//   customers = [],
//   onView,
// }) => {
//   if (customers.length === 0) {
//     return (
//       <div
//         className="
//           rounded-3xl
//           border
//           border-slate-200
//           dark:border-slate-800
//           bg-white
//           dark:bg-[#18211D]
//           p-12
//           text-center
//           shadow-sm
//         "
//       >

//         <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
//           No Customers Found
//         </h3>

//         <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
//           No customers match your current search.
//         </p>

//       </div>
//     );
//   }

//   return (
//     <div
//       className="
//         overflow-hidden
//         rounded-3xl
//         border
//         border-slate-200
//         dark:border-slate-800
//         bg-white
//         dark:bg-[#18211D]
//         shadow-sm
//       "
//     >

//       <div className="overflow-x-auto">

//         <table className="min-w-full">

//           <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111916]">

//             <tr>

//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                 Customer
//               </th>

//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                 Phone
//               </th>

//               <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                 Orders
//               </th>

//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                 Total Spent
//               </th>

//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                 Last Order
//               </th>

//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                 Status
//               </th>

//               <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                 Actions
//               </th>

//             </tr>

//           </thead>

//           <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

//             {customers.map((customer) => (
//               <CustomerRow
//                 key={customer.id}
//                 customer={customer}
//                 onView={onView}
//               />
//             ))}

//           </tbody>

//         </table>

//       </div>

//       {/* Footer */}

//       <div
//         className="
//           flex
//           items-center
//           justify-between
//           border-t
//           border-slate-200
//           dark:border-slate-800
//           bg-white
//           dark:bg-[#18211D]
//           px-6
//           py-4
//         "
//       >

//         <p className="text-sm text-slate-500 dark:text-slate-400">

//           Showing{" "}

//           <span className="font-semibold text-slate-900 dark:text-white">
//             {customers.length}
//           </span>{" "}

//           customers

//         </p>

//         <button
//           className="
//             rounded-xl
//             border
//             border-slate-200
//             dark:border-slate-700
//             bg-white
//             dark:bg-[#18211D]
//             px-4
//             py-2
//             text-sm
//             font-semibold
//             text-slate-700
//             dark:text-white
//             transition-all
//             duration-300
//             hover:border-orange-300
//             hover:bg-orange-50
//             dark:hover:bg-[#111916]
//             hover:text-orange-600
//           "
//         >
//           Export
//         </button>

//       </div>

//     </div>
//   );
// };

// export default CustomersTable;