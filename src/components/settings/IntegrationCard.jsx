import {
  CreditCard,
  Mail,
  MessageCircle,
  Truck,
  Package,
  BarChart3,
  ShoppingCart,
  Store,
  CheckCircle2,
  XCircle,
  Settings,
} from "lucide-react";

const iconMap = {
  Razorpay: CreditCard,
  Resend: Mail,
  WhatsApp: MessageCircle,
  Shiprocket: Truck,
  Delhivery: Package,
  "Google Analytics": BarChart3,
  Amazon: ShoppingCart,
  Flipkart: Store,
};

const colorMap = {
  Razorpay: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    icon: "text-blue-600",
  },

  Resend: {
    bg: "bg-slate-100 dark:bg-slate-800",
    icon: "text-slate-700 dark:text-slate-300",
  },

  WhatsApp: {
    bg: "bg-green-100 dark:bg-green-900/30",
    icon: "text-green-600",
  },

  Shiprocket: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    icon: "text-purple-600",
  },

  Delhivery: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    icon: "text-amber-600",
  },

  "Google Analytics": {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    icon: "text-orange-600",
  },

  Amazon: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    icon: "text-yellow-700",
  },

  Flipkart: {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    icon: "text-sky-600",
  },
};

const buttonText = {
  Razorpay: "Configure API",
  Resend: "Manage Domain",
  WhatsApp: "Configure API",
  Shiprocket: "Manage Shipping",
  Delhivery: "Connect Account",
  "Google Analytics": "View Analytics",
  Amazon: "Connect Seller",
  Flipkart: "Connect Seller",
};

const IntegrationCard = ({ integration }) => {
  const Icon = iconMap[integration.name];

  const colors =
    colorMap[integration.name] || {
      bg: "bg-slate-100 dark:bg-slate-800",
      icon: "text-slate-700 dark:text-slate-300",
    };

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-[#18211D]
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              ${colors.bg}
            `}
          >
            <Icon
              size={28}
              className={colors.icon}
            />
          </div>

          <div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {integration.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {integration.description}
            </p>

          </div>

        </div>

        {integration.connected ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            <CheckCircle2 size={14} />
            Connected
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            <XCircle size={14} />
            Not Connected
          </span>
        )}

      </div>

      {/* Details */}

      <div className="mt-6 space-y-4">

        {Object.entries(integration.details).map(
          ([key, value]) => (

            <div
              key={key}
              className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800"
            >

              <span className="capitalize text-sm text-slate-500">
                {key.replace(/([A-Z])/g, " $1")}
              </span>

              <span className="max-w-[55%] truncate text-right text-sm font-medium text-slate-900 dark:text-white">
                {value}
              </span>

            </div>

          )
        )}

      </div>

      {/* Footer */}

      <div className="mt-8">

        <button
          className={`
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            py-3
            text-sm
            font-semibold
            transition-all
            duration-300

            ${
              integration.connected
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111916] dark:text-white dark:hover:bg-[#1D2A25]"
            }
          `}
        >
          <Settings size={18} />

          {buttonText[integration.name] ||
            "Configure"}

        </button>

      </div>

    </div>
  );
};

export default IntegrationCard;