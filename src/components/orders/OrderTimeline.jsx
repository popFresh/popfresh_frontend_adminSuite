import {
  Clock3,
  PackageCheck,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Mail,
  MessageCircle,
} from "lucide-react";

// =====================================================
// Status Configuration
// =====================================================

const statusConfig = {
  PENDING: {
    icon: Clock3,
    title: "Pending",
    bg: "bg-amber-100",
    color: "text-amber-600",
  },

  PROCESSING: {
    icon: PackageCheck,
    title: "Processing",
    bg: "bg-orange-100",
    color: "text-orange-600",
  },

  PACKED: {
    icon: Package,
    title: "Packed",
    bg: "bg-violet-100",
    color: "text-violet-600",
  },

  SHIPPED: {
    icon: Truck,
    title: "Shipped",
    bg: "bg-sky-100",
    color: "text-sky-600",
  },

  OUT_FOR_DELIVERY: {
    icon: Truck,
    title: "Out For Delivery",
    bg: "bg-orange-100",
    color: "text-orange-600",
  },

  DELIVERED: {
    icon: CheckCircle2,
    title: "Delivered",
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },

  CANCELLED: {
    icon: XCircle,
    title: "Cancelled",
    bg: "bg-red-100",
    color: "text-red-600",
  },

  RETURNED: {
    icon: RotateCcw,
    title: "Returned",
    bg: "bg-slate-200",
    color: "text-slate-600",
  },
};

// =====================================================
// Date Formatter
// =====================================================

const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

// =====================================================
// Helpers
// =====================================================

const isNotification = (note = "") => {
  return (
    note.startsWith("📧") ||
    note.startsWith("📱") ||
    note.startsWith("❌")
  );
};

const getActivity = (note = "") => {
  const lower = note.toLowerCase();

  return {
    email: lower.includes("email"),

    whatsapp: lower.includes("whatsapp"),

    success: lower.includes("sent successfully"),

    failed:
      lower.includes("failed") ||
      lower.includes("reason:"),

    title: lower.includes("order confirmation")
      ? "Order Confirmation"
      : lower.includes("packed")
      ? "Packed Notification"
      : lower.includes("out for delivery")
      ? "Out For Delivery"
      : lower.includes("delivered")
      ? "Delivered Notification"
      : "Notification",

    reason: note
      .replace("📧", "")
      .replace("📱", "")
      .replace("❌", "")
      .trim(),
  };
};

// =====================================================
// Component
// =====================================================

