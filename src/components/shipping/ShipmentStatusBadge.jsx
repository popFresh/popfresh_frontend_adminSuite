const ShipmentStatusBadge = ({ status }) => {

    const statusConfig = {

        CREATED: {
            label: "Created",
            classes:
                "bg-slate-100 text-slate-700 border border-slate-200",
        },

        AWB_ASSIGNED: {
            label: "AWB Assigned",
            classes:
                "bg-blue-100 text-blue-700 border border-blue-200",
        },

        PICKUP_SCHEDULED: {
            label: "Pickup Scheduled",
            classes:
                "bg-amber-100 text-amber-700 border border-amber-200",
        },

        PICKED_UP: {
            label: "Picked Up",
            classes:
                "bg-cyan-100 text-cyan-700 border border-cyan-200",
        },

        IN_TRANSIT: {
            label: "In Transit",
            classes:
                "bg-indigo-100 text-indigo-700 border border-indigo-200",
        },

        OUT_FOR_DELIVERY: {
            label: "Out For Delivery",
            classes:
                "bg-purple-100 text-purple-700 border border-purple-200",
        },

        DELIVERED: {
            label: "Delivered",
            classes:
                "bg-green-100 text-green-700 border border-green-200",
        },

        CANCELLED: {
            label: "Cancelled",
            classes:
                "bg-red-100 text-red-700 border border-red-200",
        },

        RTO: {
            label: "RTO",
            classes:
                "bg-rose-100 text-rose-700 border border-rose-200",
        },

    };

    const current =
        statusConfig[status] ?? {

            label: status ?? "--",

            classes:
                "bg-slate-100 text-slate-700 border border-slate-200",

        };

    return (

        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${current.classes}`}
        >

            {current.label}

        </span>

    );

};

export default ShipmentStatusBadge;