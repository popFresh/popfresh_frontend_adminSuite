import {
    Package,
    ClipboardCheck,
    Truck,
    MapPinned,
    CheckCircle2,
    XCircle,
    Boxes,
} from "lucide-react";

const ShippingStats = ({ stats = {} }) => {

    const cards = [

        {
            title: "Total Shipments",
            value: stats.total ?? 0,
            icon: Package,
            iconBg: "bg-slate-100 dark:bg-orange-900/20",
            iconColor: "text-slate-700 dark:text-orange-300",
        },

        {
            title: "AWB Assigned",
            value: stats.awbAssigned ?? 0,
            icon: ClipboardCheck,
            iconBg: "bg-blue-100 dark:bg-blue-900/20",
            iconColor: "text-blue-600 dark:text-blue-300",
        },

        {
            title: "Pickup Scheduled",
            value: stats.pickupScheduled ?? 0,
            icon: Boxes,
            iconBg: "bg-amber-100 dark:bg-amber-900/20",
            iconColor: "text-amber-600 dark:text-amber-300",
        },

        {
            title: "In Transit",
            value: stats.inTransit ?? 0,
            icon: Truck,
            iconBg: "bg-indigo-100 dark:bg-indigo-900/20",
            iconColor: "text-indigo-600 dark:text-indigo-300",
        },

        {
            title: "Out For Delivery",
            value: stats.outForDelivery ?? 0,
            icon: MapPinned,
            iconBg: "bg-purple-100 dark:bg-purple-900/20",
            iconColor: "text-purple-600 dark:text-purple-300",
        },

        {
            title: "Delivered",
            value: stats.delivered ?? 0,
            icon: CheckCircle2,
            iconBg: "bg-green-100 dark:bg-green-900/20",
            iconColor: "text-green-600 dark:text-green-300",
        },

        {
            title: "Cancelled",
            value: stats.cancelled ?? 0,
            icon: XCircle,
            iconBg: "bg-red-100 dark:bg-red-900/20",
            iconColor: "text-red-600 dark:text-red-300",
        },

    ];

    return (

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="
                            rounded-3xl
                            border
                            border-slate-200
                            dark:border-slate-800
                            bg-white
                            dark:bg-[#18211D]
                            p-5
                            shadow-sm
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-md
                            dark:hover:bg-[#1B2521]
                        "
                    >

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">

                                    {card.title}

                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">

                                    {card.value}

                                </h2>

                            </div>

                            <div
                                className={`rounded-2xl p-3 ${card.iconBg}`}
                            >

                                <Icon
                                    size={22}
                                    className={card.iconColor}
                                />

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

};

export default ShippingStats;