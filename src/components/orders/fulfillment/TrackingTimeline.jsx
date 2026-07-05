import {
    MapPin,
    CalendarDays,
    Truck,
} from "lucide-react";

const TrackingTimeline = ({ history = [] }) => {

    if (!history.length) {

        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                    Tracking Timeline
                </h3>

                <p className="text-sm text-slate-500">
                    No tracking updates available yet.
                </p>

            </div>
        );

    }

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <h3 className="mb-6 text-lg font-semibold text-slate-900">
                Tracking Timeline
            </h3>

            <div className="space-y-6">

                {history.map((event, index) => (

                    <div
                        key={event.id ?? index}
                        className="relative flex gap-4"
                    >

                        {/* Timeline */}

                        <div className="flex flex-col items-center">

                            <div className="rounded-full bg-orange-500 p-2">

                                <Truck
                                    size={14}
                                    className="text-white"
                                />

                            </div>

                            {index !== history.length - 1 && (

                                <div className="mt-2 h-full w-[2px] bg-slate-200" />

                            )}

                        </div>

                        {/* Content */}

                        <div className="flex-1 pb-6">

                            <div className="flex items-center justify-between">

                                <h4 className="font-semibold text-slate-900">

                                    {event.status}

                                </h4>

                                <div className="flex items-center gap-2 text-sm text-slate-500">

                                    <CalendarDays size={14} />

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

                                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">

                                    <MapPin size={15} />

                                    {event.location}

                                </div>

                            )}

                            {event.remarks && (

                                <p className="mt-2 text-sm leading-6 text-slate-600">

                                    {event.remarks}

                                </p>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default TrackingTimeline;