const OrderTimeline = ({ history = [] }) => {

  if (!history.length) return null;

  // =====================================================
  // Group Notifications
  // =====================================================

  const timeline = [];

  history.forEach((item) => {

    const note = item.note || "";

    if (isNotification(note)) {

      const previous =
        timeline[timeline.length - 1];

      if (previous) {

        previous.activities.push(item);

      }

      return;

    }

    timeline.push({
      ...item,
      activities: [],
    });

  });
    return (
    <section className="mt-8">

      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
        Order Timeline
      </h3>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">

        <div className="space-y-6">

          {timeline.map((item, index) => {

            const config =
              statusConfig[item.status] ||
              statusConfig.PENDING;

            const Icon = config.icon;

            const isLast =
              index === timeline.length - 1;

            return (

              <div
                key={item.id}
                className="relative flex gap-4"
              >

                {/* Timeline */}

                <div className="flex flex-col items-center">

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      ${config.bg}
                    `}
                  >

                    <Icon
                      size={18}
                      className={config.color}
                    />

                  </div>

                  {!isLast && (
                    <div className="mt-2 h-full w-px bg-slate-200" />
                  )}

                </div>

                {/* Content */}

                <div className="flex-1 pb-5">

                  <div className="flex items-center justify-between">

                    <h4 className="font-semibold text-slate-900">
                      {config.title}
                    </h4>

                    <span className="text-[11px] text-slate-400">
                      {formatDate(item.createdAt)}
                    </span>

                  </div>

                  {item.note && (

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.note}
                    </p>

                  )}

                  {/* Activities */}

                  {item.activities.length > 0 && (

                    <div className="mt-4 ml-1 border-l-2 border-slate-200 pl-4">

                      <div className="space-y-3">

                        {item.activities.map((activity) => {

                          const info =
                            getActivity(activity.note);

                          return (

                            <div
                              key={activity.id}
                              className="flex items-start justify-between gap-4"
                            >

                              {/* Left */}

                              <div className="flex items-start gap-3">

                                <div className="mt-0.5">

                                  {info.email ? (

                                    <Mail
                                      size={15}
                                      className="text-blue-600"
                                    />

                                  ) : (

                                    <MessageCircle
                                      size={15}
                                      className="text-green-600"
                                    />

                                  )}

                                </div>

                                <div>

                                  <p className="text-sm font-medium text-slate-700">

                                    {info.email
                                      ? "Email Notification"
                                      : "WhatsApp Notification"}

                                  </p>

                                  <p className="text-xs text-slate-500">

                                    {info.title}

                                  </p>

                                  {info.failed && (

                                    <p className="mt-1 whitespace-pre-line text-xs text-red-600">

                                      {info.reason}

                                    </p>

                                  )}

                                </div>

                              </div>

                              {/* Right */}

                              {info.success ? (

                                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">

                                  ✓ Sent

                                </span>

                              ) : (

                                <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-semibold text-red-700">

                                  ✕ Failed

                                </span>

                              )}

                            </div>

                          );

                        })}

                      </div>

                    </div>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );

};

export default OrderTimeline;

// import {
//   Clock3,
//   PackageCheck,
//   Package,
//   Truck,
//   CheckCircle2,
//   XCircle,
//   RotateCcw,
// } from "lucide-react";

// const statusConfig = {
//   PENDING: {
//     icon: Clock3,
//     color: "text-amber-600",
//     bg: "bg-amber-100",
//     title: "Pending",
//   },

//   PROCESSING: {
//     icon: PackageCheck,
//     color: "text-orange-600",
//     bg: "bg-orange-100",
//     title: "Processing",
//   },

//   PACKED: {
//     icon: Package,
//     color: "text-violet-600",
//     bg: "bg-violet-100",
//     title: "Packed",
//   },

//   SHIPPED: {
//     icon: Truck,
//     color: "text-sky-600",
//     bg: "bg-sky-100",
//     title: "Shipped",
//   },
//   OUT_FOR_DELIVERY: {
//   icon: Truck,
//   color: "text-orange-600",
//   bg: "bg-orange-100",
//   title: "Out For Delivery",
// },

//   DELIVERED: {
//     icon: CheckCircle2,
//     color: "text-emerald-600",
//     bg: "bg-emerald-100",
//     title: "Delivered",
//   },

//   CANCELLED: {
//     icon: XCircle,
//     color: "text-red-600",
//     bg: "bg-red-100",
//     title: "Cancelled",
//   },

//   RETURNED: {
//     icon: RotateCcw,
//     color: "text-slate-600",
//     bg: "bg-slate-200",
//     title: "Returned",
//   },
// };

// const getNotificationType = (note = "") => {

//   const text = note.toLowerCase();

//   if (text.includes("email")) {
//     return "EMAIL";
//   }

//   if (text.includes("whatsapp")) {
//     return "WHATSAPP";
//   }

//   return "GENERAL";

// };
// const getNotificationStatus = (note = "") => {

//   const text = note.toLowerCase();

//   if (
//     text.includes("failed") ||
//     text.includes("reason:")
//   ) {
//     return "FAILED";
//   }

//   if (
//     text.includes("sent successfully")
//   ) {
//     return "SUCCESS";
//   }

//   return "INFO";

// };

// const formatDate = (date) =>
//   new Date(date).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//   });

// const OrderTimeline = ({ history = [] }) => {
//   if (!history.length) return null;

//   return (
//     <section className="mt-8">
//       <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
//         Order Timeline
//       </h3>

//       <div className="rounded-2xl border border-slate-200 bg-white p-6">
//         <div className="space-y-6">
//           {history.map((item, index) => {

//               const notificationType =
//   getNotificationType(item.note);

// const notificationStatus =
//   getNotificationStatus(item.note);

//             const config =
//               statusConfig[item.status] ||
//               statusConfig.PENDING;

//             const Icon = config.icon;

//             const isLast =
//               index === history.length - 1;

//             return (
//               <div
//                 key={item.id}
//                 className="relative flex gap-4"
//               >
//                 {/* Timeline */}

//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`
//                       flex
//                       h-11
//                       w-11
//                       items-center
//                       justify-center
//                       rounded-full
//                       ${config.bg}
//                     `}
//                   >
//                     <Icon
//                       size={18}
//                       className={config.color}
//                     />
//                   </div>

//                   {!isLast && (
//                     <div className="mt-2 h-full w-px bg-slate-200" />
//                   )}
//                 </div>

//                 {/* Content */}

//                 <div className="flex-1 pb-6">
//                   <div className="flex items-center justify-between gap-4">
//                     <h4 className="font-semibold text-slate-900">
//                       {config.title}
//                     </h4>

//                     <span className="text-xs text-slate-500">
//                       {formatDate(item.createdAt)}
//                     </span>
//                   </div>

//                  {item.note && (
//   <div
//     className={`mt-2 rounded-xl border p-4 ${
//       notificationStatus === "SUCCESS"
//         ? "border-emerald-200 bg-emerald-50"
//         : notificationStatus === "FAILED"
//         ? "border-red-200 bg-red-50"
//         : "border-slate-200 bg-slate-50"
//     }`}
//   >
//     <div className="mb-3 flex items-center gap-2">

//       {notificationType === "EMAIL" && (
//         <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
//           📧 Email
//         </span>
//       )}

//       {notificationType === "WHATSAPP" && (
//         <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
//           📱 WhatsApp
//         </span>
//       )}

//       {notificationStatus === "SUCCESS" && (
//         <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
//           Success
//         </span>
//       )}

//       {notificationStatus === "FAILED" && (
//         <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
//           Failed
//         </span>
//       )}

//     </div>

//     <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
//       {item.note}
//     </p>
//   </div>
// )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OrderTimeline;