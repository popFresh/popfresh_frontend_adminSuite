import api from "./axios";

// ==============================================
// GET TEAM DASHBOARD
// ==============================================

export const getTeam = async () => {
  const response = await api.get("/team");

  return response.data;
};

// ==============================================
// INVITE MEMBER
// ==============================================

export const inviteMember = async (memberData) => {
  const response = await api.post(
    "/team/invite",
    memberData
  );

  return response.data;
};

// ==============================================
// DELETE INVITATION
// ==============================================

export const deleteInvitation = async (
  invitationId
) => {
  const response = await api.delete(
    `/team/invite/${invitationId}`
  );

  return response.data;
};
// ==============================================
// RESEND INVITATION
// ==============================================

export const resendInvitation = async (
  invitationId
) => {
  const response = await api.post(
    `/team/invite/${invitationId}/resend`
  );

  return response.data;
};

// ==============================================
// REMOVE TEAM MEMBER
// ==============================================

export const removeMember = async (
  memberId
) => {
  const response = await api.delete(
    `/team/${memberId}`
  );

  return response.data;
};