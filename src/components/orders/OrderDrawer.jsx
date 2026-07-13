import { useState,useEffect } from "react";
import {
  getOrderById,
  updateOrderStatus,
} from "../../api/order.api";
import OrderTimeline from "./OrderTimeline";
import { useSocket } from "../../context/SocketContext";
import {
  X,
  Phone,
  Mail,
  Package,
  CalendarDays,
} from "lucide-react";
import { toast } from "react-toastify";
import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";
import OrderStatusWorkflow from "./OrderStatusWorkflow";

const OrderDrawer = ({ order, open, onClose, onLoaded,onOrderUpdated, }) => {
const [showWorkflow, setShowWorkflow] = useState(false);
const [orderDetails, setOrderDetails] = useState(null);
const [loading, setLoading] = useState(false);

const { socket } = useSocket();

useEffect(() => {

  if (!open || !order) return;

  setShowWorkflow(false);

  fetchOrder();

}, [open, order]);

useEffect(() => {
  if (!open || !order) return;

  const handleOrderUpdated = (updatedOrder) => {
    // Ignore updates for other orders
    if (updatedOrder.id !== order.id) return;

    fetchOrder();
  };

  socket.on("order:updated", handleOrderUpdated);

  return () => {
    socket.off("order:updated", handleOrderUpdated);
  };
}, [socket, open, order]);

const fetchOrder = async () => {

  try {

    setLoading(true);

    const data = await getOrderById(order.id);

    setOrderDetails(data);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

    onLoaded?.();   

  }

};

const handleWorkflowSave = async (data) => {

    try {

        await updateOrderStatus(
            orderDetails.id,
            data
        );

        await fetchOrder();

        if (onOrderUpdated) {
            await onOrderUpdated();
        }

        toast.success(
            "Order status updated successfully."
        );

        setShowWorkflow(false);

    } catch (err) {

        console.error(err);

    }

};

const actionText = {

  PENDING: "Start Processing",

  PROCESSING: "Mark as Packed",

  
//   PACKED: "Mark as Shipped",
PACKED: "Open Fulfillment",

//   SHIPPED: "Mark as Delivered",
SHIPPED: "View Fulfillment",

  DELIVERED: "Delivered",

  CANCELLED: "Cancelled",

  RETURNED: "Returned",

};


if (!open || !order) return null;

if (loading) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      Loading...
    </div>
  );
}

if (!orderDetails) return null;

 const canUpdate = [
  "PENDING",
  "PROCESSING",
  "PACKED",
  "SHIPPED",
].includes(orderDetails.status);

const address =
  orderDetails.customer?.addresses?.[0];



  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => {
    setShowWorkflow(false);
    onClose();
}}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xl flex-col bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {orderDetails.receipt || orderDetails.id}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Order Details
            </p>
          </div>

          <button
            onClick={() => {
    setShowWorkflow(false);
    onClose();
}}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-8 overflow-y-auto p-6">

          {/* Customer */}
          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Customer
            </h3>

            <div className="rounded-xl border border-slate-200 p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-lg font-semibold text-orange-600">
                  {
  (
    orderDetails.customer?.fullName ||
    orderDetails.shippingName
  )
    .charAt(0)
    .toUpperCase()
}
                </div>

                <div>

                  <h4 className="font-semibold text-slate-900">
                    {orderDetails.customer?.fullName ||
orderDetails.shippingName}
                  </h4>

                  <div className="mt-2 space-y-2 text-sm text-slate-600">

                    <div className="flex items-center gap-2">
                      <Phone size={15} />
                      {orderDetails.customer?.phone ||
orderDetails.shippingPhone}
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail size={15} />
                      {orderDetails.customer?.email || "-"}
                    </div>

                  </div>
                  

                </div>

              </div>

            </div>

          </section>


{/* Shipping Address */}

<section>

  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
    Shipping Address
  </h3>

  <div className="rounded-2xl border border-slate-200 p-5">

    <div className="space-y-2">

      <p className="font-semibold text-slate-900">
        {orderDetails.shippingName}
      </p>

      <p className="text-sm text-slate-600">
        {orderDetails.shippingPhone}
      </p>

      <p className="leading-7 text-slate-700">

        {orderDetails.shippingAddress1}

        {orderDetails.shippingAddress2 && (
          <>
            <br />
            {orderDetails.shippingAddress2}
          </>
        )}

        {address?.landmark && (
          <>
            <br />
            <span className="font-medium">
              Landmark:
            </span>{" "}
            {address.landmark}
          </>
        )}

        <br />

        {orderDetails.shippingCity},{" "}
        {orderDetails.shippingState}

        <br />

        {orderDetails.shippingPincode}

        {address?.postOffice && (
  <>
    <br />
    <span className="font-medium">
      Post Office:
    </span>{" "}
    {address.postOffice}
  </>
)}

{address?.district && (
  <>
    <br />
    <span className="font-medium">
      District:
    </span>{" "}
    {address.district}
  </>
)}

      </p>

    </div>

  </div>

</section>

          {/* Products */}
          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Products
            </h3>

            <div className="space-y-3">

              {orderDetails.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-orange-50 p-3">
                      <Package
                        size={18}
                        className="text-orange-500"
                      />
                    </div>

                    <div>

                      <p className="font-medium text-slate-900">
                        {item.product.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        Qty : {item.quantity}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </section>

          {/* Payment */}
          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Payment
            </h3>

            <div className="rounded-xl border border-slate-200 p-5 space-y-4">

              <div className="flex items-center justify-between">

                <span className="text-slate-500">
                  Payment Status
                </span>

                <PaymentBadge
  payment={orderDetails.payment?.status}
/>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">
                  Total Amount
                </span>

                <span className="font-semibold text-slate-900">
                  ₹{Number(orderDetails.total).toFixed(2)}
                </span>

              </div>

            </div>

          </section>

          <OrderTimeline
  history={orderDetails.statusHistory}
/>

          {/* Order Status */}
          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Order Status
            </h3>

            <div className="rounded-xl border border-slate-200 p-5">

              <StatusBadge
  status={orderDetails.status}
/>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

                <CalendarDays size={15} />

                {new Date(orderDetails.createdAt).toLocaleString("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})}

              </div>

            </div>

            <div className="mt-5">
  
{canUpdate && !showWorkflow && (
    <button
        onClick={() => setShowWorkflow(true)}
        className="w-full rounded-xl bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600"
    >
        {actionText[orderDetails.status]}
    </button>
)}
</div>

          </section>
{showWorkflow && (
    <OrderStatusWorkflow
        order={orderDetails}
        onSave={handleWorkflowSave}
        refreshOrder={fetchOrder}
    />
)}

        </div>

        {/* Workflow */}

<div className="border-t border-slate-200 bg-slate-50 p-6">


  <div className="mt-6">
    <button
      onClick={() => {
    setShowWorkflow(false);
    onClose();
}}
      className="w-full rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-100"
    >
      Close
    </button>
  </div>
</div>

      </div>
    </>
  );
};

export default OrderDrawer;