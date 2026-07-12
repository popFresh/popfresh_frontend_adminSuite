import { useState } from "react";
import { toast } from "react-toastify";

import {
    createShipment,
} from "../../../api/logistics.api.js";

const CreateShipmentCard = ({
    order,
    refreshOrder,
    onCreateManual,
}) => {

    const [provider, setProvider] =
        useState("SHIPROCKET");

    const [loading, setLoading] =
        useState(false);

    const handleContinue = async () => {

        try {

            if (provider === "MANUAL") {

                onCreateManual();

                return;

            }

            setLoading(true);

            await createShipment(order.id);

            toast.success(
                "Shipment created successfully."
            );

            await refreshOrder();

        } catch (err) {

            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                    "Failed to create shipment."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <h3 className="text-lg font-semibold text-slate-900">
                Create Shipment
            </h3>

            <p className="mt-1 text-sm text-slate-500">
                Select how this order will be fulfilled.
            </p>

            <div className="mt-6 space-y-4">

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:bg-slate-50">

                    <input
                        type="radio"
                        value="SHIPROCKET"
                        checked={
                            provider ===
                            "SHIPROCKET"
                        }
                        onChange={(e) =>
                            setProvider(
                                e.target.value
                            )
                        }
                    />

                    <div>

                        <p className="font-medium">
                            Shiprocket
                        </p>

                        <p className="text-sm text-slate-500">
                            Generate AWB,
                            labels, manifest,
                            pickup and tracking.
                        </p>

                    </div>

                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:bg-slate-50">

                    <input
                        type="radio"
                        value="MANUAL"
                        checked={
                            provider ===
                            "MANUAL"
                        }
                        onChange={(e) =>
                            setProvider(
                                e.target.value
                            )
                        }
                    />

                    <div>

                        <p className="font-medium">
                            Manual Delivery
                        </p>

                        <p className="text-sm text-slate-500">
                            Porter, Rapido,
                            Swiggy Genie or
                            local delivery.
                        </p>

                    </div>

                </label>

            </div>

            <button
                onClick={handleContinue}
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {loading
                    ? "Please wait..."
                    : "Continue"}
            </button>

        </div>

    );

};

export default CreateShipmentCard;