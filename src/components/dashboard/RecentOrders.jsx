import Card from "../ui/Card";

const orders = [
  {
    id: "#PF1021",
    customer: "Rahul Sharma",
    amount: "₹499",
  },
  {
    id: "#PF1022",
    customer: "Priya Gupta",
    amount: "₹899",
  },
  {
    id: "#PF1023",
    customer: "Aman Verma",
    amount: "₹299",
  },
];

const RecentOrders = () => {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-[#032F23] dark:text-white">
        Recent Orders
      </h3>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3"
          >
            <div>
              <p className="font-medium dark:text-white">
                {order.id}
              </p>

              <p className="text-sm text-slate-500">
                {order.customer}
              </p>
            </div>

            <span className="font-semibold dark:text-white">
              {order.amount}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentOrders;