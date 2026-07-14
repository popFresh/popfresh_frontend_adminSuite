import { useState } from "react";
import { createManualShipment } from "../../../api/logistics.api";
import ShipmentInfo from "./ShipmentInfo";
import ShipmentActions from "./ShipmentActions";
import TrackingTimeline from "./TrackingTimeline";
import CreateShipmentCard from "./CreateShipmentCard";
import ManualShipmentModal from "./ManualShipmentModal";

const FulfillmentWorkflow = ({
    order,
    refreshOrder,
}) => {

    const [manualModalOpen, setManualModalOpen] =
        useState(false);
        const [loading, setLoading] = useState(false);


        const handleCreateManualShipment = async (form) => {
    try {
        setLoading(true);

        await createManualShipment(order.id, form);

        toast.success("Manual shipment created successfully.");

        setManualModalOpen(false);

        await refreshOrder();

    } finally {
        setLoading(false);
    }
};

    return (

        <div className="mt-6 space-y-6">

            <ShipmentInfo
                shipment={order.shipment}
            />

            {order.shipment ? (

                <ShipmentActions
                    order={order}
                    shipment={order.shipment}
                    refreshOrder={refreshOrder}
                />

            ) : (

                <CreateShipmentCard
                    order={order}
                    refreshOrder={refreshOrder}
                    onCreateManual={() =>
                        setManualModalOpen(true)
                    }
                />

            )}

            <TrackingTimeline
                history={
                    order.shipment?.trackingHistory
                }
            />


<ManualShipmentModal
    open={manualModalOpen}
    loading={loading}
    onClose={() =>
        setManualModalOpen(false)
    }
    onSubmit={handleCreateManualShipment}
/>

        </div>

    );

};

export default FulfillmentWorkflow;