import SectionCard from "../ui/SectionCard";
import Badge from "../ui/Badge";

const orders = [
  {
    id: "#POP-10241",
    customer: "Aarav Sharma",
    product: "Himalayan Salt Makhana",
    amount: "₹549",
    status: "delivered",
  },
  {
    id: "#POP-10240",
    customer: "Priya Iyer",
    product: "Peri Peri Makhana",
    amount: "₹899",
    status: "shipped",
  },
  {
    id: "#POP-10239",
    customer: "Rohan Kapoor",
    product: "Cheese Makhana",
    amount: "₹1,248",
    status: "processing",
  },
  {
    id: "#POP-10238",
    customer: "Meera Nair",
    product: "Pudina Makhana Combo",
    amount: "₹1,799",
    status: "pending",
  },
];

export default function RecentOrdersTable() {
  return (
    <SectionCard
      className="w-full h-full"
      title="Recent Orders"
      subtitle="Latest activity across your store"
    >
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="pb-4">Order ID</th>
              <th className="pb-4">Customer</th>
              <th className="pb-4">Product</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-slate-100 dark:border-[#31403B]"
              >
                <td className="py-5 font-semibold text-[#032F23] dark:text-white">
                  {order.id}
                </td>

                <td className="dark:text-slate-200">
                  {order.customer}
                </td>

                <td className="text-slate-500 dark:text-slate-400">
                  {order.product}
                </td>

                <td className="font-semibold text-[#032F23] dark:text-white">
                  {order.amount}
                </td>

                <td>
                  <Badge variant={order.status}>
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-slate-200 dark:border-[#31403B] p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-[#032F23] dark:text-white">
                  {order.id}
                </p>

                <p className="text-sm text-slate-500">
                  {order.customer}
                </p>
              </div>

              <Badge variant={order.status}>
                {order.status}
              </Badge>
            </div>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {order.product}
            </p>

            <p className="mt-2 font-semibold text-[#032F23] dark:text-white">
              {order.amount}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}