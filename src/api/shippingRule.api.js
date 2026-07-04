import api from "./axios";

export const getShippingRule = async () => {
  const { data } = await api.get("/shipping-rules");
  return data.data;
};

export const updateShippingRule = async (payload) => {
  const { data } = await api.put(
    "/shipping-rules",
    payload
  );

  return data.data;
};