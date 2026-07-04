import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const NewOrderForm = ({ order, onConfirm, onCancel }) => {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">

      <div className="flex items-start gap-3">

        <div className="rounded-full bg-orange-100 p-2">
          <AlertTriangle
            size={20}
            className="text-orange-500"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            New Order Received
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Review the customer details and confirm this order to
            begin the fulfillment process.
          </p>
        </div>

      </div>

      {/* Summary */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Customer
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            {order.customer.name}
          </p>

          <p className="text-sm text-slate-500">
            {order.customer.phone}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Order Value
          </p>

          <p className="mt-2 text-xl font-bold text-slate-900">
            ₹{order.amount}
          </p>

          <p className="text-sm text-slate-500">
            {order.items} item(s)
          </p>
        </div>

      </div>

      {/* Products */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">

        <p className="mb-3 text-xs uppercase tracking-wider text-slate-500">
          Ordered Products
        </p>

        <div className="space-y-3">

          {order.products.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <span className="font-medium text-slate-800">
                {product.name}
              </span>

              <span className="text-sm text-slate-500">
                Qty × {product.qty}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 flex justify-end gap-3">

        <button
          onClick={() => onCancel(order)}
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 font-medium text-red-600 transition hover:bg-red-50"
        >
          <XCircle size={18} />
          Cancel Order
        </button>

        <button
          onClick={() => onConfirm(order)}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
        >
          <CheckCircle2 size={18} />
          Confirm Order
        </button>

      </div>

    </div>
  );
};

export default NewOrderForm;