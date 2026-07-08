// src/api/notification.api.js

import api from "./axios";

export const getNotifications = async () => {
  try {
    const response = await api.get("/notifications");

    return response.data.data;
  } catch (error) {
    console.error(
      "Failed to fetch notifications:",
      error
    );

    throw error;
  }
};

export const markAllNotificationsRead = async () => {
  const response = await api.patch(
    "/notifications/read-all"
  );

  return response.data;
};

export const markNotificationRead = async (id) => {
  const response = await api.patch(
    `/notifications/${id}/read`
  );

  return response.data;
};