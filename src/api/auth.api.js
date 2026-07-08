// src/api/auth.api.js

import api from "./axios.js";

// ==============================================
// LOGIN
// ==============================================

export const login = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

// ==============================================
// GET CURRENT USER
// ==============================================

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

// ==============================================
// UPDATE PROFILE
// ==============================================

export const updateProfile = async (profileData) => {
  const response = await api.patch(
    "/auth/profile",
    profileData
  );

  return response.data;
};

// ==============================================
// CHANGE PASSWORD
// ==============================================

export const changePassword = async (passwordData) => {
  const response = await api.patch(
    "/auth/change-password",
    passwordData
  );

  return response.data;
};

// ==============================================
// VALIDATE INVITATION
// ==============================================

export const validateInvitation = async (token) => {
  const response = await api.get(
    `/auth/invite/${token}`
  );

  return response.data;
};

// ==============================================
// COMPLETE INVITATION
// ==============================================

export const completeInvitation = async (
  token,
  passwordData
) => {
  const response = await api.post(
    `/auth/invite/${token}`,
    passwordData
  );

  return response.data;
};

// ==============================================
// VALIDATE RESET TOKEN
// ==============================================

// export const validateResetToken = async (
//   token
// ) => {

//   const response =
//     await api.get(
//       `/auth/reset-password/${token}`
//     );

//   return response.data;

// };

// ==============================================
// RESET PASSWORD
// ==============================================

// export const resetPassword = async (
//   token,
//   passwordData
// ) => {

//   const response =
//     await api.post(
//       `/auth/reset-password/${token}`,
//       passwordData
//     );

//   return response.data;

// };

export const forgotPassword = async (email) => {
  const response = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};

export const validateResetToken = async (token) => {
  const response = await api.get(
    `/auth/reset-password/${token}`
  );

  return response.data;
};

export const resetPassword = async (
  token,
  data
) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,
    data
  );

  return response.data;
};