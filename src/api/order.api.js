import api from "./axios";

// ==============================================
// GET ORDER DASHBOARD STATS
// ==============================================

export const getOrderStats = async () => {

  const { data } = await api.get("/orders/stats");

  return data.data;

};

// ==============================================
// GET ALL ORDERS
// ==============================================

export const getOrders = async (params = {}) => {

  const { data } = await api.get("/orders", {
    params,
  });

  return data.data;

};

// ==============================================
// GET ORDER BY ID
// ==============================================

export const getOrderById = async (id) => {

  const { data } = await api.get(`/orders/${id}`);

  return data.data;

};

// ==============================================
// UPDATE ORDER STATUS
// ==============================================

export const updateOrderStatus = async (
  id,
  payload
) => {

  const { data } = await api.patch(
    `/orders/${id}/status`,
    payload
  );

  return data.data;

};