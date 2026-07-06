import {
    MapPin,
    CalendarDays,
    Truck,
    PackageSearch,
} from "lucide-react";

import ShipmentStatusBadge from "./ShipmentStatusBadge";

const TrackingTimeline = ({ history = [] }) => {

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6">

            {/* ===================================================== */}
            {/* Header */}
            {/* ===================================================== */}

            <h3 className="mb-6 text-lg font-semibold text-slate-900">

                Tracking Timeline

            </h3>

            {/* ===================================================== */}
            {/* Empty State */}
            {/* ===================================================== */}

            {!history.length ? (

                <div className="flex flex-col items-center justify-center py-10 text-center">

                    <div className="rounded-full bg-orange-100 p-4">

                        <PackageSearch
                            size={28}
                            className="text-orange-600"
                        />

                    </div>

                    <h4 className="mt-4 text-base font-semibold text-slate-900">

                        Tracking hasn't started yet

                    </h4>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">

                        Tracking updates will automatically appear here once
                        the courier starts scanning the shipment.

                    </p>

                </div>

            ) : (

                <div className="space-y-8">

                    {history.map((event, index) => (

                        <div
                            key={event.id ?? index}
                            className="relative flex gap-4"
                        >

                            {/* ===================================================== */}
                            {/* Timeline */}
                            {/* ===================================================== */}

                            <div className="flex flex-col items-center">

                                <div className="rounded-full bg-orange-500 p-2 shadow">

                                    <Truck
                                        size={14}
                                        className="text-white"
                                    />

                                </div>

                                {index !== history.length - 1 && (

                                    <div className="mt-2 h-full w-[2px] bg-slate-200" />

                                )}

                            </div>

                            {/* ===================================================== */}
                            {/* Content */}
                            {/* ===================================================== */}

                            <div className="flex-1 pb-8">

                                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                                    <ShipmentStatusBadge
                                        status={event.status}
                                    />

                                    <div className="flex items-center gap-2 text-sm text-slate-500">

                                        <CalendarDays size={15} />

                                        {new Date(
                                            event.eventTime
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

                                    </div>

                                </div>

                                {event.location && (

                                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">

                                        <MapPin size={15} />

                                        {event.location}

                                    </div>

                                )}

                                {event.remarks && (

                                    <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">

                                        {event.remarks}

                                    </p>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};

export default TrackingTimeline;