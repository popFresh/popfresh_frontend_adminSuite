import api from "./axios";

export const getInventory = async () => {
  const { data } = await api.get("/products");
  return data.data.products;
};

export const updateInventory = async (
  id,
  stock
) => {
  const { data } = await api.patch(
    `/products/${id}/stock`,
    {
      stock,
    }
  );

  return data.data;
};