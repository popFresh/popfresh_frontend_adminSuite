import api from "./axios";

// ==============================================
// GET CUSTOMER DASHBOARD STATS
// ==============================================

export const getCustomerStats = async () => {

  const { data } = await api.get("/customers/stats");

  return data.data;

};

// ==============================================
// GET ALL CUSTOMERS
// ==============================================

export const getCustomers = async (params = {}) => {

  const { data } = await api.get("/customers", {
    params,
  });

  return data.data;

};

// ==============================================
// GET CUSTOMER BY ID
// ==============================================

export const getCustomerById = async (id) => {

  const { data } = await api.get(`/customers/${id}`);

  return data.data;

};

// ==============================================
// EXPORT CUSTOMERS
// ==============================================

export const exportCustomers = async () => {

  const { data } = await api.get("/customers/export");

  return data.data;

};