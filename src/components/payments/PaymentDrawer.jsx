import {
  X,
  User,
  Phone,
  Mail,
  CreditCard,
  CalendarDays,
  IndianRupee,
} from "lucide-react";

import PaymentStatusBadge from "./PaymentStatusBadge";

const PaymentDrawer = ({
  payment,
  open,
  onClose,
}) => {

  if (!open || !payment) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xl flex-col bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>

            <h2 className="text-xl font-bold text-slate-900">

              {payment.receipt}

            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Payment Details
            </p>

          </div>

          <button
            onClick={onClose}
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

                  {payment.customer.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}

                </div>

                <div>

                  <h4 className="font-semibold text-slate-900">

                    {payment.customer.name}

                  </h4>

                  <div className="mt-2 space-y-2 text-sm text-slate-600">

                    <div className="flex items-center gap-2">

                      <Phone size={15} />

                      {payment.customer.phone}

                    </div>

                    <div className="flex items-center gap-2">

                      <Mail size={15} />

                      {payment.customer.email || "-"}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* Payment */}

          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">

              Payment Information

            </h3>

            <div className="space-y-4 rounded-xl border border-slate-200 p-5">

              <div className="flex items-center justify-between">

                <span className="text-slate-500">

                  Amount

                </span>

                <span className="flex items-center gap-1 font-semibold text-slate-900">

                  <IndianRupee size={16} />

                  {Number(payment.amount).toLocaleString()}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">

                  Payment Method

                </span>

                <div className="flex items-center gap-2">

                  <CreditCard
                    size={16}
                    className="text-orange-500"
                  />

                  <span className="font-medium text-slate-800">

                    {payment.paymentMethod}

                  </span>

                </div>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">

                  Status

                </span>

                <PaymentStatusBadge
                  status={payment.status}
                />

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">

                  Paid On

                </span>

                <div className="flex items-center gap-2">

                  <CalendarDays
                    size={16}
                    className="text-orange-500"
                  />

                  <span className="font-medium text-slate-900">

                    {payment.paidAt
                      ? new Date(
                          payment.paidAt
                        ).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "-"}

                  </span>

                </div>

              </div>

            </div>

          </section>

                    {/* Razorpay */}

          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Razorpay Details
            </h3>

            <div className="space-y-4 rounded-xl border border-slate-200 p-5">

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Razorpay Order ID
                </p>

                <p className="mt-1 break-all font-mono text-sm text-slate-900">
                  {payment.razorpayOrderId}
                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Razorpay Payment ID
                </p>

                <p className="mt-1 break-all font-mono text-sm text-slate-900">
                  {payment.razorpayPaymentId}
                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Signature
                </p>

                <p className="mt-1 break-all font-mono text-xs text-slate-700">
                  {payment.razorpaySignature}
                </p>

              </div>

            </div>

          </section>

          {/* Linked Order */}

          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Linked Order
            </h3>

            <div className="space-y-4 rounded-xl border border-slate-200 p-5">

              <div className="flex items-center justify-between">

                <span className="text-slate-500">
                  Receipt
                </span>

                <span className="font-semibold text-slate-900">
                  {payment.order.receipt}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">
                  Status
                </span>

                <span className="font-medium text-slate-900">
                  {payment.order.status}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">
                  Order Value
                </span>

                <span className="font-semibold text-slate-900">
                  ₹{Number(payment.order.total).toLocaleString()}
                </span>

              </div>

            </div>

          </section>

          {/* Products */}

          <section>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Products
            </h3>

            <div className="space-y-3">

              {payment.order.items.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    <div>

                      <p className="font-medium text-slate-900">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Qty : {item.quantity}
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold text-slate-900">
                      ₹{Number(item.price).toLocaleString()}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </section>
                  </div>

        {/* Footer */}

        <div className="border-t border-slate-200 bg-slate-50 p-6">

          <button
            onClick={onClose}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              py-3
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            Close
          </button>

        </div>

      </div>

    </>
  );

};

export default PaymentDrawer;

