import SectionCard from "../ui/SectionCard";
import {
  AlertTriangle,
  CreditCard,
  Star,
  ShoppingBag,
  Percent,
} from "lucide-react";

const notifications = [
  {
    title: "Low stock alert",
    description: "Cheese Makhana — 12 units left",
    time: "5m ago",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Failed payment",
    description: "₹899 • Order #POP-10238",
    time: "22m ago",
    icon: CreditCard,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "New review received",
    description: "Priya I. left a 5-star review",
    time: "1h ago",
    icon: Star,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Large order received",
    description: "₹12,480 • Bulk order",
    time: "2h ago",
    icon: ShoppingBag,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Coupon usage spike",
    description: "FRESH20 used 142 times",
    time: "4h ago",
    icon: Percent,
    color: "bg-indigo-100 text-indigo-600",
  },
];

export default function NotificationsPanel() {
  return (
    <SectionCard
      className="w-full h-full"
      title="Notifications"
      subtitle="Today's important updates"
    >
      <div className="space-y-5">
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                flex
                items-start
                justify-between
                gap-3
                py-1
              "
            >
              {/* Left Content */}
              <div className="flex gap-3 min-w-0 flex-1">
                <div
                  className={`
                    h-10
                    w-10
                    flex-shrink-0
                    rounded-full
                    flex
                    items-center
                    justify-center
                    ${item.color}
                  `}
                >
                  <Icon size={18} />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      font-semibold
                      text-[#032F23]
                      dark:text-white
                      truncate
                    "
                  >
                    {item.title}
                  </p>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                      line-clamp-2
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Time */}
              <span
                className="
                  flex-shrink-0
                  whitespace-nowrap
                  text-xs
                  text-slate-400
                  dark:text-slate-500
                  mt-1
                "
              >
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}