// src/api/tech.api.js

import api from "./axios";

export const getTechOverview = async () => {
  const { data } = await api.get("/tech/overview");
  return data.data;
};

export const getTechLogs = async () => {
  const { data } = await api.get("/tech/logs");
  return data.data;
};

export const getFailedEvents = async () => {
  const { data } = await api.get("/tech/failed-events");
  return data.data;
};