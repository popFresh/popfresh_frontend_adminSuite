import api from "./axios.js";

export const search = async (query) => {
  try {
    const response = await api.get("/search", {
      params: {
        q: query,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Failed to search:", error);
    throw error;
  }
};