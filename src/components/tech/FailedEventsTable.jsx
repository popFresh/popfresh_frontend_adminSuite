import {
  AlertCircle,
  AlertTriangle,
  ShieldAlert,
  Copy,
  Database,
  CreditCard,
  Truck,
  Mail,
  MessageCircle,
  Package,
  Shield,
  Settings,
} from "lucide-react";

const levelConfig = {
  WARN: {
    icon: AlertTriangle,
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  ERROR: {
    icon: AlertCircle,
    className:
      "bg-red-100 text-red-700 border-red-200",
  },
  CRITICAL: {
    icon: ShieldAlert,
    className:
      "bg-purple-100 text-purple-700 border-purple-200",
  },
};

const categoryIcons = {
  SYSTEM: Settings,
  DATABASE: Database,
  PAYMENT: CreditCard,
  ORDER: Package,
  EMAIL: Mail,
  SHIPROCKET: Truck,
  WHATSAPP: MessageCircle,
  AUTH: Shield,
};

const categoryColors = {
  SYSTEM: "bg-gray-100 text-gray-700",
  DATABASE: "bg-indigo-100 text-indigo-700",
  PAYMENT: "bg-green-100 text-green-700",
  ORDER: "bg-blue-100 text-blue-700",
  EMAIL: "bg-pink-100 text-pink-700",
  SHIPROCKET: "bg-orange-100 text-orange-700",
  WHATSAPP: "bg-emerald-100 text-emerald-700",
  AUTH: "bg-red-100 text-red-700",
};

const FailedEventsTable = ({ failedEvents }) => {
  const copyMetadata = (metadata) => {
    navigator.clipboard.writeText(
      JSON.stringify(metadata ?? {}, null, 2)
    );
  };

  if (!failedEvents.length) {
    return (
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Failed Events
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center py-16">
          <ShieldAlert
            size={52}
            className="mb-4 text-green-500"
          />

          <h3 className="text-lg font-semibold text-gray-800">
            No Failed Events 🎉
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Your integrations and services are running
            normally.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-5">
        <div>
          <h2 className="text-lg font-semibold">
            Failed Events
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Operational failures requiring attention.
          </p>
        </div>

        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
          {failedEvents.length} Active
        </span>
      </div>

      <div className="space-y-5 p-5">
        {failedEvents.map((event) => {
          const level =
            levelConfig[event.level] ??
            levelConfig.ERROR;

          const LevelIcon = level.icon;

          const CategoryIcon =
            categoryIcons[event.category] ??
            Settings;

          return (
            <div
              key={event.id}
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
            >
              {/* Header */}

              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${level.className}`}
                    >
                      <LevelIcon size={14} />
                      {event.level}
                    </span>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                        categoryColors[
                          event.category
                        ] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <CategoryIcon size={14} />
                      {event.category}
                    </span>

                    {event.metadata?.statusCode && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        HTTP{" "}
                        {event.metadata.statusCode}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-red-600">
                    {event.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(
                      event.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Message */}

              <div className="mt-5 rounded-lg bg-red-50 p-4">
                <p className="text-sm font-semibold text-gray-700">
                  Error Message
                </p>

                <p className="mt-2 whitespace-pre-wrap break-words text-sm text-gray-600">
                  {event.message}
                </p>
              </div>

              {/* Details */}

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Request Information
                  </p>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Method:</strong>{" "}
                      {event.metadata?.method ??
                        "-"}
                    </p>

                    <p>
                      <strong>Route:</strong>{" "}
                      {event.metadata?.path ??
                        "-"}
                    </p>

                    <p>
                      <strong>Provider:</strong>{" "}
                      {event.metadata?.provider ??
                        "-"}
                    </p>

                    <p>
                      <strong>Order:</strong>{" "}
                      {event.metadata?.receipt ??
                        event.metadata?.orderId ??
                        "-"}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Response
                  </p>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Status:</strong>{" "}
                      {event.metadata
                        ?.statusCode ?? "-"}
                    </p>

                    <p>
                      <strong>Reason:</strong>{" "}
                      {event.metadata?.reason ??
                        event.metadata?.error ??
                        event.metadata
                          ?.response?.message ??
                        "-"}
                    </p>

                    <p>
                      <strong>Customer:</strong>{" "}
                      {event.metadata
                        ?.customerId ?? "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metadata */}

              {event.metadata && (
                <details className="mt-5 rounded-lg border">
                  <summary className="flex cursor-pointer items-center justify-between bg-gray-50 px-4 py-3 font-medium">
                    <span>View Metadata</span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        copyMetadata(
                          event.metadata
                        );
                      }}
                      className="flex items-center gap-2 rounded-md border px-3 py-1 text-xs hover:bg-gray-100"
                    >
                      <Copy size={14} />
                      Copy JSON
                    </button>
                  </summary>

                  <pre className="max-h-96 overflow-auto bg-gray-900 p-4 text-xs text-green-400">
                    {JSON.stringify(
                      event.metadata,
                      null,
                      2
                    )}
                  </pre>
                </details>
              )}

              {/* Stack */}

              {event.metadata?.stack && (
                <details className="mt-4 rounded-lg border">
                  <summary className="cursor-pointer bg-red-50 px-4 py-3 font-medium text-red-700">
                    View Stack Trace
                  </summary>

                  <pre className="max-h-96 overflow-auto bg-black p-4 text-xs text-green-400">
                    {event.metadata.stack}
                  </pre>
                </details>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FailedEventsTable;