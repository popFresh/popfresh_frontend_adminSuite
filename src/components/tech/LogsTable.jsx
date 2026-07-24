import {
  Eye,
  AlertCircle,
  AlertTriangle,
  Info,
  ShieldAlert,
} from "lucide-react";

const levelStyles = {
  INFO: {
    icon: Info,
    badge:
      "bg-blue-100 text-blue-700 border-blue-200",
  },

  WARN: {
    icon: AlertTriangle,
    badge:
      "bg-yellow-100 text-yellow-700 border-yellow-200",
  },

  ERROR: {
    icon: AlertCircle,
    badge:
      "bg-red-100 text-red-700 border-red-200",
  },

  CRITICAL: {
    icon: ShieldAlert,
    badge:
      "bg-purple-100 text-purple-700 border-purple-200",
  },
};

const categoryStyles = {
  SYSTEM: "bg-gray-100 text-gray-700",
  DATABASE: "bg-indigo-100 text-indigo-700",
  PAYMENT: "bg-green-100 text-green-700",
  ORDER: "bg-blue-100 text-blue-700",
  EMAIL: "bg-pink-100 text-pink-700",
  SHIPROCKET: "bg-orange-100 text-orange-700",
  WHATSAPP: "bg-emerald-100 text-emerald-700",
  CONTACT: "bg-cyan-100 text-cyan-700",
  AUTH: "bg-red-100 text-red-700",
};

const truncate = (text = "", limit = 90) => {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit)}...`;
};

const formatTime = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getReason = (metadata) => {
  if (!metadata) return "-";

  return (
    metadata.response?.message ||
    metadata.response?.error ||
    metadata.error ||
    metadata.reason ||
    metadata.provider ||
    "-"
  );
};

const EmptyState = () => (
  <div className="py-20 text-center">
    <AlertCircle
      size={52}
      className="mx-auto mb-4 text-gray-300"
    />

    <h3 className="text-lg font-semibold text-gray-700">
      No Logs Found
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      Try changing your search or filters.
    </p>
  </div>
);

const LogsTable = ({
  logs = [],
  onView,
}) => {
  if (!logs.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Logs
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Latest application events and operational
          activities.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-6 py-4">
                Time
              </th>

              <th className="px-6 py-4">
                Level
              </th>

              <th className="px-6 py-4">
                Category
              </th>

              <th className="px-6 py-4">
                Title
              </th>

              <th className="px-6 py-4">
                Message
              </th>

              <th className="px-6 py-4">
                Reason
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {logs.map((log) => {
              const level =
                levelStyles[log.level] ??
                levelStyles.INFO;

              const LevelIcon = level.icon;

              return (
                <tr
                  key={log.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600">
                    {formatTime(
                      log.createdAt
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${level.badge}`}
                    >
                      <LevelIcon
                        size={14}
                      />

                      {log.level}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        categoryStyles[
                          log.category
                        ] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {log.category}
                    </span>
                  </td>

                  <td className="max-w-xs px-6 py-5">
                    <p className="font-medium text-gray-900">
                      {truncate(
                        log.title,
                        45
                      )}
                    </p>
                  </td>

                  <td className="max-w-sm px-6 py-5 text-sm text-gray-600">
                    {truncate(
                      log.message,
                      80
                    )}
                  </td>

                  <td className="max-w-xs px-6 py-5 text-sm text-gray-500">
                    {truncate(
                      getReason(
                        log.metadata
                      ),
                      50
                    )}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() =>
                        onView(log)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsTable;