import ShipmentInfo from "./ShipmentInfo";
import ShipmentActions from "./ShipmentActions";
import TrackingTimeline from "./TrackingTimeline";

const FulfillmentWorkflow = ({
    order,
    refreshOrder,
}) => {

    return (

        <div className="mt-6 space-y-6">

            <ShipmentInfo
                shipment={order.shipment}
            />

            <ShipmentActions
                order={order}
                shipment={order.shipment}
                refreshOrder={refreshOrder}
            />

            <TrackingTimeline
                history={
                    order.shipment?.trackingHistory
                }
            />

        </div>

    );

};

export default FulfillmentWorkflow;