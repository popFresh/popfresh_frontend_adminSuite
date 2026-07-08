import { useEffect, useState } from "react";

import {
    X,
    Truck,
    Star,
    Clock3,
    IndianRupee,
    CheckCircle2,
} from "lucide-react";

const CourierSelectorModal = ({
    open,
    couriers = [],
    recommendedCourier,
    loading = false,
    onClose,
    onSelect,
}) => {

    const [selectedCourier, setSelectedCourier] =
        useState(null);

    useEffect(() => {

        if (!open) return;

        if (recommendedCourier) {

            setSelectedCourier(
                recommendedCourier.id
            );

        } else if (couriers.length) {

            setSelectedCourier(
                couriers[0].id
            );

        }

    }, [
        open,
        couriers,
        recommendedCourier,
    ]);

    if (!open) return null;

    return (
        <>
            {/* Backdrop */}

            <div
                className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}

            <div className="fixed left-1/2 top-1/2 z-[101] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                    <div>

                        <h2 className="text-xl font-bold text-slate-900">
                            Select Courier Partner
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Choose the courier for this shipment.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Courier List */}

                <div className="max-h-[450px] space-y-4 overflow-y-auto p-6">

                    {couriers.map((courier) => (

                        <div
                            key={courier.id}
                            onClick={() =>
                                setSelectedCourier(
                                    courier.id
                                )
                            }
                            className={`cursor-pointer rounded-2xl border p-5 transition

${
selectedCourier === courier.id
? "border-orange-500 bg-orange-50"
: "border-slate-200 hover:border-orange-300"
}`}
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <div className="flex items-center gap-2">

                                        <Truck
                                            size={18}
                                            className="text-orange-500"
                                        />

                                        <h3 className="font-semibold text-slate-900">

                                            {courier.name}

                                        </h3>

                                        {courier.recommended && (

                                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">

                                                Recommended

                                            </span>

                                        )}

                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm">

                                        <div className="flex items-center gap-2">

                                            <IndianRupee
                                                size={15}
                                            />

                                            ₹
                                            {courier.rate}

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <Clock3
                                                size={15}
                                            />

                                            {
                                                courier.estimatedDays
                                            }

                                            {" "}
                                            Days

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <Star
                                                size={15}
                                            />

                                            {
                                                courier.rating
                                            }

                                        </div>

                                    </div>

                                    <div className="mt-3 flex gap-3 text-xs text-slate-500">

                                        <span>

                                            ETA:{" "}

                                            {
                                                courier.eta
                                            }

                                        </span>

                                        <span>

                                            {

                                                courier.isSurface
                                                    ? "Surface"
                                                    : "Air"

                                            }

                                        </span>

                                    </div>

                                </div>

                                {selectedCourier ===
                                    courier.id && (

                                    <CheckCircle2
                                        size={24}
                                        className="text-orange-500"
                                    />

                                )}

                            </div>

                        </div>

                    ))}

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={
                            !selectedCourier ||
                            loading
                        }
                        onClick={() =>
                            onSelect(
                                selectedCourier
                            )
                        }
                        className="rounded-xl bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Assigning..."
                            : "Assign AWB"}
                    </button>

                </div>

            </div>
        </>
    );

};

export default CourierSelectorModal;