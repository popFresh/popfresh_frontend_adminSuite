import { useState } from "react";

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
                onClose={() =>
                    setManualModalOpen(false)
                }
                order={order}
                refreshOrder={refreshOrder}
            />

        </div>

    );

};

export default FulfillmentWorkflow;