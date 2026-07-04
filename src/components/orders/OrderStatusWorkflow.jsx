import OrderStatusForm from "./OrderStatusForm";

const OrderStatusWorkflow = ({ order, onSave }) => {
  if (!order) return null;

  // Orders that can still move to the next stage
  if (
    ["PENDING", "PROCESSING", "PACKED", "SHIPPED"].includes(order.status)
  ) {
    return (
      <OrderStatusForm
        order={order}
        onSave={onSave}
      />
    );
  }

  // Delivered
  if (order.status === "DELIVERED") {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <span className="text-2xl">✅</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-emerald-800">
              Order Delivered
            </h3>

            <p className="mt-2 text-sm leading-6 text-emerald-700">
              This order has been successfully delivered to the customer.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Cancelled
  if (order.status === "CANCELLED") {
    return (
      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl">❌</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-700">
              Order Cancelled
            </h3>

            <p className="mt-2 text-sm leading-6 text-red-600">
              This order has been cancelled and cannot be processed further.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Returned
  if (order.status === "RETURNED") {
    return (
      <div className="mt-6 rounded-2xl border border-slate-300 bg-slate-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
            <span className="text-2xl">↩️</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Order Returned
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This order has been returned by the customer.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
      <h3 className="text-lg font-semibold text-slate-800">
        Unknown Status
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        No workflow is available for this order.
      </p>
    </div>
  );
};

export default OrderStatusWorkflow;