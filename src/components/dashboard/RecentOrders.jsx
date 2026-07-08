import Card from "../ui/Card";

const statusClasses = {
  PENDING:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

  PROCESSING:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",

  PACKED:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",

  SHIPPED:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",

  DELIVERED:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

  CANCELLED:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

  RETURNED:
    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
};

export default function RecentOrders({
  data = [],
}) {
  return (
    <Card>
      <h3 className="mb-5 text-lg font-semibold text-[#032F23] dark:text-white">
        Recent Orders
      </h3>

      {data.length === 0 ? (
        <div className="py-8 text-center text-slate-500 dark:text-slate-400">
          No recent orders found.
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="font-semibold text-[#032F23] dark:text-white">
                  {order.receipt || order.id}
                </p>

                <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                  {order.customer?.name}
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    statusClasses[order.status] ||
                    "bg-slate-100 text-slate-700"
                  }`}
                >
                  {order.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className="text-right">
                <p className="font-bold text-[#032F23] dark:text-white">
                  ₹{Number(order.total).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

// import Card from "../ui/Card";

// const orders = [
//   {
//     id: "#PF1021",
//     customer: "Rahul Sharma",
//     amount: "₹499",
//   },
//   {
//     id: "#PF1022",
//     customer: "Priya Gupta",
//     amount: "₹899",
//   },
//   {
//     id: "#PF1023",
//     customer: "Aman Verma",
//     amount: "₹299",
//   },
// ];

// const RecentOrders = () => {
//   return (
//     <Card>
//       <h3 className="mb-4 text-lg font-semibold text-[#032F23] dark:text-white">
//         Recent Orders
//       </h3>

//       <div className="space-y-4">
//         {orders.map((order) => (
//           <div
//             key={order.id}
//             className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3"
//           >
//             <div>
//               <p className="font-medium dark:text-white">
//                 {order.id}
//               </p>

//               <p className="text-sm text-slate-500">
//                 {order.customer}
//               </p>
//             </div>

//             <span className="font-semibold dark:text-white">
//               {order.amount}
//             </span>
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// };

// export default RecentOrders;