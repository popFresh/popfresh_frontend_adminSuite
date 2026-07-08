import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  Users,
  ShieldCheck,
  UserPlus,
  UserCog,
} from "lucide-react";

import TeamHero from "../components/team/TeamHero";
import TeamCard from "../components/team/TeamCard";
import InvitationCard from "../components/team/InvitationCard";
import InviteMemberDrawer from "../components/team/InviteMemberDrawer";

import StatCard from "../components/dashboard/StatCard";

import {
  getTeam,
  deleteInvitation,
  resendInvitation,
  removeMember,
} from "../api/team.api";

const Team = () => {

  const [loading, setLoading] =
    useState(true);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [members, setMembers] =
    useState([]);

  const [pendingInvitations,
    setPendingInvitations] =
    useState([]);


    const [inviteLoading, setInviteLoading] = useState(false);

const [refreshLoading, setRefreshLoading] = useState(false);

const [resendingInvitationId, setResendingInvitationId] = useState(null);

const [deletingInvitationId, setDeletingInvitationId] = useState(null);

const [removingMemberId, setRemovingMemberId] = useState(null);


  // ==============================================
  // FETCH TEAM
  // ==============================================

  useEffect(() => {

    fetchTeam();

  }, []);

  const fetchTeam = async () => {

    try {

      setLoading(true);

      const response =
        await getTeam();

      setMembers(
        response.data.members
      );

      setPendingInvitations(
        response.data.pendingInvitations
      );

    } catch (err) {

      toast.error(
        "Unable to load team."
      );

    } finally {

      setLoading(false);

    }

  };

  // ==============================================
  // SEARCH
  // ==============================================

  const filteredMembers =
    useMemo(() => {

      const search =
        searchTerm.toLowerCase();

      return members.filter((member) =>

        member.name
          ?.toLowerCase()
          .includes(search) ||

        member.email
          ?.toLowerCase()
          .includes(search) ||

        member.role
          ?.toLowerCase()
          .includes(search)

      );

    }, [members, searchTerm]);

  const filteredInvitations =
    useMemo(() => {

      const search =
        searchTerm.toLowerCase();

      return pendingInvitations.filter(
        (invitation) =>

          invitation.name
            ?.toLowerCase()
            .includes(search) ||

          invitation.email
            ?.toLowerCase()
            .includes(search) ||

          invitation.role
            ?.toLowerCase()
            .includes(search)

      );

    }, [
      pendingInvitations,
      searchTerm,
    ]);

  // ==============================================
  // KPI
  // ==============================================

  const stats = useMemo(() => {

    return {

      members: members.length,

      invitations:
        pendingInvitations.length,

      admins: members.filter(
        (member) =>
          member.role === "ADMIN"
      ).length,

      managers: members.filter(
        (member) =>
          member.role === "MANAGER"
      ).length,

    };

  }, [
    members,
    pendingInvitations,
  ]);

  // ==============================================
  // REFRESH
  // ==============================================
const handleRefresh = async () => {

   try{

      setRefreshLoading(true);

      await fetchTeam();

   }

   finally{

      setRefreshLoading(false);

   }

}

  // ==============================================
  // INVITE
  // ==============================================

  const handleInvite = () => {

    setDrawerOpen(true);

  };

  // ==============================================
  // CANCEL INVITATION
  // ==============================================

  const handleCancelInvitation =
    async (invitation) => {

      const confirmDelete =
        window.confirm(
          `Cancel invitation for ${invitation.email}?`
        );

      if (!confirmDelete) return;

      try {

        await deleteInvitation(
          invitation.id
        );

        toast.success(
          "Invitation cancelled."
        );

        fetchTeam();

      } catch (err) {

        toast.error(
          err.response?.data?.message ||
          "Unable to cancel invitation."
        );

      }

    };

  // ==============================================
  // RESEND INVITATION
  // ==============================================

  const handleResendInvitation =
    async (invitation) => {

      try {
        setResendingInvitationId(invitation.id);
        await resendInvitation(
          invitation.id
        );

        toast.success(
          "Invitation resent."
        );

        fetchTeam();

      } catch (err) {

        toast.error(
          err.response?.data?.message ||
          "Unable to resend invitation."
        );

      }
      finally {

    setResendingInvitationId(null);

  }

    };

  // ==============================================
  // REMOVE MEMBER
  // ==============================================

  const handleRemoveMember = async (member) => {
  const confirmDelete = window.confirm(
    `Remove ${member.name} from the team?`
  );

  if (!confirmDelete) return;

  try {
    setRemovingMemberId(member.id);

    await removeMember(member.id);

    toast.success("Member removed.");

    fetchTeam();
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Unable to remove member."
    );
  } finally {
    setRemovingMemberId(null);
  }
};

    return (
  <>
    {/* Hero */}

    <TeamHero
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onRefresh={handleRefresh}
      onAddMember={handleInvite}
    />

    {/* Loading */}

    {loading ? (

      <div className="flex items-center justify-center py-24">

        <div className="flex flex-col items-center gap-5">

          <div
            className="
              h-14
              w-14
              animate-spin
              rounded-full
              border-4
              border-[#174C35]/20
              border-t-[#174C35]
            "
          />

          <p className="font-medium text-slate-600 dark:text-slate-300">

            Loading Team...

          </p>

        </div>

      </div>

    ) : (

      <>

        {/* KPI Cards */}

        <div className="grid gap-5 lg:grid-cols-4">

          <StatCard
            title="TEAM MEMBERS"
            value={stats.members}
            subtitle="active members"
            icon={Users}
          />

          <StatCard
            title="PENDING INVITES"
            value={stats.invitations}
            subtitle="awaiting signup"
            icon={UserPlus}
          />

          <StatCard
            title="ADMINISTRATORS"
            value={stats.admins}
            subtitle="full access"
            icon={ShieldCheck}
          />

          <StatCard
            title="MANAGERS"
            value={stats.managers}
            subtitle="management role"
            icon={UserCog}
          />

        </div>

        {/* Members */}

        <div className="mt-10">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                Team Members

              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                Active members with access to the PopFresh Admin Portal.

              </p>

            </div>

            <div
              className="
                rounded-full
                bg-[#174C35]/10
                px-4
                py-2
                text-sm
                font-semibold
                text-[#174C35]
              "
            >

              {filteredMembers.length} Members

            </div>

          </div>

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
                        {filteredMembers.length > 0 ? (

              filteredMembers.map((member) => (

                <TeamCard
                  key={member.id}
                  member={member}
                  onRemove={handleRemoveMember}
                  loading={removingMemberId === member.id}
                />

              ))

            ) : (

              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-[#18211D]">

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">

                  No Team Members Found

                </h3>

                <p className="mt-2 text-slate-500 dark:text-slate-400">

                  No members match your current search.

                </p>

              </div>

            )}

          </div>

        </div>

        {/* Pending Invitations */}

        <div className="mt-14">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                Pending Invitations

              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                Invitations that haven't been accepted yet.

              </p>

            </div>

            <div
              className="
                rounded-full
                bg-amber-100
                dark:bg-amber-900/20
                px-4
                py-2
                text-sm
                font-semibold
                text-amber-700
                dark:text-amber-300
              "
            >

              {filteredInvitations.length} Pending

            </div>

          </div>

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {filteredInvitations.length > 0 ? (

              filteredInvitations.map((invitation) => (

                <InvitationCard
                  key={invitation.id}
                  invitation={invitation}
                  onResend={handleResendInvitation}
                  onCancel={handleCancelInvitation}
                  resendLoading={
    resendingInvitationId === invitation.id
  }
   cancelLoading={
    deletingInvitationId === invitation.id
  }
                />

              ))

            ) : (

              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-[#18211D]">

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">

                  No Pending Invitations

                </h3>

                <p className="mt-2 text-slate-500 dark:text-slate-400">

                  Everyone you've invited has either joined
                  or no invitations have been sent yet.

                </p>

              </div>

            )}

          </div>

        </div>
                {/* Invite Drawer */}

        <InviteMemberDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onSuccess={fetchTeam}
        />

      </>

    )}

  </>
);

};

export default Team;

// import { useMemo, useState } from "react";

// import TeamHero from "../components/team/TeamHero";
// import TeamCard from "../components/team/TeamCard";
// import AddMemberDrawer from "../components/team/AddMemberDrawer";

// import StatCard from "../components/dashboard/StatCard";

// import teamData from "../data/teamData";

// import {
//   Users,
//   UserCheck,
//   UserX,
//   ShieldCheck,
// } from "lucide-react";

// const Team = () => {
//   const [members, setMembers] = useState(teamData);

//   const [searchTerm, setSearchTerm] = useState("");

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const [selectedMember, setSelectedMember] = useState(null);

//   const filteredMembers = useMemo(() => {
//     const search = searchTerm.toLowerCase();

//     return members.filter(
//       (member) =>
//         member.name.toLowerCase().includes(search) ||
//         member.role.toLowerCase().includes(search) ||
//         member.email.toLowerCase().includes(search) ||
//         member.phone.includes(search)
//     );
//   }, [members, searchTerm]);

//   const stats = useMemo(() => {
//     return {
//       total: members.length,

//       active: members.filter(
//         (member) => member.status === "Active"
//       ).length,

//       inactive: members.filter(
//         (member) => member.status === "Inactive"
//       ).length,

//       admins: members.filter(
//         (member) =>
//           member.role === "Founder & Admin"
//       ).length,
//     };
//   }, [members]);

//   const handleRefresh = () => {
//     setSearchTerm("");
//     setMembers(teamData);
//   };

//   const handleAddMember = () => {
//     setSelectedMember(null);
//     setDrawerOpen(true);
//   };

//   const handleEditMember = (member) => {
//     setSelectedMember(member);
//     setDrawerOpen(true);
//   };

//   const handleDeleteMember = (member) => {
//     const confirmDelete = window.confirm(
//       `Remove ${member.name} from the team?`
//     );

//     if (!confirmDelete) return;

//     setMembers((prev) =>
//       prev.filter((item) => item.id !== member.id)
//     );
//   };

//   const handleSaveMember = (memberData) => {
//     if (selectedMember) {
//       setMembers((prev) =>
//         prev.map((member) =>
//           member.id === memberData.id
//             ? memberData
//             : member
//         )
//       );
//     } else {
//       setMembers((prev) => [
//         ...prev,
//         memberData,
//       ]);
//     }

//     setDrawerOpen(false);
//     setSelectedMember(null);
//   };

//   const handleCloseDrawer = () => {
//     setDrawerOpen(false);
//     setSelectedMember(null);
//   };

//   return (
//     <>
//       <TeamHero
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         onRefresh={handleRefresh}
//         onAddMember={handleAddMember}
//       />

//       {/* KPI Cards */}

//       <div className="grid gap-5 lg:grid-cols-4">

//         <StatCard
//           title="TOTAL MEMBERS"
//           value={stats.total}
//           subtitle="team strength"
//           icon={Users}
//         />

//         <StatCard
//           title="ACTIVE"
//           value={stats.active}
//           subtitle="currently active"
//           icon={UserCheck}
//         />

//         <StatCard
//           title="INACTIVE"
//           value={stats.inactive}
//           subtitle="inactive members"
//           icon={UserX}
//         />

//         <StatCard
//           title="ADMINS"
//           value={stats.admins}
//           subtitle="administrators"
//           icon={ShieldCheck}
//         />

//       </div>

//       {/* Team Grid */}

//       <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

//         {filteredMembers.map((member) => (
//           <TeamCard
//             key={member.id}
//             member={member}
//             onEdit={handleEditMember}
//             onDelete={handleDeleteMember}
//           />
//         ))}

//       </div>

//       {/* Empty State */}

//       {filteredMembers.length === 0 && (
//         <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

//           <h3 className="text-xl font-semibold text-slate-900">
//             No Team Members Found
//           </h3>

//           <p className="mt-2 text-slate-500">
//             Try adjusting your search or add a new member.
//           </p>

//         </div>
//       )}

//       {/* Drawer */}

//       <AddMemberDrawer
//         open={drawerOpen}
//         member={selectedMember}
//         onClose={handleCloseDrawer}
//         onSave={handleSaveMember}
//       />
//     </>
//   );
// };

// export default Team;