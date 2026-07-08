import api from "./axios";


export const getDashboard = async () => {
  const { data } = await api.get("/dashboard");
  return data.data;
};

export const getRevenueChart = async (range = "7d") => {
  const { data } = await api.get("/dashboard/revenue", {
    params: {
      range,
    },
  });

  return data.data;
};

// export const getDashboard = async () => {
//   const { data } = await api.get("/dashboard");

//   return data.data;
// };



// export const getRevenueChart = async (range = "30d") => {
//   const { data } = await api.get("/dashboard/revenue", {
//     params: { range },
//   });

//   return data.data;
// };

export const getDashboardSummary = async () => {
  const { data } = await api.get("/dashboard/summary");

  return data.data;
};

export const getRecentOrders = async (
  page = 1,
  limit = 5
) => {
  const { data } = await api.get("/dashboard/recent-orders", {
    params: {
      page,
      limit,
    },
  });

  return data.data;
};

export const getTopSellingProducts = async (
  limit = 5
) => {
  const { data } = await api.get("/dashboard/top-products", {
    params: { limit },
  });

  return data.data;
};

export const getInventoryOverview = async () => {
  const { data } = await api.get("/dashboard/inventory");

  return data.data;
};

export const getCustomerOverview = async () => {
  const { data } = await api.get("/dashboard/customers");

  return data.data;
};

export const getNotifications = async () => {
  const { data } = await api.get("/dashboard/notifications");

  return data.data;
};