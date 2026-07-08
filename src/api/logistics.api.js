import api from "./axios";

// =====================================================
// CREATE SHIPMENT
// =====================================================

export const createShipment = async (orderId) => {

    const { data } = await api.post(
        `/orders/${orderId}/create-shipment`
    );

    return data;

};

// =====================================================
// GET SERVICEABILITY
// =====================================================

export const getServiceability = async (orderId) => {

    const { data } = await api.get(
        `/orders/${orderId}/serviceability`
    );

    return data;

};

// =====================================================
// ASSIGN AWB
// =====================================================

export const assignAwb = async (
    orderId,
    courierCompanyId
) => {

    const { data } = await api.post(
        `/orders/${orderId}/assign-awb`,
        {
            courierCompanyId,
        }
    );

    return data;

};

// =====================================================
// GENERATE LABEL
// =====================================================

export const generateLabel = async (orderId) => {

    const { data } = await api.post(
        `/orders/${orderId}/generate-label`
    );

    return data;

};

// =====================================================
// GENERATE INVOICE
// =====================================================

export const generateInvoice = async (orderId) => {

    const { data } = await api.post(
        `/orders/${orderId}/generate-invoice`
    );

    return data;

};

// =====================================================
// GENERATE MANIFEST
// =====================================================

export const generateManifest = async (orderId) => {

    const { data } = await api.post(
        `/orders/${orderId}/generate-manifest`
    );

    return data;

};

// =====================================================
// SCHEDULE PICKUP
// =====================================================

export const schedulePickup = async (orderId) => {

    const { data } = await api.post(
        `/orders/${orderId}/schedule-pickup`
    );

    return data;

};

// =====================================================
// GET TRACKING
// =====================================================

export const getTracking = async (orderId) => {

    const { data } = await api.get(
        `/orders/${orderId}/tracking`
    );

    return data;

};

// =====================================================
// CANCEL SHIPMENT
// =====================================================

export const cancelShipment = async (orderId) => {

    const { data } = await api.post(
        `/orders/${orderId}/cancel-shipment`
    );

    return data;

};