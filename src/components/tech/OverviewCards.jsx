import {
  Activity,
  AlertTriangle,
  ShieldAlert,
  FileText,
  Clock3,
} from "lucide-react";

const cardStyles = {
  total: {
    icon: FileText,
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
  },
  failed: {
    icon: AlertTriangle,
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
  },
  warning: {
    icon: Activity,
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
  },
  critical: {
    icon: ShieldAlert,
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200",
  },
  lastError: {
    icon: Clock3,
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
  },
};

const StatCard = ({
  title,
  value,
  subtitle,
  style,
}) => {
  const Icon = style.icon;

  return (
    <div
      className={`group rounded-2xl border ${style.border}
      bg-white p-5 shadow-sm transition-all duration-300
      hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 break-words text-3xl font-bold text-gray-900">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-xs text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`${style.bg} ${style.text}
          rounded-xl p-3 transition-transform
          group-hover:scale-110`}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

const OverviewCards = ({ overview }) => {
  if (!overview) return null;

  const stats = overview.stats || {};

  const failedEvents =
    (stats.errors || 0) + (stats.critical || 0);

  const lastError = overview.lastError
    ? new Date(
        overview.lastError.createdAt
      ).toLocaleString()
    : "No recent errors";

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Total Logs"
        value={stats.totalLogs ?? 0}
        subtitle="All recorded events"
        style={cardStyles.total}
      />

      <StatCard
        title="Failed Events"
        value={failedEvents}
        subtitle="Errors & critical failures"
        style={cardStyles.failed}
      />

      <StatCard
        title="Warnings"
        value={stats.warnings ?? 0}
        subtitle="Requires attention"
        style={cardStyles.warning}
      />

      <StatCard
        title="Critical"
        value={stats.critical ?? 0}
        subtitle="Highest severity"
        style={cardStyles.critical}
      />

      <StatCard
        title="Last Error"
        value={lastError}
        subtitle="Most recent failure"
        style={cardStyles.lastError}
      />
    </div>
  );
};

export default OverviewCards;