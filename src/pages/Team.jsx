import { useMemo, useState } from "react";

import TeamHero from "../components/team/TeamHero";
import TeamCard from "../components/team/TeamCard";
import AddMemberDrawer from "../components/team/AddMemberDrawer";

import StatCard from "../components/dashboard/StatCard";

import teamData from "../data/teamData";

import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
} from "lucide-react";

const Team = () => {
  const [members, setMembers] = useState(teamData);

  const [searchTerm, setSearchTerm] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);

  const filteredMembers = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(search) ||
        member.role.toLowerCase().includes(search) ||
        member.email.toLowerCase().includes(search) ||
        member.phone.includes(search)
    );
  }, [members, searchTerm]);

  const stats = useMemo(() => {
    return {
      total: members.length,

      active: members.filter(
        (member) => member.status === "Active"
      ).length,

      inactive: members.filter(
        (member) => member.status === "Inactive"
      ).length,

      admins: members.filter(
        (member) =>
          member.role === "Founder & Admin"
      ).length,
    };
  }, [members]);

  const handleRefresh = () => {
    setSearchTerm("");
    setMembers(teamData);
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setDrawerOpen(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setDrawerOpen(true);
  };

  const handleDeleteMember = (member) => {
    const confirmDelete = window.confirm(
      `Remove ${member.name} from the team?`
    );

    if (!confirmDelete) return;

    setMembers((prev) =>
      prev.filter((item) => item.id !== member.id)
    );
  };

  const handleSaveMember = (memberData) => {
    if (selectedMember) {
      setMembers((prev) =>
        prev.map((member) =>
          member.id === memberData.id
            ? memberData
            : member
        )
      );
    } else {
      setMembers((prev) => [
        ...prev,
        memberData,
      ]);
    }

    setDrawerOpen(false);
    setSelectedMember(null);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedMember(null);
  };

  return (
    <>
      <TeamHero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={handleRefresh}
        onAddMember={handleAddMember}
      />

      {/* KPI Cards */}

      <div className="grid gap-5 lg:grid-cols-4">

        <StatCard
          title="TOTAL MEMBERS"
          value={stats.total}
          subtitle="team strength"
          icon={Users}
        />

        <StatCard
          title="ACTIVE"
          value={stats.active}
          subtitle="currently active"
          icon={UserCheck}
        />

        <StatCard
          title="INACTIVE"
          value={stats.inactive}
          subtitle="inactive members"
          icon={UserX}
        />

        <StatCard
          title="ADMINS"
          value={stats.admins}
          subtitle="administrators"
          icon={ShieldCheck}
        />

      </div>

      {/* Team Grid */}

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredMembers.map((member) => (
          <TeamCard
            key={member.id}
            member={member}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        ))}

      </div>

      {/* Empty State */}

      {filteredMembers.length === 0 && (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

          <h3 className="text-xl font-semibold text-slate-900">
            No Team Members Found
          </h3>

          <p className="mt-2 text-slate-500">
            Try adjusting your search or add a new member.
          </p>

        </div>
      )}

      {/* Drawer */}

      <AddMemberDrawer
        open={drawerOpen}
        member={selectedMember}
        onClose={handleCloseDrawer}
        onSave={handleSaveMember}
      />
    </>
  );
};

export default Team;