import {
    Truck,
    Package,
    ExternalLink,
    CheckCircle2,
    XCircle,
    FileText,
    Receipt,
    Files,
    Download,
} from "lucide-react";

const ShipmentInfo = ({ shipment }) => {

    if (!shipment) {

        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <Package
                    size={42}
                    className="mx-auto mb-3 text-slate-400"
                />

                <h3 className="text-lg font-semibold text-slate-700">
                    Shipment Not Created
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    Create a shipment to begin the fulfillment process.
                </p>
            </div>
        );

    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-orange-100 p-3">

                    <Truck
                        size={22}
                        className="text-orange-600"
                    />

                </div>

                <div>

                    <h3 className="text-lg font-semibold text-slate-900">
                        Shipment Information
                    </h3>

                    <p className="text-sm text-slate-500">
                        Shiprocket Shipment Details
                    </p>

                </div>

            </div>

            <div className="space-y-5">

                {/* Shipment Status */}

                <InfoRow
                    label="Shipment Status"
                    value={shipment.status}
                />

                {/* Courier */}

                <InfoRow
                    label="Courier"
                    value={
                        shipment.courierName ||
                        "Not Assigned"
                    }
                />

                {/* AWB */}

                <InfoRow
                    label="AWB Number"
                    value={
                        shipment.awbCode ||
                        "Not Generated"
                    }
                />

                {/* Pickup */}

                <InfoRow
                    label="Pickup"
                    value={
                        shipment.pickupScheduled
                            ? "Scheduled"
                            : "Pending"
                    }
                />

                {/* Pickup Date */}

                <InfoRow
                    label="Pickup Date"
                    value={
                        shipment.pickupDate
                            ? new Date(
                                  shipment.pickupDate
                              ).toLocaleString("en-IN")
                            : "-"
                    }
                />

                {/* Tracking */}

                <div className="flex items-center justify-between">

                    <span className="text-sm text-slate-500">
                        Tracking
                    </span>

                    {shipment.trackingUrl ? (

                        <a
                            href={shipment.trackingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:underline"
                        >
                            Open
                            <ExternalLink size={15} />
                        </a>

                    ) : (

                        <span className="text-sm text-slate-400">
                            Not Available
                        </span>

                    )}

                </div>

                {/* Documents */}

                <div className="border-t border-slate-200 pt-5">

                    <h4 className="mb-4 font-medium text-slate-800">
                        Documents
                    </h4>

                    <div className="space-y-3">
                        <DocumentRow
    title="Shipping Label"
    url={shipment.labelUrl}
/>

<DocumentRow
    title="Invoice"
    url={shipment.invoiceUrl}
/>

<DocumentRow
    title="Manifest"
    url={shipment.manifestUrl}
/>

                    </div>

                </div>

            </div>

        </div>
    );

};

const InfoRow = ({ label, value }) => (

    <div className="flex items-center justify-between">

        <span className="text-sm text-slate-500">
            {label}
        </span>

        <span className="font-medium text-slate-900">
            {value}
        </span>

    </div>

);

const DocumentRow = ({
    title,
    url,
}) => {

    const getIcon = () => {

        switch (title) {

            case "Shipping Label":
                return (
                    <FileText
                        size={22}
                        className="text-orange-500"
                    />
                );

            case "Invoice":
                return (
                    <Receipt
                        size={22}
                        className="text-emerald-500"
                    />
                );

            default:
                return (
                    <Files
                        size={22}
                        className="text-blue-500"
                    />
                );
        }

    };

    return (

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-orange-300 hover:bg-orange-50">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-white p-2 shadow-sm">
                        {getIcon()}
                    </div>

                    <div>

                        <h5 className="font-medium text-slate-800">
                            {title}
                        </h5>

                        {url ? (

                            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">

                                <CheckCircle2 size={13} />

                                Generated

                            </span>

                        ) : (

                            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">

                                <XCircle size={13} />

                                Not Generated

                            </span>

                        )}

                    </div>

                </div>

                {url && (

                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                    >

                        <Download size={16} />

                        Download

                    </a>

                )}

            </div>

        </div>

    );

};

export default ShipmentInfo;