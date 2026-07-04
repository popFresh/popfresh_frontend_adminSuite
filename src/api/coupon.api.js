import api from "./axios";

export const getCoupons = async () => {
  const { data } = await api.get("/coupons");
  return data.data;
};

export const createCoupon = async (payload) => {
  const { data } = await api.post("/coupons", payload);
  return data.data;
};

export const updateCoupon = async (id, payload) => {
  const { data } = await api.put(`/coupons/${id}`, payload);
  return data.data;
};

export const deleteCoupon = async (id) => {
  const { data } = await api.delete(`/coupons/${id}`);
  return data.data;
};