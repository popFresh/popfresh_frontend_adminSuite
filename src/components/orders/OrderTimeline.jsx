import {
  Clock3,
  PackageCheck,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";

const statusConfig = {
  PENDING: {
    icon: Clock3,
    color: "text-amber-600",
    bg: "bg-amber-100",
    title: "Pending",
  },

  PROCESSING: {
    icon: PackageCheck,
    color: "text-orange-600",
    bg: "bg-orange-100",
    title: "Processing",
  },

  PACKED: {
    icon: Package,
    color: "text-violet-600",
    bg: "bg-violet-100",
    title: "Packed",
  },

  SHIPPED: {
    icon: Truck,
    color: "text-sky-600",
    bg: "bg-sky-100",
    title: "Shipped",
  },

  DELIVERED: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    title: "Delivered",
  },

  CANCELLED: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
    title: "Cancelled",
  },

  RETURNED: {
    icon: RotateCcw,
    color: "text-slate-600",
    bg: "bg-slate-200",
    title: "Returned",
  },
};

const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const OrderTimeline = ({ history = [] }) => {
  if (!history.length) return null;

  return (
    <section className="mt-8">
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
        Order Timeline
      </h3>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="space-y-6">
          {history.map((item, index) => {
            const config =
              statusConfig[item.status] ||
              statusConfig.PENDING;

            const Icon = config.icon;

            const isLast =
              index === history.length - 1;

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

                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-semibold text-slate-900">
                      {config.title}
                    </h4>

                    <span className="text-xs text-slate-500">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  {item.note && (
                    <p className="mt-2 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                      {item.note}
                    </p>
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