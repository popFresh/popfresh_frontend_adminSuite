import { Copy, X } from "lucide-react";

const levelStyles = {
  INFO: "bg-blue-100 text-blue-700 border-blue-200",
  WARN: "bg-yellow-100 text-yellow-700 border-yellow-200",
  ERROR: "bg-red-100 text-red-700 border-red-200",
  CRITICAL:
    "bg-purple-100 text-purple-700 border-purple-200",
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

const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-gray-100 py-3 last:border-b-0">
    <p className="text-sm font-medium text-gray-500">
      {label}
    </p>

    <p className="break-all text-sm text-gray-900">
      {value || "-"}
    </p>
  </div>
);

const LogDetailsDrawer = ({
  open,
  onClose,
  log,
}) => {
  if (!open || !log) return null;

  const copyMetadata = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(
          log.metadata ?? {},
          null,
          2
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold">
              Log Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Complete event information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="max-h-[calc(90vh-90px)] overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Summary */}

            <div className="rounded-xl border bg-gray-50 p-5">
              <div className="mb-4 flex flex-wrap gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    levelStyles[
                      log.level
                    ] ??
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {log.level}
                </span>

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
              </div>

              <h3 className="text-xl font-semibold text-gray-900">
                {log.title}
              </h3>

              <p className="mt-3 whitespace-pre-wrap text-gray-600">
                {log.message}
              </p>
            </div>

            {/* Details */}

            <div className="rounded-xl border bg-white p-5">
              <h3 className="mb-5 text-lg font-semibold">
                Event Details
              </h3>

              <DetailRow
                label="ID"
                value={log.id}
              />

              <DetailRow
                label="Level"
                value={log.level}
              />

              <DetailRow
                label="Category"
                value={log.category}
              />

              <DetailRow
                label="Title"
                value={log.title}
              />

              <DetailRow
                label="Message"
                value={log.message}
              />

              <DetailRow
                label="Created At"
                value={new Date(
                  log.createdAt
                ).toLocaleString()}
              />

              <DetailRow
                label="Provider"
                value={
                  log.metadata?.provider
                }
              />

              <DetailRow
                label="Status Code"
                value={
                  log.metadata?.statusCode
                }
              />

              <DetailRow
                label="Method"
                value={
                  log.metadata?.method
                }
              />

              <DetailRow
                label="Path"
                value={
                  log.metadata?.path
                }
              />

              <DetailRow
                label="Order ID"
                value={
                  log.metadata?.orderId ||
                  log.metadata?.receipt
                }
              />

              <DetailRow
                label="Customer"
                value={
                  log.metadata?.customerId
                }
              />
            </div>

            {/* Metadata */}

            <div className="rounded-xl border bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Metadata
                </h3>

                <button
                  onClick={copyMetadata}
                  className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100"
                >
                  <Copy size={16} />
                  Copy JSON
                </button>
              </div>

              <pre className="max-h-96 overflow-auto rounded-xl bg-gray-900 p-4 text-sm text-green-400">
                {JSON.stringify(
                  log.metadata ?? {},
                  null,
                  2
                )}
              </pre>
            </div>

            {/* Stack Trace */}

            {log.metadata?.stack && (
              <div className="rounded-xl border border-red-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-red-600">
                  Stack Trace
                </h3>

                <pre className="max-h-96 overflow-auto rounded-xl bg-black p-4 text-xs text-green-400">
                  {log.metadata.stack}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogDetailsDrawer;