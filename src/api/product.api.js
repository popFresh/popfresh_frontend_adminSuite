import api from "./axios";

// ==============================================
// GET ALL PRODUCTS
// ==============================================

export const getProducts = async (params = {}) => {
  const { data } = await api.get("/products", {
    params,
  });

  return data.data;
};

// ==============================================
// GET PRODUCT
// ==============================================

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);

  return data.data;
};

// ==============================================
// CREATE PRODUCT
// ==============================================

export const createProduct = async (payload) => {
  const { data } = await api.post(
    "/products",
    payload
  );

  return data.data;
};

// ==============================================
// UPDATE PRODUCT
// ==============================================

export const updateProduct = async (
  id,
  payload
) => {
  const { data } = await api.patch(
    `/products/${id}`,
    payload
  );

  return data.data;
};

// ==============================================
// DELETE PRODUCT
// ==============================================

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

// ==============================================
// UPLOAD PRODUCT IMAGES
// ==============================================

export const uploadImages = async (
  productId,
  images
) => {

  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image);
  });

  const { data } = await api.post(
    `/products/${productId}/images`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data.data;
};

// ==============================================
// TOGGLE FEATURED
// ==============================================

export const toggleFeatured = async (
  id,
  isFeatured
) => {

  const { data } = await api.patch(
    `/products/${id}/featured`,
    {
      isFeatured,
    }
  );

  return data.data;
};

// ==============================================
// TOGGLE STATUS
// ==============================================

export const toggleStatus = async (
  id,
  isActive
) => {

  const { data } = await api.patch(
    `/products/${id}/status`,
    {
      isActive,
    }
  );

  return data.data;
};

// ==============================================
// UPDATE STOCK
// ==============================================

export const updateStock = async (
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