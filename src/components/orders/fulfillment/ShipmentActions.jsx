import { useState } from "react";
import { toast } from "react-toastify";

import {
    createShipment,
    getServiceability,
    assignAwb,
    generateLabel,
    generateInvoice,
    generateManifest,
    schedulePickup,
    getTracking,
    cancelShipment,


    markManualShipmentDelivered,
    markManualShipmentOutForDelivery,
} from "../../../api/logistics.api.js";

import { getFulfillmentActions } from "../../../utils/fulfillmentActions";

import CourierSelectorModal from "./CourierSelectorModal";

const ShipmentActions = ({
    order,
    shipment,
    refreshOrder,
}) => {

    const [loading, setLoading] = useState("");

    const [modalOpen, setModalOpen] =
        useState(false);

    const [couriers, setCouriers] =
        useState([]);

    const [recommendedCourier, setRecommendedCourier] =
        useState(null);

    const actions =
        getFulfillmentActions(shipment);

        
    // =====================================================
    // Assign AWB
    // =====================================================

    const handleAssignAwb = async (
        courierCompanyId
    ) => {

        try {

            setLoading("assignAwb");

            await assignAwb(
                order.id,
                courierCompanyId
            );

            toast.success(
                "AWB assigned successfully."
            );

            setModalOpen(false);

setCouriers([]);

setRecommendedCourier(null);

await refreshOrder();

        } catch (err) {

            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                    "Failed to assign AWB."
            );

        } finally {

            setLoading("");

        }

    };

    // =====================================================
    // Action Handler
    // =====================================================

    const handleAction = async (key) => {

        try {

            setLoading(key);

            switch (key) {

                case "manualOutForDelivery":

    await markManualShipmentOutForDelivery(
        order.id
    );

    toast.success(
        "Marked Out For Delivery."
    );

    break;

case "manualDelivered":

    await markManualShipmentDelivered(
        order.id
    );

    toast.success(
        "Order delivered successfully."
    );

    break;

                case "createShipment":

                    await createShipment(order.id);

                    toast.success(
                        "Shipment created successfully."
                    );

                    break;

                case "assignAwb": {

    const response =
        await getServiceability(order.id);

    setCouriers(response.data.couriers);

    setRecommendedCourier(
        response.data.recommendedCourier
    );

    setLoading("");

    setModalOpen(true);

    return;
}

                case "generateLabel":

                    await generateLabel(order.id);

                    toast.success(
                        "Label generated successfully."
                    );

                    break;

                case "generateInvoice":

                    await generateInvoice(order.id);

                    toast.success(
                        "Invoice generated successfully."
                    );

                    break;

                case "generateManifest":

                    await generateManifest(
                        order.id
                    );

                    toast.success(
                        "Manifest generated successfully."
                    );

                    break;

                case "schedulePickup":

                    await schedulePickup(
                        order.id
                    );

                    toast.success(
                        "Pickup scheduled successfully."
                    );

                    break;

                case "trackShipment":

    await getTracking(order.id);

    // Refresh drawer to display latest tracking history
    toast.success("Tracking updated.");

    break;

                    

                case "cancelShipment":

                    if (
                        !window.confirm(
                            "Are you sure you want to cancel this shipment?"
                        )
                    ) {
                        return;
                    }

                    await cancelShipment(
                        order.id
                    );

                    toast.success(
                        "Shipment cancelled."
                    );

                    break;

                default:
                    break;
            }

            await refreshOrder();

        } catch (err) {

            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                    "Something went wrong."
            );

        } finally {

            if (key !== "assignAwb") {
                setLoading("");
            }

        }

    };

    return (
        <>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

                <h3 className="mb-5 text-lg font-semibold text-slate-900">
                    Fulfillment Actions
                </h3>

                <div className="grid gap-3">

                    {actions.map((action) => (

                        <button
                            key={action.key}
                            onClick={() =>
                                handleAction(
                                    action.key
                                )
                            }
                            disabled={
                                loading ===
                                action.key
                            }
                            className={`rounded-xl px-4 py-3 text-sm font-semibold transition

${
action.variant ===
"primary"
? "bg-orange-500 text-white hover:bg-orange-600"
: action.variant ===
"danger"
? "bg-red-600 text-white hover:bg-red-700"
: action.variant ===
"outline"
? "border border-slate-300 bg-white hover:bg-slate-100"
: "bg-slate-100 hover:bg-slate-200"
}

${
loading === action.key
? "cursor-not-allowed opacity-70"
: ""
}
`}
                        >
                            {loading ===
                            action.key
                                ? "Please wait..."
                                : action.label}
                        </button>

                    ))}

                </div>

            </div>

            <CourierSelectorModal
                open={modalOpen}
                couriers={couriers}
                recommendedCourier={
                    recommendedCourier
                }
                loading={
                    loading === "assignAwb"
                }
                onClose={() => {

                    setModalOpen(false);

                    setLoading("");

                }}
                onSelect={handleAssignAwb}
            />
        </>
    );
};

export default ShipmentActions;