// import {
//   X,
//   User,
//   Phone,
//   Mail,
//   CreditCard,
//   Receipt,
//   CalendarDays,
//   Wallet,
//   Landmark,
// } from "lucide-react";

// import PaymentStatusBadge from "./PaymentStatusBadge";

// const PaymentDrawer = ({ payment, open, onClose }) => {
//   if (!open || !payment) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         onClick={onClose}
//         className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
//       />

//       {/* Drawer */}
//       <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xl flex-col bg-white shadow-2xl">

//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

//           <div>
//             <h2 className="text-xl font-bold text-slate-900">
//               {payment.id}
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Payment Details
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-lg p-2 transition hover:bg-slate-100"
//           >
//             <X size={20} />
//           </button>

//         </div>

//         {/* Body */}
//         <div className="flex-1 space-y-8 overflow-y-auto p-6">

//           {/* Customer */}

//           <section>

//             <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
//               Customer
//             </h3>

//             <div className="rounded-xl border border-slate-200 p-5">

//               <div className="flex items-center gap-4">

//                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-lg font-semibold text-orange-600">
//                   {payment.customer.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </div>

//                 <div className="space-y-2">

//                   <div className="flex items-center gap-2 text-slate-800">
//                     <User size={16} />
//                     {payment.customer.name}
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-slate-600">
//                     <Phone size={15} />
//                     {payment.customer.phone}
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-slate-600">
//                     <Mail size={15} />
//                     {payment.customer.email}
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </section>

//           {/* Transaction */}

//           <section>

//             <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
//               Transaction
//             </h3>

//             <div className="space-y-4 rounded-xl border border-slate-200 p-5">

//               <div className="flex items-center justify-between">
//                 <span className="text-slate-500">
//                   Order ID
//                 </span>

//                 <span className="font-semibold text-slate-900">
//                   {payment.orderId}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between">
//                 <span className="text-slate-500">
//                   Transaction ID
//                 </span>

//                 <span className="font-mono text-sm text-slate-900">
//                   {payment.transactionId}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between">
//                 <span className="text-slate-500">
//                   Gateway
//                 </span>

//                 <div className="flex items-center gap-2">
//                   <Landmark
//                     size={16}
//                     className="text-orange-500"
//                   />

//                   <span className="font-medium text-slate-800">
//                     {payment.gateway}
//                   </span>
//                 </div>
//               </div>

//             </div>

//           </section>

//           {/* Payment */}

//           <section>

//             <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
//               Payment Information
//             </h3>

//             <div className="space-y-4 rounded-xl border border-slate-200 p-5">

//               <div className="flex items-center justify-between">

//                 <span className="text-slate-500">
//                   Amount
//                 </span>

//                 <span className="text-lg font-bold text-slate-900">
//                   ₹{payment.amount}
//                 </span>

//               </div>

//               <div className="flex items-center justify-between">

//                 <span className="text-slate-500">
//                   Payment Method
//                 </span>

//                 <div className="flex items-center gap-2">

//                   <Wallet
//                     size={16}
//                     className="text-orange-500"
//                   />

//                   <span className="font-medium text-slate-800">
//                     {payment.method}
//                   </span>

//                 </div>

//               </div>

//               <div className="flex items-center justify-between">

//                 <span className="text-slate-500">
//                   Status
//                 </span>

//                 <PaymentStatusBadge
//                   status={payment.status}
//                 />

//               </div>

//             </div>

//           </section>

//           {/* Date */}

//           <section>

//             <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
//               Payment Date
//             </h3>

//             <div className="rounded-xl border border-slate-200 p-5">

//               <div className="flex items-center gap-2 text-slate-700">

//                 <CalendarDays size={16} />

//                 {payment.paymentDate}

//               </div>

//             </div>

//           </section>

//         </div>

//         {/* Footer */}

//         <div className="border-t border-slate-200 bg-slate-50 p-5">

//           <button
//             onClick={onClose}
//             className="w-full rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-100"
//           >
//             Close
//           </button>

//         </div>

//       </div>
//     </>
//   );
// };

// export default PaymentDrawer;