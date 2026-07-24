/**
 * Returns the available fulfillment actions
 * for the current shipment state.
 */
export const getFulfillmentActions = (shipment) => {

    // =====================================================
    // No Shipment Yet
    // =====================================================

    if (!shipment) {
    return [];
}
     if (shipment.provider !== "SHIPROCKET") {


        const actions = [];

        if (shipment.status === "CREATED") {

            actions.push({
                key: "manualOutForDelivery",
                label: "Mark Out For Delivery",
                variant: "primary",
                disabled: false,
            });

        }

        if (shipment.status === "OUT_FOR_DELIVERY") {

            actions.push({
                key: "manualDelivered",
                label: "Mark Delivered",
                variant: "primary",
                disabled: false,
            });

        }

        return actions;

    }



    
    // =====================================================
    // SHIPROCKET SHIPMENT
    // =====================================================

    

    const actions = [];

    // Assign AWB

    if (!shipment.awbCode) {

        actions.push({
            key: "assignAwb",
            label: "Assign AWB",
            variant: "primary",
            disabled: false,
        });

    }

    // Documents

    if (shipment.awbCode) {

        if (!shipment.labelUrl) {

            actions.push({
                key: "generateLabel",
                label: "Generate Label",
                variant: "secondary",
                disabled: false,
            });

        }

        if (!shipment.invoiceUrl) {

            actions.push({
                key: "generateInvoice",
                label: "Generate Invoice",
                variant: "secondary",
                disabled: false,
            });

        }

        if (!shipment.manifestUrl) {

            actions.push({
                key: "generateManifest",
                label: "Generate Manifest",
                variant: "secondary",
                disabled: false,
            });

        }

        if (!shipment.pickupScheduled) {

            actions.push({
                key: "schedulePickup",
                label: "Schedule Pickup",
                variant: "primary",
                disabled: false,
            });

        }

    }

    // Tracking

    if (shipment.shiprocketShipmentId) {

        actions.push({
            key: "trackShipment",
            label: "Track Shipment",
            variant: "outline",
            disabled: false,
        });

    }

    // Cancel Shipment

    if (
        shipment.status !== "DELIVERED" &&
        shipment.status !== "CANCELLED"
    ) {

        actions.push({
            key: "cancelShipment",
            label: "Cancel Shipment",
            variant: "danger",
            disabled: false,
        });

    }

    return actions;

};




// /**
//  * Returns the available fulfillment actions
//  * for the current shipment state.
//  */
// export const getFulfillmentActions = (shipment) => {

//     // =====================================================
//     // No Shipment Yet
//     // =====================================================

//     if (!shipment) {

//         return [
//             {
//                 key: "createShipment",
//                 label: "Create Shipment",
//                 variant: "primary",
//                 disabled: false,
//             },
//         ];

//     }

//     const actions = [];

//     // =====================================================
//     // Assign AWB
//     // =====================================================

//     // If no AWB exists yet, always allow assigning one.
//     // This also covers failed AWB attempts (e.g. wallet recharge required).

//     if (!shipment.awbCode) {

//         actions.push({
//             key: "assignAwb",
//             label: "Assign AWB",
//             variant: "primary",
//             disabled: false,
//         });

//     }

//     // =====================================================
//     // Shipment Documents
//     // =====================================================

//     // Documents can only be generated after a successful AWB assignment.

//     if (shipment.awbCode) {

//         if (!shipment.labelUrl) {

//             actions.push({
//                 key: "generateLabel",
//                 label: "Generate Label",
//                 variant: "secondary",
//                 disabled: false,
//             });

//         }

//         if (!shipment.invoiceUrl) {

//             actions.push({
//                 key: "generateInvoice",
//                 label: "Generate Invoice",
//                 variant: "secondary",
//                 disabled: false,
//             });

//         }

//         if (!shipment.manifestUrl) {

//             actions.push({
//                 key: "generateManifest",
//                 label: "Generate Manifest",
//                 variant: "secondary",
//                 disabled: false,
//             });

//         }

//         // =====================================================
// // Schedule Pickup
// // Hidden because Shiprocket automatically
// // requests pickup for our account.
// // =====================================================

//         if (!shipment.pickupScheduled) {

//             actions.push({
//                 key: "schedulePickup",
//                 label: "Schedule Pickup",
//                 variant: "primary",
//                 disabled: false,
//             });

//         }

//     }

//     // =====================================================
//     // Tracking
//     // =====================================================

//     if (shipment.shiprocketShipmentId) {

//         actions.push({
//             key: "trackShipment",
//             label: "Track Shipment",
//             variant: "outline",
//             disabled: false,
//         });

//     }

//     // =====================================================
//     // Cancel Shipment
//     // =====================================================

//     if (
//         shipment.status !== "DELIVERED" &&
//         shipment.status !== "CANCELLED"
//     ) {

//         actions.push({
//             key: "cancelShipment",
//             label: "Cancel Shipment",
//             variant: "danger",
//             disabled: false,
//         });

//     }

//     return actions;

// };