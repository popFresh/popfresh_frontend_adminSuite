import { Search } from "lucide-react";

const ShipmentFilters = ({

    search,

    status,

    onSearchChange,

    onStatusChange,

}) => {

    const shipmentStatuses = [

        {
            label: "All Statuses",
            value: "",
        },

        {
            label: "Created",
            value: "CREATED",
        },

        {
            label: "AWB Assigned",
            value: "AWB_ASSIGNED",
        },

        {
            label: "Pickup Scheduled",
            value: "PICKUP_SCHEDULED",
        },

        {
            label: "In Transit",
            value: "IN_TRANSIT",
        },

        {
            label: "Out For Delivery",
            value: "OUT_FOR_DELIVERY",
        },

        {
            label: "Delivered",
            value: "DELIVERED",
        },

        {
            label: "Cancelled",
            value: "CANCELLED",
        },

    ];

    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-[#18211D]
                p-5
                shadow-sm
            "
        >

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* ===================================================== */}
                {/* Search */}
                {/* ===================================================== */}

                <div className="relative w-full lg:max-w-md">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search by Receipt, Customer, Phone or AWB..."
                        value={search}
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                        className="
                            h-11
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            dark:border-slate-700
                            bg-white
                            dark:bg-[#111916]
                            pl-11
                            pr-4
                            text-sm
                            text-slate-800
                            dark:text-white
                            placeholder:text-slate-400
                            dark:placeholder:text-slate-500
                            outline-none
                            transition-all
                            duration-200
                            focus:border-orange-400
                            focus:ring-4
                            focus:ring-orange-100
                            dark:focus:ring-orange-900/20
                        "
                    />

                </div>

                {/* ===================================================== */}
                {/* Status Filter */}
                {/* ===================================================== */}

                <div className="w-full lg:w-60">

                    <select
                        value={status}
                        onChange={(e) =>
                            onStatusChange(e.target.value)
                        }
                        className="
                            h-11
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            dark:border-slate-700
                            bg-white
                            dark:bg-[#111916]
                            px-4
                            text-sm
                            text-slate-800
                            dark:text-white
                            outline-none
                            transition-all
                            duration-200
                            focus:border-orange-400
                            focus:ring-4
                            focus:ring-orange-100
                            dark:focus:ring-orange-900/20
                        "
                    >

                        {shipmentStatuses.map((item) => (

                            <option
                                key={item.value}
                                value={item.value}
                            >

                                {item.label}

                            </option>

                        ))}

                    </select>

                </div>

            </div>

        </div>

    );

};

export default ShipmentFilters;