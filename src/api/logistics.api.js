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
// =====================================================
// CREATE MANUAL SHIPMENT
// =====================================================

export const createManualShipment = async (
  orderId,
  shipmentData
) => {

  const { data } = await api.post(
    `/orders/${orderId}/manual-shipment`,
    shipmentData
  );

  return data;

};

// =====================================================
// MARK MANUAL SHIPMENT OUT FOR DELIVERY
// =====================================================

export const markManualShipmentOutForDelivery = async (
  orderId,
  data = {}
) => {

  const { data: response } = await api.patch(
    `/orders/${orderId}/manual-shipment/out-for-delivery`,
    data
  );

  return response;

};

// =====================================================
// MARK MANUAL SHIPMENT DELIVERED
// =====================================================

export const markManualShipmentDelivered = async (
  orderId,
  data = {}
) => {

  const { data: response } = await api.patch(
    `/orders/${orderId}/manual-shipment/delivered`,
    data
  );

  return response;

};