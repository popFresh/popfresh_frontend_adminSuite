import {
    Package,
    Truck,
    Hash,
    CalendarDays,
    CircleCheck,
    Receipt,
} from "lucide-react";

import ShipmentStatusBadge from "./ShipmentStatusBadge";
import OrderStatusBadge from "./ShipmentStatusBadge";

const ShipmentDetails = ({ shipment }) => {

    if (!shipment) return null;

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6">

            {/* ===================================================== */}
            {/* Header */}
            {/* ===================================================== */}

            <h3 className="mb-6 text-lg font-semibold text-slate-900">

                Shipment Details

            </h3>

            <div className="grid gap-5 sm:grid-cols-2">

                {/* Receipt */}

                <div className="flex items-start gap-3">

                    <Receipt
                        size={18}
                        className="mt-1 text-orange-500"
                    />

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            Receipt

                        </p>

                        <p className="mt-1 font-semibold text-slate-900">

                            {shipment.order?.receipt}

                        </p>

                    </div>

                </div>

                {/* Courier */}

                <div className="flex items-start gap-3">

                    <Truck
                        size={18}
                        className="mt-1 text-orange-500"
                    />

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            Courier

                        </p>

                        <p className="mt-1 font-semibold text-slate-900">

                            {shipment.courierName || "--"}

                        </p>

                    </div>

                </div>

                {/* AWB */}

                <div className="flex items-start gap-3">

                    <Hash
                        size={18}
                        className="mt-1 text-orange-500"
                    />

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            AWB Number

                        </p>

                        <p className="mt-1 break-all font-semibold text-slate-900">

                            {shipment.awbCode || "--"}

                        </p>

                    </div>

                </div>

                {/* Pickup */}

                <div className="flex items-start gap-3">

                    <CircleCheck
                        size={18}
                        className="mt-1 text-orange-500"
                    />

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            Pickup

                        </p>

                        <p className="mt-1 font-semibold text-slate-900">

                            {shipment.pickupScheduled
                                ? "Scheduled"
                                : "Pending"}

                        </p>

                    </div>

                </div>

                {/* Shipment Status */}

                <div>

                    <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">

                        Shipment Status

                    </p>

                    <ShipmentStatusBadge
                        status={shipment.status}
                    />

                </div>

                {/* Order Status */}

                <div>

                    <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">

                        Order Status

                    </p>

                    <OrderStatusBadge
                        status={shipment.order?.status}
                    />

                </div>

                {/* Created */}

                <div className="flex items-start gap-3 sm:col-span-2">

                    <CalendarDays
                        size={18}
                        className="mt-1 text-orange-500"
                    />

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            Shipment Created

                        </p>

                        <p className="mt-1 font-semibold text-slate-900">

                            {new Date(
                                shipment.createdAt
                            ).toLocaleString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                }
                            )}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ShipmentDetails;