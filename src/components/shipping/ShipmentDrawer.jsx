import { X } from "lucide-react";

import ShipmentDetails from "./ShipmentDetails";
import TrackingTimeline from "./TrackingTimeline";
import ShipmentActions from "../orders/fulfillment/ShipmentActions";

const ShipmentDrawer = ({

    open,

    shipment,

    onClose,

    onAction,

}) => {

    if (!open || !shipment) return null;

    return (

        <>
            {/* ===================================================== */}
            {/* Backdrop */}
            {/* ===================================================== */}

            <div
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* ===================================================== */}
            {/* Drawer */}
            {/* ===================================================== */}

            <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-2xl flex-col bg-slate-50 shadow-2xl">

                {/* ===================================================== */}
                {/* Header */}
                {/* ===================================================== */}

                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

                    <div>

                        <h2 className="text-xl font-bold text-slate-900">

                            Shipment Details

                        </h2>

                        <p className="mt-1 text-sm text-slate-500">

                            {shipment.order?.receipt}

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 transition hover:bg-slate-100"
                    >

                        <X
                            size={22}
                            className="text-slate-700"
                        />

                    </button>

                </div>

                {/* ===================================================== */}
                {/* Body */}
                {/* ===================================================== */}

                <div className="flex-1 space-y-6 overflow-y-auto p-6">

                    <ShipmentDetails
                        shipment={shipment}
                    />

                    <TrackingTimeline
                        history={
                            shipment.trackingHistory || []
                        }
                    />

                    <ShipmentActions
                        shipment={shipment}
                        onAction={onAction}
                    />

                </div>

            </div>
        </>

    );

};

export default ShipmentDrawer;